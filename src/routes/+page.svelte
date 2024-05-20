<script lang="ts">
	import type { NineBallGame } from '$lib';
	import type { Writable } from 'svelte/store';
	import { Safety, Miss, Increment, EndRack, Timeout, Undo } from '$lib/nine-ball/actions.js';
	import Scoreboard from '../lib/components/Scoreboard.svelte';
	import PlayerStats from '$lib/components/PlayerStats.svelte';
	import ProgressBar from '$lib/components/ProgressBar.svelte';
	import BallButtons from '$lib/components/BallButtons.svelte';
	import BallReturn from '$lib/components/BallReturn.svelte';
	import type { BallModel } from '$lib/components/Ball.svelte';

	export let data;

	const { game } = data as Required<{ game: Writable<NineBallGame> }>;

	let madeBalls: BallModel[] = [];

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

	function handleBallPocket(event: CustomEvent<BallModel>) {
		madeBalls.push(event.detail);
		madeBalls = madeBalls;
	}
</script>

<main class="container m-auto max-w-96">
	<Scoreboard game={$game}>
		{#each $game.players as player, playerNumber}
			<PlayerStats {player} game={$game} {playerNumber} />
		{/each}
	</Scoreboard>

	<ProgressBar player={$game.players[0]} color={'red'} />
	<ProgressBar player={$game.players[1]} color={'blue'} />

	<BallButtons on:ballPocket={handleBallPocket} />
	<BallReturn {madeBalls} />
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

	/* [aria-label='controls'] {
		margin: auto;
	} */
</style>
