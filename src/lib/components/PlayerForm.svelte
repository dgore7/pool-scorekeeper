<script lang="ts">
	import PlayerFieldSet from './PlayerFieldSet.svelte';
	import type { GameType } from '$lib/types';

	export let playerFormData = {
		playerOneName: '',
		playerTwoName: '',
		playerOneHandicap: NaN,
		playerTwoHandicap: NaN
	};

	export let selectedGame: GameType;
</script>

<!-- <h2>Who's Playin?</h2>-->

<p>Cue Count - Crafty Calculations for Cool Cueists</p>
<PlayerFieldSet
	name="player-one"
	bind:playerName={playerFormData.playerOneName}
	bind:playerHandicap={playerFormData.playerOneHandicap}
	{selectedGame}
/>
<PlayerFieldSet
	name="player-two"
	bind:playerName={playerFormData.playerTwoName}
	bind:playerHandicap={playerFormData.playerTwoHandicap}
	{selectedGame}
/>
