<script lang="ts">
	import type { NineBallGame } from '$lib';
	import type { Writable } from 'svelte/store';
	import { Safety, Miss, Increment, EndRack, Timeout, Undo } from '$lib/nine-ball/actions.js';
	import Scoreboard from '../lib/components/Scoreboard.svelte';
	import PlayerStats from '$lib/components/PlayerStats.svelte';
	import ProgressBar from '$lib/components/ProgressBar.svelte';

	export let data;

	const { game } = data as Required<{ game: Writable<NineBallGame> }>;

	function handleClick() {
		$game.doAction(new Increment());
		$game = $game;
	}

	function handleNineBall() {
		$game.doAction(new EndRack());
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
</script>

<main>
	<Scoreboard game={$game}>
		{#each $game.players as player, playerNumber}
			<PlayerStats {player} game={$game} {playerNumber} />
		{/each}
	</Scoreboard>

	<ProgressBar player={$game.players[0]} color={'red'} />
	<ProgressBar player={$game.players[1]} color={'blue'} />

	<div aria-label="controls">
		<button on:click={handleClick}>{$game.currentPlayer.name} made ball</button>
		<button on:click={handleNineBall}>{$game.currentPlayer.name} made 9 ball and won</button>
		<button on:click={handleSaftey}>Defensive Shot</button>
		<button on:click={handleTurn}>End Turn</button>
		<button on:click={handleTimeout}>Time Out</button>

		<h2>score</h2>
		<div>Total Innings: {$game.totalInnings}</div>
		<div>Rack {$game.racks.length} Inninges: {$game.currentRack.innings}</div>

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
