<script lang="ts">
	import type { Player } from '$lib';
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

	export let player: Player;
	export let color: string;

	const progress = tweened(0, {
		duration: 500,
		easing: cubicOut
	});

	$: progressPercent = player.score / player.scoreRequired;
	$: progress.set(progressPercent);
</script>

<div class="progress-container">
	<div>
		{player.name}
	</div>
	<div class="progress-bar-outer">
		<div
			class="progress-bar-inner"
			style="width: {$progress * 100}%; background-color: {color}"
		></div>
	</div>
</div>

<style>
	.progress-container {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.progress-bar-inner {
		height: inherit;
		border-radius: inherit;
	}

	.progress-bar-outer {
		border-radius: 0.5rem;
		height: 1rem;
		display: flex;
		overflow: hidden;
		background-color: white;
		width: 100%;
	}
</style>
