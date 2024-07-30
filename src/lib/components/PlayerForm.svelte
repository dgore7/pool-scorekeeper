<script lang="ts">
	import PlayerFieldSet from './PlayerFieldSet.svelte';
	import BackIcon from './icons/BackIcon.svelte';
	import SwapIcon from './icons/SwapIcon.svelte';
	import type { APAHandicaps, GameType } from '$lib/types';
	import { BALL_COLORS } from '$lib/common/ball';
	import { dev } from '$app/environment';

	export let playerFormData = {
		playerOneName: dev ? 'Shane Van Boening' : '',
		playerTwoName: dev ? 'Adam Stanley' : '',
		playerOneHandicap: dev ? 9 : NaN,
		playerTwoHandicap: dev ? 1 : NaN,
		playerOneColor: BALL_COLORS.find((color) => color.label === 'red')!,
		playerTwoColor: BALL_COLORS.find((color) => color.label === 'blue')!
	};

	export let selectedGame: GameType;

	export let step: number;

	function swapPlayers() {
		playerFormData = {
			playerOneName: playerFormData.playerTwoName,
			playerOneHandicap: playerFormData.playerTwoHandicap,
			playerOneColor: playerFormData.playerTwoColor,
			playerTwoName: playerFormData.playerOneName,
			playerTwoHandicap: playerFormData.playerOneHandicap,
			playerTwoColor: playerFormData.playerOneColor
		};
	}

	function handleBack() {
		step--;
	}
</script>

<div class="flex flex-col flex-grow justify-start gap-6">
	<div class="flex">
		<button type="button" on:click={handleBack}><BackIcon /></button>
		<h1 class="mx-auto self-center">Player Setup</h1>
		<button type="button" on:click={swapPlayers}><SwapIcon /></button>
	</div>

	<PlayerFieldSet
		name="player-one"
		bind:playerName={playerFormData.playerOneName}
		bind:playerHandicap={playerFormData.playerOneHandicap}
		{selectedGame}
		bind:opponentColor={playerFormData.playerTwoColor}
		bind:selectedColor={playerFormData.playerOneColor}
	/>

	<PlayerFieldSet
		name="player-two"
		bind:playerName={playerFormData.playerTwoName}
		bind:playerHandicap={playerFormData.playerTwoHandicap}
		{selectedGame}
		bind:opponentColor={playerFormData.playerOneColor}
		bind:selectedColor={playerFormData.playerTwoColor}
	/>
</div>
