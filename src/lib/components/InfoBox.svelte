<script lang="ts">
	import { BALL_COLORS } from '$lib/common/ball';
	import type { Player, Game } from '$lib/types';
	import { tweened } from 'svelte/motion';

	export let player: Player | null = null;
	export let game: Game;
	export let playerNumber: number = 0;

	export let isScoreSheet: boolean = false;

	const transparency = tweened();

	$: isActive = isScoreSheet ? isScoreSheet : game.currentPlayer === player;
	$: border = player ? (isActive ? player?.color.border : 'border-[#28282C]') : 'border-[#28282C]';
	$: fromStop = player
		? player?.color.gradient.stops[0]
		: BALL_COLORS[BALL_COLORS.length - 1].gradient.stops[0];
	$: $transparency = isActive ? 70 : 0;
</script>

<!-- the color-mix below is a trick to add opacity to the given color -->
<div
	class="player-score portrait:w-1/2 landscape:h-1/2 border-2 max-h-60 px-2 py-1 border-solid rounded-xl grid grid-rows-[auto_1fr_auto] grid-cols-1 landscape:grid-rows-[min-content_min-content] landscape:grid-cols-2 gap-y-2 content-between {border} bg-[#28282C] overflow-clip"
	class:radial-to-tr={playerNumber === 0}
	class:radial-to-bl={playerNumber === 1}
	style:--from-stop="var({fromStop})"
	style:--transparency="{$transparency}%"
	style:background-image={'radial-gradient(var(--position), color-mix(in srgb, var(--from-stop) var(--transparency), transparent), #1F2026 var(--end-stop))'}
>
	<slot />
</div>

<style>
	.player-score {
		background-size: 150% 150%;
		animation: Animation 8s ease infinite alternate;
	}
	@keyframes Animation {
		0% {
			background-position: 0% 0%;
		}
		50% {
			background-position: 91% 100%;
		}
		100% {
			background-position: 0% 0%;
		}
	}
	.radial-to-bl {
		--position: circle at left 70% top 0%;
		--end-stop: 80%;
		animation: Animation 8s ease infinite alternate-reverse;
	}

	.radial-to-tr {
		--position: circle at right 70% bottom 0%;
		--end-stop: 100%;
	}
</style>
