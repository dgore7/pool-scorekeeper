<script lang="ts">
	import { getCssPropertyValue } from '$lib/colors';
	import { tweened } from 'svelte/motion';
	import { interpolateLab } from 'd3-interpolate';
	import type { Game } from '$lib/types';
	import { createEventDispatcher } from 'svelte';

	export let game: Game;
	export let disabled: boolean;

	const dispatch = createEventDispatcher();

	function handleClick() {
		dispatch('miss');
	}

	const fromColor = tweened(getCssPropertyValue(game.currentPlayer.color.gradient.stops[0]), {
		interpolate: interpolateLab
	});

	const toColor = tweened(getCssPropertyValue(game.currentPlayer.color.gradient.stops[1]), {
		interpolate: interpolateLab
	});

	$: [$fromColor, $toColor] = game.currentPlayer.color.gradient.stops.map(getCssPropertyValue);
</script>

<button
	aria-label="switch innings button"
	class="rounded-xl py-2 w-full h-12 mb-2 bg-gradient-to-b {game.currentPlayer.color
		.border} border transition-all"
	style:--tw-gradient-stops="{$fromColor}, {$toColor}"
	on:click={handleClick}
	{disabled}
>
	<slot />
</button>
