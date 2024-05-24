<script lang="ts">
	import Ball, { type BallModel } from './Ball.svelte';
	import ControlButtons from './ControlButtons.svelte';
	import { createEventDispatcher } from 'svelte';
	import type { NineBallGame } from '$lib';
	import SkullyIcon from './icons/SkullyIcon.svelte';

	export let game: NineBallGame;
	export let isDeadBallMode: boolean;
	export let isGameOver: boolean;

	const dispatch = createEventDispatcher();

	let isRackOver = false;
	let deadBallsToAdd: BallModel[] = [];

	function handleBallClick(ball: BallModel) {
		if (isDeadBallMode) {
			addDeadBall(ball);
		} else {
			pocketBall(ball);
		}
	}

	function pocketBall(ball: BallModel) {
		const pocketedBall = getCurrentBall(ball);

		if (pocketedBall.isPocketed) {
			return;
		}

		if (pocketedBall.number === 9) {
			isRackOver = true;
		}

		dispatch('ballPocket', pocketedBall);
	}

	function addDeadBall(ball: BallModel) {
		if (ball.number === 9 && !isGameOver) {
			return;
		}

		ball.isDead = true;
		deadBallsToAdd.push(ball);
		game = game;
	}

	function removeDeadBall(ball: BallModel) {
		ball.isDead = false;
		let zomebieBallIndex = deadBallsToAdd.indexOf(ball);
		deadBallsToAdd.splice(zomebieBallIndex, 1);
		deadBallsToAdd = deadBallsToAdd;
		game = game;
	}

	function getCurrentBall(ball: BallModel) {
		return game.currentRack.gameBalls[ball.number - 1];
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
		dispatch('newRack');
	}

	function handleDeadBallSave() {
		dispatch('saveDeadBalls', deadBallsToAdd);
		deadBallsToAdd = [];
	}
</script>

{#if game.currentRack.gameBalls.length}
	<div aria-label="button container" class="container mx-auto py-5">
		{#each game.currentRack.gameBalls as ball}
			{#if ball.number < 10}
				{#if ball.isDead}
					<button
						class="relative flex items-center justify-center"
						on:click={() => removeDeadBall(ball)}
						disabled={!isDeadBallMode}
					>
						<Ball {ball} size="large" />
						<SkullyIcon class={'w-[9rem] -m-6'} />
					</button>
				{:else}
					<button
						on:click={() => handleBallClick(ball)}
						disabled={ball.isDead || (isGameOver && !isDeadBallMode)}
					>
						<Ball {ball} size={'large'} />
					</button>
				{/if}
			{/if}
		{/each}
		{#if isDeadBallMode}
			<button
				aria-label="dead mode exit button"
				class="rounded-xl bg-slate-600 py-4 w-full"
				on:click={handleDeadBallSave}>Exit Deadball Mode</button
			>
		{:else}
			<button
				aria-label="switch innings button"
				class="rounded-xl bg-slate-600 py-4 w-full"
				style="background-color:{game.currentPlayer.color}"
				on:click={isRackOver ? handleNewRack : handleMiss}
				disabled={isDeadBallMode || isGameOver}
			>
				{#if isRackOver}
					New Rack
				{:else if isGameOver}
					{game.currentPlayer.name} Wins!
				{:else}
					End {game.currentPlayer.name}'s Turn
				{/if}
			</button>
			<div aria-label="control button container" class="rounded-xl bg-slate-600 justify-evenly">
				<ControlButtons
					{isDeadBallMode}
					{isGameOver}
					on:undo={handleUndo}
					on:safety={handleSaftey}
					on:timeout={handleTimeout}
					on:deadBallMode={handleDeadBallMode}
				/>
			</div>
		{/if}
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
		place-content: center;
	}

	[aria-label='control button container'] {
		display: flex;
		grid-area: 5 / 1 / 5 / 4;
		justify-self: stretch;
	}

	[aria-label='switch innings button'] {
		grid-area: 4 / 1 / 4 / 4;
	}

	[aria-label='dead mode exit button'] {
		grid-area: 4 / 1 / 4 / 4;
	}
</style>
