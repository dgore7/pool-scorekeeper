<script lang="ts">
	import { getCssPropertyValue } from '$lib/colors';
	import { tweened } from 'svelte/motion';
	import { interpolateLab } from 'd3-interpolate';
	import { createEventDispatcher } from 'svelte';
	import { BALL_COLORS } from '$lib/common/ball';

	export let isWin: boolean = true;
	export let disabled: boolean;

	const buttonColor = isWin ? 'green' : 'red';

	const dispatch = createEventDispatcher();

	function handleClick() {
		if (isWin) {
			dispatch('win');
		} else {
			dispatch('lose');
		}
	}

	const color = BALL_COLORS.find((color) => color.label === buttonColor);

	const fromColor = tweened(getCssPropertyValue(color!.gradient.stops[0]), {
		interpolate: interpolateLab
	});

	const toColor = tweened(getCssPropertyValue(color!.gradient.stops[1]), {
		interpolate: interpolateLab
	});

	$: [$fromColor, $toColor] = color!.gradient.stops.map(getCssPropertyValue);
</script>

<button
	aria-label="switch innings button"
	class="rounded-xl p-2 w-full text-white mb-2 bg-gradient-to-b {color?.border} border transition-all"
	style:--tw-gradient-stops="{$fromColor}, {$toColor}"
	on:click={handleClick}
	{disabled}
>
	<slot />
</button>
