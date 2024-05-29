<script lang="ts">
	import { EightBallGame } from '$lib/eight-ball/index';
	import { Player } from '$lib/eight-ball/player';
	import Scoreboard from '$lib/components/Scoreboard.svelte';
	import PlayerStats from '$lib/components/PlayerStats.svelte';
	import BallSelect from '$lib/components/BallSelect.svelte';
	import TeamDisplay from '$lib/components/TeamDisplay.svelte';
	import type { ballType } from '$lib/eight-ball/types';
	import { Stripe, Solid, Safety, Miss, Undo, Timeout, Win, Lose } from '$lib/eight-ball/actions';
	import EightBallControlPad from '$lib/components/EightBallControlPad.svelte';
	import ProgressBar from '$lib/components/ProgressBar.svelte';
	import Dialog from '$lib/components/Dialog.svelte';
	import type { endGameCase } from '$lib/eight-ball/types.ts';

	export let data;
	const { dialog } = data;

	let game = new EightBallGame(new Player('John', 5, 'red'), new Player('George', 5, 'blue'));
	let isGameOver = false;

	let miss = new Miss();
	let win = new Win();
	let lose = new Lose();
	let undo = new Undo();
	let timeout = new Timeout();
	let safety = new Safety();
	let stripe = new Stripe();
	let solid = new Solid();

	$: areTeamsAssigned = game.currentRack.playerBalls.some(
		(value: ballType | null) => value !== null
	);

	function handleBallSelect(e: CustomEvent) {
		if (e.detail.isStripe) {
			game.doAction(stripe);
		} else {
			game.doAction(solid);
		}
		game = game;
	}

	function handleMiss() {
		game.doAction(miss);
		game = game;
	}

	function handleWinDialog() {
		let message = `How did ${game.currentPlayer.name} win?`;
		let conditions = getWinConditions();
		$dialog = { message, conditions, selectedCondition: null };
	}

	function handleWin(id: endGameCase | CustomEvent<endGameCase>) {
		let winId = typeof id === 'string' ? id : id.detail;
		game.doAction(win, winId);
		game = game;
	}

	function handleSubmitDialog(e: CustomEvent<endGameCase>) {
		if (e.detail === '8OB' || e.detail === 'BNR') {
			handleWin(e.detail);
		} else {
			handleLose(e.detail);
		}
		$dialog = null;
	}

	function getWinConditions() {
		if (game.currentRack.innings) {
			return [{ id: 'M8', message: 'Made The 8!' }];
		} else {
			return [
				{ id: '8OB', message: '8 On The Break!' },
				{ id: 'BNR', message: 'Break And Run!' }
			];
		}
	}

	function handleLoseDialog() {
		let message = `How did ${game.currentPlayer.name} lose?`;
		let conditions = [
			{ id: 'E8', message: 'Early 8.' },
			{ id: 'W8', message: '8 In Wrong Pocket.' },
			{ id: 'S8', message: 'Scratched On 8.' }
		];
		$dialog = { message, conditions, selectedCondition: null };
	}

	function handleCancelDialog() {
		$dialog = null;
	}

	function handleLose(id: endGameCase) {
		game.doAction(lose, id);
		game = game;
	}

	function handleUndo() {
		game.doAction(undo);
		game = game;
	}

	function handleTimeout() {
		game.doAction(timeout);
		game = game;
	}

	function handleSafety() {
		game.doAction(safety);
		game = game;
	}
</script>

<div class="container m-auto max-w-xl h-full my-4">
	{#if $dialog}
		<Dialog
			message={$dialog.message}
			conditions={$dialog.conditions}
			on:cancelDialog={handleCancelDialog}
			on:submitDialog={handleSubmitDialog}
		/>
	{/if}
</div>

<Scoreboard {game}>
	{#each game.players as player, playerNumber}
		<PlayerStats {player} {game} {playerNumber} />
	{/each}
</Scoreboard>

{#each game.players as player}
	<ProgressBar {player} />
{/each}

<div class="container flex flex-col gap-6">
	{#if !areTeamsAssigned}
		<BallSelect {game} on:ballSelect={handleBallSelect} />
	{:else}
		<TeamDisplay {game} />
	{/if}

	<EightBallControlPad
		{isGameOver}
		{game}
		on:miss={handleMiss}
		on:win={handleWin}
		on:winDialog={handleWinDialog}
		on:lose={handleLoseDialog}
		on:undo={handleUndo}
		on:timeout={handleTimeout}
		on:safety={handleSafety}
	/>
</div>


