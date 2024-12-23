<script lang="ts">
	import type { NineBallRack } from '$lib/nine-ball';
	import type { Game } from '$lib/types';
	import { getCssPropertyValue } from '$lib/colors';
	import { tweened } from 'svelte/motion';

	export let game: Game;
	export let rack: NineBallRack;
	export let rackNumber: number;

	const fromColor =
		rack.winningPlayerIndex === -1
			? tweened(getCssPropertyValue(game.player1.color.gradient.stops[0]))
			: tweened(getCssPropertyValue(game.players[rack.winningPlayerIndex].color.gradient.stops[0]));
	const toColor =
		rack.winningPlayerIndex === -1
			? tweened(getCssPropertyValue(game.player2.color.gradient.stops[0]))
			: tweened(getCssPropertyValue(game.players[rack.winningPlayerIndex].color.gradient.stops[1]));

	$: [$fromColor, $toColor] =
		rack.winningPlayerIndex === -1
			? [game.player1.color.gradient.stops[0], game.player2.color.gradient.stops[0]].map(
					getCssPropertyValue
				)
			: game.players[rack.winningPlayerIndex].color.gradient.stops.map(getCssPropertyValue);
</script>

<div
	class="rounded-lg px-1.5 mix-blend-screen whitespace-nowrap bg-gradient-to-tr"
	style:--tw-gradient-stops="{$fromColor}, {$toColor}"
>
	<span class="capitalize text-primary text-sm leading-4">rack:</span>
	<span class="text-primary">{rackNumber}</span>
</div>
