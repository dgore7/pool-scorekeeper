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
	import Scoreboard from '$lib/components/nine-ball/Scoreboard.svelte';
	import PlayerStats from '$lib/components/nine-ball/PlayerStats.svelte';
	import ProgressBar from '$lib/components/ProgressBar.svelte';
	import ControlPad from '$lib/components/nine-ball/ControlPad.svelte';
	import DeadBallTitle from '$lib/components/nine-ball/DeadBallTitle.svelte';
	import TrophyIcon from '$lib/components/icons/TrophyIcon.svelte';
	import type { Ball } from '$lib/common/ball.js';

	export let data;

	const { game } = data as Required<{ game: Writable<NineBallGame> }>;
	const { toast, toastTime } = data;

	let isDeadBallMode = false;

	function handlePocket(ball: Ball) {
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
				class: 'scale-150'
			};
		}
	}

	function handleWinner() {
		$toastTime = 5000;
		$toast = {
			message: `Player ${$game.currentPlayer.name} wins!`,
			icon: TrophyIcon,
			class: 'bg-gray-200'
		};
	}

	function handleBallPocket(event: CustomEvent<Ball>) {
		const pocketedBall = event.detail;
		handlePocket(pocketedBall);
		$game = $game;
	}

	function handleDeadBalls(event: CustomEvent<Ball[]>) {
		handleDeadBallMode();
		const deadBalls = event.detail;
		deadBalls.forEach((ball) => {
			if (ball.isPocketed) {
				$game.doAction(new PostKill(), ball);
			} else if (($game.isGameOver && ball.number === 9) || ball.number < 9) {
				$game.doAction(new DeadBall(), ball);
			}
		});
		$game = $game;
	}
	$: document.body.style.backgroundColor = isDeadBallMode ? 'darkkhaki' : '#131318';
</script>

{#if $game}
	{#if isDeadBallMode}
		<DeadBallTitle />
	{:else}
		<Scoreboard>
			{#each $game.players as player, playerNumber}
				<PlayerStats {player} game={$game} {playerNumber} />
			{/each}
		</Scoreboard>
		{#each $game.players as player}
			<ProgressBar {player} game={$game} />
		{/each}

		<div class="flex justify-between py-1 items-baseline">
			<span class="text-xl">
				{$game.currentPlayer.name}'s Turn
			</span>
			<span>
				Innings: {$game.currentRack.innings}
			</span>
		</div>
	{/if}
	<ControlPad
		{game}
		{isDeadBallMode}
		on:ballPocket={handleBallPocket}
		on:miss={handleTurn}
		on:undo={handleUndo}
		on:safety={handleSafety}
		on:timeout={handleTimeout}
		on:newRack={handleNewRack}
		on:deadBallMode={handleDeadBallMode}
		on:saveDeadBalls={handleDeadBalls}
	/>
{/if}
