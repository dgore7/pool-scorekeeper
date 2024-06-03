<script lang="ts">
	import BallSelect from '$lib/components/BallSelect.svelte';

	import Dialog from '$lib/components/Dialog.svelte';

	import EightBallControlPad from '$lib/components/EightBallControlPad.svelte';

	import PlayerStats from '$lib/components/PlayerStats.svelte';

	import ProgressBar from '$lib/components/ProgressBar.svelte';

	import Scoreboard from '$lib/components/Scoreboard.svelte';

	import TeamDisplay from '$lib/components/TeamDisplay.svelte';

	import TrophyIcon from '$lib/components/icons/TrophyIcon.svelte';

	import {
		EightBallGame,
		Miss,
		Win,
		Lose,
		Undo,
		Timeout,
		Safety,
		AssignSide,
		type BallType,
		type EndGameCase,
		type Condition
	} from '$lib/eight-ball';

	import type { Writable } from 'svelte/store';

	export let data;
	const { game } = data as Required<{ game: Writable<EightBallGame> }>;
	const { dialog, toast, toastTime } = data;

	let isGameOver = false;

	$: areTeamsAssigned = $game.currentRack.playerBalls.some(
		(value: BallType | null) => value !== null
	);

	function handleBallSelect(e: CustomEvent<BallType>) {
		$game.doAction(new AssignSide(e.detail));
		$game = $game;
	}

	function handleMiss() {
		$game.doAction(new Miss());
		$game = $game;
	}

	function handleWinDialog() {
		let message = `How did ${$game.currentPlayer.name} win?`;
		let conditions = getWinConditions() as Condition[];
		$dialog = { message, conditions };
	}

	function handleWin(e: CustomEvent<EndGameCase>) {
		$game.doAction(new Win(e.detail));
		$game = $game;

		if ($game.currentPlayer.score === $game.currentPlayer.scoreRequired) {
			handleWinner();
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

	function handleSubmitDialog(e: CustomEvent<EndGameCase>) {
		if (e.detail === '8OB' || e.detail === 'BNR') {
			handleWin(e);
		} else {
			handleLose(e);
		}
		$dialog = null;
	}

	function getWinConditions() {
		if ($game.currentRack.innings) {
			return [{ id: 'M8', message: 'Made The 8!' }];
		} else {
			return [
				{ id: '8OB', message: '8 On The Break!' },
				{ id: 'BNR', message: 'Break And Run!' }
			];
		}
	}

	function handleLoseDialog() {
		let message = `How did ${$game.currentPlayer.name} lose?`;
		let conditions = [
			{ id: 'E8', message: 'Early 8.' },
			{ id: 'W8', message: '8 In Wrong Pocket.' },
			{ id: 'S8', message: 'Scratched On 8.' }
		] as Condition[];
		$dialog = { message, conditions };
	}

	function handleCancelDialog() {
		$dialog = null;
	}

	function handleLose(e: CustomEvent<EndGameCase>) {
		$game.doAction(new Lose(e.detail));
		$game = $game;
	}

	function handleUndo() {
		$game.doAction(new Undo());
		if (isGameOver) {
			isGameOver = false;
		}
		$game = $game;
	}

	function handleTimeout() {
		$game.doAction(new Timeout());
		$game = $game;
	}

	function handleSafety() {
		$game.doAction(new Safety());
		$game = $game;
	}
</script>

<div class="container m-auto max-w-xl h-full my-4 flex flex-col">
	{#if $dialog}
		<Dialog
			message={$dialog.message}
			conditions={$dialog.conditions}
			on:cancelDialog={handleCancelDialog}
			on:submitDialog={handleSubmitDialog}
		/>
	{/if}
	<Scoreboard game={$game}>
		{#each $game.players as player, playerNumber}
			<PlayerStats {player} game={$game} {playerNumber} />
		{/each}
		{#each $game.players as player, playerNumber}
			<ProgressBar {player} reverse={!!playerNumber} />
		{/each}
	</Scoreboard>

	<div class="flex-1"></div>
	<div class="container flex flex-col gap-6">
		{#if !areTeamsAssigned}
			<BallSelect game={$game} on:ballSelect={handleBallSelect} />
		{:else}
			<TeamDisplay game={$game} />
		{/if}

		<EightBallControlPad
			{isGameOver}
			game={$game}
			on:miss={handleMiss}
			on:win={handleWin}
			on:winDialog={handleWinDialog}
			on:lose={handleLoseDialog}
			on:undo={handleUndo}
			on:timeout={handleTimeout}
			on:safety={handleSafety}
		/>
	</div>
</div>
