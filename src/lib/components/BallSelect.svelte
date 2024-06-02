<script lang="ts">
	import type { BallModel } from './Ball.svelte';
	import { createEventDispatcher } from 'svelte';
	import Ball from './Ball.svelte';
	import type { BallType } from '$lib/eight-ball';

	export let game;

	let dispatch = createEventDispatcher<{ ballSelect: BallType }>();

	function handleBallAssignment(ball: BallModel) {
		dispatch('ballSelect', ball.isStripe ? 'stripe' : 'solid');
	}
</script>

<div class="flex gap-8 justify-center">
	{#each game.currentRack.assignmentBalls as ball}
		<button on:click={() => handleBallAssignment(ball)}>
			<Ball {ball} size="large" />
		</button>
	{/each}
</div>
