<script lang="ts">
	import PlayerFieldSet from './PlayerFieldSet.svelte';
	import type { GameType } from '$lib/types';
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
</script>

<p>Cue Count - Crafty Calculations for Cool Cueists</p>
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
