<script lang="ts">
	import BallSelect from '$lib/components/BallSelect.svelte';

	import Dialog from '$lib/components/Dialog.svelte';

	import EightBallControlPad from '$lib/components/EightBallControlPad.svelte';

	import PlayerStats from '$lib/components/PlayerStats.svelte';

	import ProgressBar from '$lib/components/ProgressBar.svelte';

	import Scoreboard from '$lib/components/Scoreboard.svelte';

	import TeamDisplay from '$lib/components/TeamDisplay.svelte';

	import {
		EightBallGame,
		Miss,
		Win,
		Lose,
		Undo,
		Player,
		Timeout,
		Safety,
		type BallType,
		type EndGameCase,
		AssignSide
	} from '$lib/eight-ball';

	export let data;
	const { dialog } = data;

	let game = new EightBallGame(new Player('John', 5, 'bg-[red]'), new Player('George', 5, 'bg-[blue]'));
	let isGameOver = false;

	$: areTeamsAssigned = game.currentRack.playerBalls.some(
		(value: BallType | null) => value !== null
	);

	function handleBallSelect(e: CustomEvent<BallType>) {
		game.doAction(new AssignSide(e.detail));
		game = game;
	}

	function handleMiss() {
		game.doAction(new Miss());
		game = game;
	}

	function handleWinDialog() {
		let message = `How did ${game.currentPlayer.name} win?`;
		let conditions = getWinConditions();
		$dialog = { message, conditions };
	}

	function handleWin(e: CustomEvent<EndGameCase>) {
		game.doAction(new Win(e.detail));
		game = game;
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
		$dialog = { message, conditions };
	}

	function handleCancelDialog() {
		$dialog = null;
	}

	function handleLose(e: CustomEvent<EndGameCase>) {
		game.doAction(new Lose(e.detail));
		game = game;
	}

	function handleUndo() {
		game.doAction(new Undo());
		game = game;
	}

	function handleTimeout() {
		game.doAction(new Timeout());
		game = game;
	}

	function handleSafety() {
		game.doAction(new Safety());
		game = game;
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
	<Scoreboard {game}>
		{#each game.players as player, playerNumber}
			<PlayerStats {player} {game} {playerNumber} />
		{/each}
		{#each game.players as player, playerNumber}
			<ProgressBar {player} reverse={!!playerNumber} />
		{/each}
	</Scoreboard>

	<div class="flex-1"></div>
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
</div>
