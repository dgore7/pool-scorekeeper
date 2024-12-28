<script lang="ts">
	import type { Ball as BallModel } from '$lib/common/ball';
	import { createEventDispatcher } from 'svelte';
	import Ball from '../Ball.svelte';
	import type { BallType } from '$lib/eight-ball';

	export let game;

	let dispatch = createEventDispatcher<{ ballSelect: BallType }>();

	function handleBallAssignment(ball: BallModel) {
		dispatch('ballSelect', ball.isStripe ? 'stripes' : 'solids');
	}
</script>

<div class="flex gap-4 justify-center items-top">
	{#each game.currentRack.gameBalls as ball}
		{#if ball.color === game.currentPlayer.color}
			<button class="flex flex-col" on:click={() => handleBallAssignment(ball)}>
				<div class="text-sm">
					{#if ball.number < 8}
						Solids
					{:else}
						Stripes
					{/if}
				</div>
				<div class="h-10 w-10 mx-auto">
					<Ball {ball} />
				</div>
			</button>
		{/if}
	{/each}
</div>
