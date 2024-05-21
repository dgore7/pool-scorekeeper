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
		DoubleIncrement
	} from '$lib/nine-ball/actions.js';
	import GraveIcon from '$lib/components/icons/GraveIcon.svelte';
	import WarningIcon from '$lib/components/icons/WarningIcon.svelte';
	import Scoreboard from '$lib/components/Scoreboard.svelte';
	import PlayerStats from '$lib/components/PlayerStats.svelte';
	import ProgressBar from '$lib/components/ProgressBar.svelte';
	import ControlPad from '$lib/components/ControlPad.svelte';
	import BallReturn from '$lib/components/BallReturn.svelte';

	import type { BallModel } from '$lib/components/Ball.svelte';

	export let data;

	const { game } = data as Required<{ game: Writable<NineBallGame> }>;
	const { toast, toastTime } = data;

	let isDeadBallMode = false;

	function handleIncrement() {
		$game.doAction(new Increment());
		$game = $game;
	}

	function handleDoubleIncrement() {
		$game.doAction(new DoubleIncrement());
		$game = $game;
	}

	function handleTurn() {
		$game!.doAction(new Miss());
		$game = $game;
	}

	function handleSaftey() {
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
		$game.doAction(new EndRack(), $game.currentRack.turn);
		$game = $game;
	}

	function handleDeadBallMode() {
		isDeadBallMode = !isDeadBallMode;
		$toastTime = 10000;
		if (isDeadBallMode) {
			$toast = {
				message:
					'You Have Entered Deal Ball Mode. Select All Dead Balls Then Click Dead Ball Button Again to Save and Exist Dead Ball Mode.',
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

	function handleBallPocket(event: CustomEvent<BallModel>) {
		event.detail.isPocketed = true;
		$game.currentRack.pocketedBalls.push(event.detail);
		if (event.detail.number === 9) {
			handleDoubleIncrement();
		} else {
			handleIncrement();
		}
		$game = $game;
	}

	function handleDeadBall(event: CustomEvent<BallModel>) {
		let deadBall = event.detail;
		deadBall.isDead = true;
		deadBall.isPocketed = true;
		$game.currentRack.pocketedBalls.push(deadBall);
		$game.currentRack.deadBalls.push(deadBall);
		$game = $game;
	}
</script>

<main
	class="container m-auto max-w-96"
	style="background-color:{isDeadBallMode ? 'darkkhaki' : '#131318'}"
>
	<Scoreboard game={$game}>
		{#each $game.players as player, playerNumber}
			<PlayerStats {player} game={$game} {playerNumber} />
		{/each}
	</Scoreboard>
	<ProgressBar player={$game.players[0]} color={'red'} />
	<ProgressBar player={$game.players[1]} color={'blue'} />
	<ControlPad
		game={$game}
		{isDeadBallMode}
		on:ballPocket={handleBallPocket}
		on:miss={handleTurn}
		on:undo={handleUndo}
		on:safety={handleSaftey}
		on:timeout={handleTimeout}
		on:newRack={handleNewRack}
		on:deadBallMode={handleDeadBallMode}
		on:deadBall={handleDeadBall}
	/>
	<BallReturn game={$game} />
</main>
