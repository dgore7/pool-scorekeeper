<script lang="ts">
	import { NineBallGame } from '$lib';
	import { writable } from 'svelte/store';
	import { Safety, Miss, Increment, EndRack, Timeout, Undo } from '$lib/nine-ball/actions.js';

	export let data;

	const nineBallGame = writable(new NineBallGame());

	function handleClick() {
		$nineBallGame.doAction(new Increment());
		$nineBallGame = $nineBallGame;
	}

	function handleNineBall() {
		$nineBallGame.doAction(new EndRack());
		$nineBallGame = $nineBallGame;
	}

	function handleTurn() {
		$nineBallGame.doAction(new Miss());
		$nineBallGame = $nineBallGame;
	}

	function handleSaftey() {
		$nineBallGame.doAction(new Safety());
		$nineBallGame = $nineBallGame;
	}

	function handleTimeout() {
		$nineBallGame.doAction(new Timeout());
		$nineBallGame = $nineBallGame;
	}

	function handleUndo() {
		$nineBallGame.doAction(new Undo());
		$nineBallGame = $nineBallGame;
	}
</script>

<div class="layout">
	<main>

		<div aria-label="score">
			<div class="player-score" aria-label="score-player-one">
				{$nineBallGame.players[0].score}
				<div>
					Safeties: {$nineBallGame.players[0].safeties}
				</div>
				<div>
					Timeouts: {$nineBallGame.currentRack.timeouts[0]}
				</div>
			</div>
			<div class="player-score" aria-label="score-player-two">
				{$nineBallGame.players[1].score}
				<div>
					Safeties: {$nineBallGame.players[1].safeties}
				</div>
				<div>
					Timeouts: {$nineBallGame.currentRack.timeouts[1]}
				</div>
			</div>
		</div>
		<h2>score</h2>
		<div>Total Innings: {$nineBallGame.totalInnings}</div>
		<div>Rack {$nineBallGame.racks.length} Inninges: {$nineBallGame.currentRack.innings}</div>

		<div>
			{$nineBallGame.currentPlayer.name}'s turn
		</div>

		<div aria-label="controls">
			<button on:click={handleClick}>{$nineBallGame.currentPlayer.name} made ball</button>
			<button on:click={handleNineBall}
				>{$nineBallGame.currentPlayer.name} made 9 ball and won</button
			>
			<button on:click={handleSaftey}>Defensive Shot</button>
			<button on:click={handleTurn}>End Turn</button>
			<button on:click={handleTimeout}>Time Out</button>

			<button on:click={handleUndo}>Undo Action</button>
		</div>
	</main>
</div>

<style>
	button,
	.player-score {
		border: none;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 2rem;
	}

	.player-score {
		flex-direction: column;
	}

	button {
		background-color: blueviolet;
	}

	[aria-label='score'] {
		display: grid;
		grid-template-columns: 1fr 1fr;
		column-gap: 0.5rem;
	}

	[aria-label='controls'] {
		display: flex;
		flex-direction: column;
		gap: 1em;
		margin: auto;
		max-width: 300px;
	}

	.layout {
		display: grid;
		grid-template-columns: 1fr;
		height: 100vh;
	}
</style>
