<script lang="ts">
	import type { Ball as BallModel } from '$lib/common/ball';
	import { createEventDispatcher } from 'svelte';
	import Ball from '../Ball.svelte';
	import type { BallType } from '$lib/eight-ball';

	export let game;

	let dispatch = createEventDispatcher<{ ballSelect: BallType }>();

	function handleBallAssignment(ball: BallModel) {
		dispatch('ballSelect', ball.isStripe ? 'stripe' : 'solid');
	}
</script>

<div class="flex gap-8 justify-center">
	Assign {game.currentPlayer.name} to:
	{#each game.currentRack.assignmentBalls as ball}
		<div class="grid gap-2">
			<div class="m-auto">
				{#if ball.number < 8}
					Solids
				{:else}
					Stripes
				{/if}
			</div>
			<button on:click={() => handleBallAssignment(ball)}>
				<Ball {ball} />
			</button>
		</div>
	{/each}
</div>
