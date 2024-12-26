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

<div class="flex gap-2 justify-center items-center">
		{#each game.currentRack.assignmentBalls as ball}
			<div class="grid gap-1">
				<div class="m-auto">
					{#if ball.number < 8}
						Solids
					{:else}
						Stripes
					{/if}
				</div>
				<button on:click={() => handleBallAssignment(ball)} class="h-16 w-16">
					<Ball {ball} />
				</button>
			</div>
		{/each}
</div>
