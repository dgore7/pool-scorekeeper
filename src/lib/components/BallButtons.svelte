<script lang="ts">
	import Ball, { type BallModel } from './Ball.svelte';
	import ControlButtons from './ControlButtons.svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	let colors: string[] = ['yellow', 'blue', 'red', 'purple', 'orange', 'green', 'brown', 'black'];
	let balls: BallModel[] = [];

	for (let i = 0; i < 15; i++) {
		let ball: BallModel = {
			number: i + 1,
			color: colors[i % colors.length],
			value: i < 8 ? 1 : 2,
			isStripe: i >= 8,
			isDead: false
		};
		balls.push(ball);
	}

	function handleBallClick(ball: any) {
		balls[ball.number - 1].isDead = true;
		dispatch('ballPocket', ball);
	}
</script>

{#if balls.length}
	<div aria-label="button container" class="container mx-auto py-5">
		{#each balls as ball}
			{#if ball.number < 10}
				<button on:click={() => handleBallClick(ball)} disabled={ball.isDead}>
					<Ball {ball} size={'large'} />
				</button>
			{/if}
		{/each}
		<button aria-label="switch innings button" class="rounded-xl bg-slate-600 py-4 w-full">
			Switch Player Turn
		</button>
		<div aria-label="control button container" class="rounded-xl bg-slate-600 justify-evenly">
			<ControlButtons />
		</div>
	</div>
{/if}

<style>
	[aria-label='button container'] {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		grid-template-rows: repeat(3, 1fr) repeat(2, 0.5fr);
		gap: 1em;
		margin: auto;
		max-width: 20rem;
		place-items: center;
	}

	[aria-label='control button container'] {
		display: flex;
		grid-area: 5 / 1 / 5 / 4;
		justify-self: stretch;
	}

	[aria-label='switch innings button'] {
		grid-area: 4 / 1 / 4 / 4;
	}
</style>
