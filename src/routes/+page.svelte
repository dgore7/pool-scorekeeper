<script lang="ts">
	import { Meter, Player } from '$lib';
	import { writable } from 'svelte/store';
	export let data;

	let playerOneScore = 0;
	let playerTwoScore = 0;
	let innings = 0;

	const playerOne = writable(new Player());
	const playerTwo = writable(new Player());

	let active = playerOne;

	function handleClick(this: HTMLButtonElement) {
		const value = parseInt(this.value);
		$active.score += value;
	}
</script>

<div class="layout">
  <Meter player={playerOne} placement="left"/>

	<main>
		<div aria-label="score">
			<div class="player-score" aria-label="score-player-one">
				{$playerOne.score}
			</div>
			<div class="player-score" aria-label="score-player-two">
				{$playerTwo.score}
			</div>
		</div>
		<h2>points</h2>
		<div aria-label="controls">
			<button value="1" on:click={handleClick}> + </button>
			<button value="-1" on:click={handleClick}> - </button>
		</div>
	</main>
	<Meter player={playerTwo} placement="right" />
</div>

<style>
	button,
	.player-score {
		border: none;
		aspect-ratio: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 2rem;
	}

	button[value='1'] {
		background-color: greenyellow;
	}
	button[value='-1'] {
		background-color: orangered;
	}
	[aria-label='controls'],
	[aria-label='score'] {
		display: grid;
		grid-template-columns: 1fr 1fr;
		column-gap: 0.5rem;
	}

	.layout {
		display: grid;
		grid-template-columns: 40px 1fr 40px;
		height: 100vh;
	}

</style>
