<script lang="ts">
	import type { Game, Player } from '$lib/types';
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import { interpolateLab } from 'd3-interpolate';
	import { getCssPropertyValue } from '$lib/colors';

	export let game: Game;
	export let player: Player;
	let className = '';
	export { className as class };

	const progress = tweened(0, {
		duration: 500,
		easing: cubicOut
	});

	function getColor(isActive: boolean) {
		return isActive ? getCssPropertyValue(player.color.gradient.stops[0]) : '#AFAFAA';
	}

	const barColor = tweened(getColor(game.currentPlayer === player), {
		interpolate: interpolateLab
	});

	$: $progress = player.progressPercent;
	$: $barColor = getColor(game.currentPlayer === player);
</script>

<div
	class="col-span-2 items-center flex flex-col my-4 gap-0.5 {className}"
	role="progressbar"
	aria-label="{player.name}'s progress bar"
	aria-valuenow={player.score}
	aria-valuemax={player.scoreRequired}
>
	<div class="flex w-full justify-between">
		<div>{player.name}</div>
		<div class="text-secondary">{Math.round($progress * 100)}%</div>
	</div>

	<div class="flex overflow-hidden w-full h-1 rounded bg-white/20">
		<div
			class="bg-gradient-to-l rounded-r bg-right bg-1.5x"
			style:--tw-gradient-stops="{$barColor}, black"
			style:width="{$progress * 100}%"
		/>
	</div>
</div>
