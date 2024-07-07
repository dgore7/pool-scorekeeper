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
	class="progress-container col-span-2 items-center flex flex-col my-4  gap-0.5 {className}"
	role="progressbar"
	aria-label="{player.name}'s progress bar"
	aria-valuenow={player.score}
	aria-valuemax={player.scoreRequired}
>
<div class="flex w-full justify-between">
  <div>{player.name}</div>
  <div>{Math.round($progress *100)}%</div>
</div>
  
	<div
		class="progress-bar-outer h-2 rounded bg-white/20"
	>
		<div class="progress-bar-inner {player.color}" style:width="{$progress * 100}%" />
	</div>
</div>

<style>
	.progress-bar-inner {
		height: 100%;
	}

	.progress-bar-outer {
		display: flex;
		overflow: hidden;
		width: 100%;
	}
</style>
