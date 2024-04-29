<script lang="ts">
	import { NineBallGame } from '$lib';
	import { writable } from 'svelte/store';
	import { Safety, Miss, Increment, EndRack, Timeout, Undo } from '$lib/nine-ball/actions.js';
	import Scoreboard from '../lib/components/Scoreboard.svelte';
	import PlayerStats from '$lib/components/PlayerStats.svelte';
	import ProgressBar from '$lib/components/ProgressBar.svelte';

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

<main>
	<Scoreboard game={$nineBallGame}>
		{#each $nineBallGame.players as player, playerNumber}
			<PlayerStats {player} game={$nineBallGame} {playerNumber} />
		{/each}
	</Scoreboard>

	<ProgressBar player={$nineBallGame.players[0]} color={"red"}/>
	<ProgressBar player={$nineBallGame.players[1]} color={"blue"}/>

	<div aria-label="controls">
		<button on:click={handleClick}>{$nineBallGame.currentPlayer.name} made ball</button>
		<button on:click={handleNineBall}>{$nineBallGame.currentPlayer.name} made 9 ball and won</button
		>
		<button on:click={handleSaftey}>Defensive Shot</button>
		<button on:click={handleTurn}>End Turn</button>
		<button on:click={handleTimeout}>Time Out</button>


		<h2>score</h2>
		<div>Total Innings: {$nineBallGame.totalInnings}</div>
		<div>Rack {$nineBallGame.racks.length} Inninges: {$nineBallGame.currentRack.innings}</div>

		<button on:click={handleUndo}>Undo Action</button>
	</div>
</main>

<style>
	button {
		border: 5px solid white;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 2rem;
	}

	button:hover {
		background-color: orange;
	}

	button:active {
		background-color: red;
	}

	[aria-label='controls'] {
		display: flex;
		flex-direction: column;
		gap: 1em;
		margin: auto;
		max-width: 300px;
	}
</style>
