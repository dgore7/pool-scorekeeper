<script lang="ts">
	import { getCssPropertyValue } from '$lib/colors';
	import { tweened } from 'svelte/motion';
	import { interpolateLab } from 'd3-interpolate';
	import type { Game, Player } from '$lib/types';
	import { createEventDispatcher } from 'svelte';

	export let player: Player
	export let disabled: boolean;
	export let dispatchEvent: string;
	export let isTurnButton: boolean = false;

	const dispatch = createEventDispatcher();

	function handleClick() {
		dispatch(dispatchEvent);
	}	

	const fromColor = tweened(getCssPropertyValue(player.color.gradient.stops[0]), {
		interpolate: interpolateLab
	});

	const toColor = tweened(getCssPropertyValue(player.color.gradient.stops[1]), {
		interpolate: interpolateLab
	});

	$: [$fromColor, $toColor] = player.color.gradient.stops.map(getCssPropertyValue);
</script>

<button
	aria-label="switch innings button"
	class="rounded-xl py-2 w-full mb-2 bg-gradient-to-b {player.color
		.border} {isTurnButton ? 'h-12' : ''} border transition-all"
	style:--tw-gradient-stops="{$fromColor}, {$toColor}"
	on:click={handleClick}
	{disabled}
>
	<slot />
</button>
