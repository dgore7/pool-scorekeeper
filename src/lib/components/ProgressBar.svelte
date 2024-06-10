<script lang="ts">
	import type { NineBallPlayer } from '$lib';
	import type { EightBallPlayer } from '$lib/eight-ball';
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

	export let player: NineBallPlayer | EightBallPlayer;
	let className = '';
	export { className as class };
	export let reverse = false;

	const progress = tweened(0, {
		duration: 500,
		easing: cubicOut
	});

	$: $progress = player.progressPercent;
</script>

<div
	class="progress-container {className}"
	role="progressbar"
	aria-label="{player.name}'s progress bar"
	aria-valuenow={player.score}
	aria-valuemax={player.scoreRequired}
>
	<div
		class="progress-bar-outer rounded-t-lg"
		class:rounded-t-lg={!reverse}
		class:rounded-b-lg={reverse}
	>
		<div class="progress-bar-inner {player.color}" style:width="{$progress * 100}%" />
	</div>
</div>

<style>
	.progress-container {
		grid-column: span 2;
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.progress-bar-inner {
		height: 100%;
	}

	.progress-bar-outer {
		height: 1rem;
		display: flex;
		overflow: hidden;
		background-color: white;
		width: 100%;
		border: 2px solid grey;

		&.reverse {
			border-radius: 0 0 8px 8px;
		}
	}
</style>
