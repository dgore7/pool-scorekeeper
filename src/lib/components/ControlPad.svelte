<script lang="ts">
	import Ball, { type BallModel } from './Ball.svelte';
	import ControlButtons from './ControlButtons.svelte';
	import { createEventDispatcher } from 'svelte';
	import type { NineBallGame } from '$lib';
	import SkullyIcon from './icons/SkullyIcon.svelte';
	import { receive, send } from '$lib/cross-fade';

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

	function pocketBall(pocketedBall: BallModel) {
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

	function handleMiss() {
		dispatch('miss');
	}

	function handleUndo() {
		dispatch('undo');
	}

	function handleSafety() {
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

<div
	class="w-full py-5 h-full flex-auto grid max-h-[36rem] overflow-hidden m-auto mb-0 grid-cols-3 grid-rows-3 gap-2"
>
	{#each game.currentRack.gameBalls as ball (ball.number)}
		<div class="relative w-full max-w-full h-full">
			{#if ball.isDead}
				<button
					class="relative h-fit w-fit"
					class:hidden={!ball.isDead}
					on:click={() => removeDeadBall(ball)}
					disabled={!isDeadBallMode}
					in:send|global={{ key: ball.number }}
					out:receive|global={{ key: ball.number }}
					on:transitionend={(e) => e.currentTarget.classList.remove('absolute')}
				>
					<SkullyIcon {ball} class="h-full mx-auto -my-6" />
				</button>
			{:else}
				<button
					class="active:scale-90 transition-transform aria-pressed:pointer-events-none h-full w-full absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
					aria-pressed={(ball.isPocketed || ball.isDead) && !isDeadBallMode}
					class:hidden={ball.isDead}
					on:click={() => handleBallClick(ball)}
					disabled={ball.isDead || (isGameOver && !isDeadBallMode)}
					in:send|global={{ key: ball.number }}
					out:receive|global={{ key: ball.number }}
				>
					<Ball {ball} size={'large'} pocketed={ball.isPocketed} class="mx-auto" />
				</button>
			{/if}
		</div>
	{/each}
</div>
<div class="flex-auto shrink-0">
	{#if isDeadBallMode}
		<button
			aria-label="dead mode exit button"
			class="rounded-xl bg-slate-600 py-2 w-full h-14"
			on:click={handleDeadBallSave}>Exit Deadball Mode</button
		>
	{:else}
		<button
			aria-label="switch innings button"
			class="rounded-xl py-2 w-full h-14 transition-colors {game.currentPlayer.color}"
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
	{/if}
</div>

<div
	aria-label="control button container"
	class:invisible={isDeadBallMode}
	class="flex flex-auto shrink-0 h-14"
>
	<ControlButtons
		{isGameOver}
		on:undo={handleUndo}
		on:safety={handleSafety}
		on:timeout={handleTimeout}
		on:deadBallMode={handleDeadBallMode}
	/>
</div>
