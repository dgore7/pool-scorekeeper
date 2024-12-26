<script lang="ts">
	import BallSelect from '$lib/components/eight-ball/BallSelect.svelte';
	import LoseDialog from '$lib/components/eight-ball/LoseDialog.svelte';
	import EightBallControlPad from '$lib/components/eight-ball/EightBallControlPad.svelte';
	import PlayerStats from '$lib/components/eight-ball/PlayerStats.svelte';
	import ProgressBar from '$lib/components/ProgressBar.svelte';
	import Scoreboard from '$lib/components/nine-ball/Scoreboard.svelte';
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
	import InfoBox from '$lib/components/score-sheet/InfoBox.svelte';
	import AssignedBall from '$lib/components/eight-ball/AssignedBall.svelte';

	export let data;
	const { game } = data as Required<{ game: Writable<EightBallGame> }>;
	const { dialog, toast, toastTime } = data;

	let isGameOver = false;

	$: areTeamsAssigned = $game.currentRack.teams.some(
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
		$dialog = { message, conditions, game: $game };
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
		if ($game.currentPlayer.score === $game.currentPlayer.scoreRequired) {
			isGameOver = true;
		}
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
		$dialog = { message, conditions, game: $game };
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

<div class="flex-[1_0_auto] flex gap-4 portrait:flex-col">
	<div class="container m-auto max-w-xl h-full my-4 flex flex-col">
		{#if $dialog}
			<LoseDialog
				game={$game}
				message={$dialog.message}
				conditions={$dialog.conditions}
				on:cancelDialog={handleCancelDialog}
				on:submitDialog={handleSubmitDialog}
			/>
		{/if}

		<div
			class="grid grid-rows-[auto_1fr_auto] landscape:flex-[1_1_50%] bg-[#131318] portrait:py-4 px-6 portrait:-mx-6 landscape:h-full"
		>
			<Scoreboard>
				{#each $game.players as player, playerNumber}
					<PlayerStats {player} game={$game} {playerNumber} {areTeamsAssigned} />
				{/each}
			</Scoreboard>
			<div class="self-end">
				{#each $game.players as player}
					<ProgressBar {player} game={$game} />
				{/each}
			</div>
		</div>

		<div class="flex-1"></div>

		<div class="container flex flex-col gap-2">
			<InfoBox>
				<div class="grid grid-cols-2 h-32 relative">
					<div>
						<div class="text-xl my-2">
							{#if areTeamsAssigned}
								{$game.currentPlayer.name} is:
							{:else}
								Assign {$game.currentPlayer.name} to:
							{/if}
						</div>
						<div>Rack Innings: {$game.currentRack.innings}</div>
						<div>Total Innings: {$game.totalInnings}</div>
					</div>

					{#if !areTeamsAssigned}
						<BallSelect game={$game} on:ballSelect={handleBallSelect} />
					{:else}
						<AssignedBall game={$game} team={$game.currentRack.teams[$game.currentRack.turn]}/>
					{/if}
				</div>
			</InfoBox>

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
</div>
