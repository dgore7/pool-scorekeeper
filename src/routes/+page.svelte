<script lang="ts">
	import type { NineBallGame } from '$lib';
	import type { Writable } from 'svelte/store';
	import {
		Safety,
		Miss,
		Increment,
		EndRack,
		Timeout,
		Undo,
		DeadBall,
		PostKill
	} from '$lib/nine-ball/actions.js';
	import GraveIcon from '$lib/components/icons/GraveIcon.svelte';
	import WarningIcon from '$lib/components/icons/WarningIcon.svelte';
	import Scoreboard from '$lib/components/Scoreboard.svelte';
	import PlayerStats from '$lib/components/PlayerStats.svelte';
	import ProgressBar from '$lib/components/ProgressBar.svelte';
	import ControlPad from '$lib/components/ControlPad.svelte';
	import BallReturn from '$lib/components/BallReturn.svelte';
	import DeadBallTitle from '$lib/components/DeadBallTitle.svelte';
	import TrophyIcon from '$lib/components/icons/TrophyIcon.svelte';

	import type { BallModel } from '$lib/components/Ball.svelte';

	export let data;

	const { game } = data as Required<{ game: Writable<NineBallGame> }>;
	const { toast, toastTime } = data;

	let isDeadBallMode = false;
	let isGameOver = false;

	function handlePocket(ball: BallModel) {
		$game.doAction(new Increment(), ball);
		$game = $game;

		if ($game.currentPlayer.score === $game.currentPlayer.scoreRequired) {
			handleWinner();
		}
	}

	function handleTurn() {
		$game.doAction(new Miss());
		$game = $game;
	}

	function handleSafety() {
		$game.doAction(new Safety());
		$game = $game;
	}

	function handleTimeout() {
		$game.doAction(new Timeout());
		$game = $game;
	}

	function handleUndo() {
		$game.doAction(new Undo());
		$game = $game;

		if (isGameOver) {
			isGameOver = false;
		}
	}

	function handleNewRack() {
		$game.doAction(new EndRack());
		$game = $game;
	}

	function handleDeadBallMode() {
		isDeadBallMode = !isDeadBallMode;
		$toastTime = 10000;
		if (isDeadBallMode) {
			$toast = {
				message:
					'You Have Entered Dead Ball Mode. Select All Dead Balls Then Click Dead Ball Button Again to Save and Exist Dead Ball Mode.',
				icon: GraveIcon,
				class: 'bg-gray-200'
			};
		} else {
			$toast = {
				message: 'You Have Re-Entered the World of the Living.',
				icon: WarningIcon,
				class: 'bg-gray-200'
			};
		}
	}

	function handleWinner() {
		isGameOver = true;
		$toastTime = 5000;
		$toast = {
			message: `Player ${$game.currentPlayer.name} wins!`,
			icon: TrophyIcon,
			class: 'bg-gray-200'
		};
	}

	function handleBallPocket(event: CustomEvent<BallModel>) {
		const pocketedBall = event.detail;
		handlePocket(pocketedBall);
		$game = $game;
	}

	function handleDeadBalls(event: CustomEvent<BallModel[]>) {
		handleDeadBallMode();
		const deadBalls = event.detail;
		deadBalls.forEach((ball) => {
			if (ball.isPocketed) {
				$game.doAction(new PostKill(), ball);
			} else if ((isGameOver && ball.number === 9) || ball.number < 9) {
				$game.doAction(new DeadBall(), ball);
			}
		});
		$game = $game;
	}
</script>

<main
	class="container m-auto max-w-96 transition-colors h-screen"
	style="background-color:{isDeadBallMode ? 'darkkhaki' : '#131318'}"
>
	{#if isDeadBallMode}
		<DeadBallTitle />
	{:else}
		<Scoreboard game={$game}>
			{#each $game.players as player, playerNumber}
				<PlayerStats {player} game={$game} {playerNumber} />
			{/each}
		</Scoreboard>
	{/if}
	<div class:invisible={isDeadBallMode}>
		<ProgressBar player={$game.players[0]} />
		<ProgressBar player={$game.players[1]} />
	</div>

	<ControlPad
		game={$game}
		{isDeadBallMode}
		{isGameOver}
		on:ballPocket={handleBallPocket}
		on:miss={handleTurn}
		on:undo={handleUndo}
		on:safety={handleSafety}
		on:timeout={handleTimeout}
		on:newRack={handleNewRack}
		on:deadBallMode={handleDeadBallMode}
		on:saveDeadBalls={handleDeadBalls}
	/>
	<BallReturn game={$game} />
</main>
