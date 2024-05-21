<script lang="ts">
	import Ball, { type BallModel } from './Ball.svelte';
	import ControlButtons from './ControlButtons.svelte';
	import { createEventDispatcher } from 'svelte';
	import type { NineBallGame } from '$lib';
	import GhostIcon from './icons/GhostIcon.svelte';

	export let game: NineBallGame;
	export let isDeadBallMode: boolean;

	const dispatch = createEventDispatcher();

	let colors: string[] = ['yellow', 'blue', 'red', 'purple', 'orange', 'green', 'brown', 'black'];
	let balls: BallModel[] = [];
	let isRackOver = false;

	function createBalls() {
		for (let i = 0; i < 15; i++) {
			let ball: BallModel = {
				number: i + 1,
				color: colors[i % colors.length],
				isStripe: i >= 8,
				isDead: false,
				isPocketed: false
			};
			balls.push(ball);
		}
	}
	createBalls();

	function handleBallClick(ball: BallModel) {
		if (isDeadBallMode) {
			killBall(ball);
		} else {
			pocketBall(ball);
		}
	}

	function pocketBall(ball: BallModel) {
		if (ball.number === 9) {
			isRackOver = true;
		}
		let pocketedBall = getCurrentBall(ball);
		pocketedBall.isPocketed = true;
		dispatch('ballPocket', pocketedBall);
	}

	function killBall(ball: BallModel) {
		let deadBall = getCurrentBall(ball);
		dispatch('deadBall', deadBall);
	}

	function getCurrentBall(ball: BallModel) {
		return game.currentRack.liveBalls[ball.number - 1];
	}

	function handleMiss() {
		dispatch('miss');
	}

	function handleUndo() {
		dispatch('undo');
	}

	function handleSaftey() {
		dispatch('safety');
	}

	function handleTimeout() {
		dispatch('timeout');
	}

	function handleDeadBallMode() {
		dispatch('deadBallMode');
	}

	function handleNewRack() {
		isRackOver = false;
		balls = [];
		createBalls();
		dispatch('newRack');
	}
</script>

{#if game.currentRack.liveBalls.length}
	<div aria-label="button container" class="container mx-auto py-5">
		{#each game.currentRack.liveBalls as ball}
			{#if ball.number < 10}
				{#if ball.isDead}
					<div class="relative">
						<Ball {ball} size="large" />
						<GhostIcon />
					</div>
				{:else}
					<button on:click={() => handleBallClick(ball)} disabled={ball.isDead}>
						<Ball {ball} size={'large'} />
					</button>
				{/if}
			{/if}
		{/each}
		<button
			aria-label="switch innings button"
			class="rounded-xl bg-slate-600 py-4 w-full"
			on:click={isRackOver ? handleNewRack : handleMiss}
		>
			{#if isRackOver}
				New Rack
			{:else}
				End {game.currentPlayer.name}'s Turn
			{/if}
		</button>
		<div aria-label="control button container" class="rounded-xl bg-slate-600 justify-evenly">
			<ControlButtons
				on:undo={handleUndo}
				on:safety={handleSaftey}
				on:timeout={handleTimeout}
				on:deadBallMode={handleDeadBallMode}
			/>
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
