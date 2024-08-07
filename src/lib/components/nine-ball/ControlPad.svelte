<script lang="ts">
	import Ball from '../Ball.svelte';
	import ControlButtons from './ControlButtons.svelte';
	import { createEventDispatcher } from 'svelte';
	import type { NineBallGame } from '$lib';
	import deadBallSvg from '$lib/assets/balls/dead/1.svg';
	import { receive, send } from '$lib/cross-fade';
	import type { Ball as BallModel } from '$lib/common/ball';
	import type { Writable } from 'svelte/store';
	import { tweened } from 'svelte/motion';
	import { getCssPropertyValue } from '$lib/colors';
	import { interpolateLab } from 'd3-interpolate';

	export let game: Writable<NineBallGame>;
	export let isDeadBallMode: boolean = false;

	const dispatch = createEventDispatcher();

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
		dispatch('ballPocket', pocketedBall);
	}

	function addDeadBall(ball: BallModel) {
		if (ball.number === 9 && !$game.isGameOver) {
			return;
		}

		ball.isDead = true;
		deadBallsToAdd.push(ball);
		$game = $game;
	}

	function removeDeadBall(ball: BallModel) {
		if (!isDeadBallMode) return;
		ball.isDead = false;
		let zombieBallIndex = deadBallsToAdd.indexOf(ball);
		deadBallsToAdd.splice(zombieBallIndex, 1);
		deadBallsToAdd = deadBallsToAdd;

		$game = $game;
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
		dispatch('newRack');
	}

	function handleDeadBallSave() {
		dispatch('saveDeadBalls', deadBallsToAdd);
		deadBallsToAdd = [];
	}

	const fromColor = tweened(getCssPropertyValue($game.currentPlayer.color.gradient.stops[0]), {
		interpolate: interpolateLab
	});

	const toColor = tweened(getCssPropertyValue($game.currentPlayer.color.gradient.stops[1]), {
		interpolate: interpolateLab
	});

	$: [$fromColor, $toColor] = $game.currentPlayer.color.gradient.stops.map(getCssPropertyValue);
</script>

{#if $game}
	<div class="w-full h-full flex-auto flex flex-col">
		<div
			class="grid w-full h-full max-h-[36rem] overflow-hidden m-auto portrait:mb-0 grid-cols-3 grid-rows-3 gap-2 py-4"
		>
			{#each $game.currentRack.gameBalls as ball (ball.number)}
				<div class="relative w-full max-w-full h-full">
					{#if ball.isDead}
						<button
							class="active:scale-90 transition-transform aria-pressed:pointer-events-none h-full w-full absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
							class:hidden={!ball.isDead}
							on:click={() => removeDeadBall(ball)}
							disabled={!isDeadBallMode}
							in:send|global={{ key: ball.number }}
							out:receive|global={{ key: ball.number }}
						>
							<img
								src={deadBallSvg}
								alt="dead ball"
								class="w-full max-h-[min(100%,6rem)] mx-auto"
							/>
						</button>
					{:else}
						<button
							class="active:scale-90 transition-transform aria-pressed:pointer-events-none h-full w-full absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
							aria-pressed={(ball.isPocketed || ball.isDead) && !isDeadBallMode}
							class:hidden={ball.isDead}
							on:click={() => handleBallClick(ball)}
							disabled={ball.isDead || ($game.isGameOver && !isDeadBallMode)}
							in:send|global={{ key: ball.number }}
							out:receive|global={{ key: ball.number }}
						>
							<Ball {ball} pocketed={ball.isPocketed} />
						</button>
					{/if}
				</div>
			{/each}
		</div>
		<div class="landscape:h-20 grid items-center">
			{#if isDeadBallMode}
				<button
					aria-label="dead mode exit button"
					class="border-2 border-[#6e6d6d] border-solid rounded-xl bg-gradient-to-b from-[#5c5c65] to-[#282727] py-2 w-full h-12"
					on:click={handleDeadBallSave}>Save and Exit Deadball Mode</button
				>
			{:else}
				<button
					aria-label="switch innings button"
					class="rounded-xl py-2 w-full h-12 mb-2 bg-gradient-to-b {$game.currentPlayer.color
						.border} border transition-all"
					style:--tw-gradient-stops="{$fromColor}, {$toColor}"
					on:click={$game.isRackOver ? handleNewRack : handleMiss}
					disabled={isDeadBallMode || $game.isGameOver}
				>
					{#if $game.isRackOver}
						New Rack
					{:else if $game.isGameOver}
						{$game.currentPlayer.name} Wins!
					{:else}
						End {$game.currentPlayer.name}'s Turn
					{/if}
				</button>
			{/if}
		</div>
	</div>

	<div
		aria-label="control button container"
		class:invisible={isDeadBallMode}
		class="flex flex-auto shrink-0 portrait:h-12 landscape:w-20 landscape:flex-col"
	>
		<ControlButtons
			isGameOver={$game.isGameOver}
			on:undo={handleUndo}
			on:safety={handleSafety}
			on:timeout={handleTimeout}
			on:deadBallMode={handleDeadBallMode}
		/>
	</div>
{/if}
