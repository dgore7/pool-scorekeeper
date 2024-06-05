<script lang="ts">
	import PlayerFieldSet from './PlayerFieldSet.svelte';

	export let playerFormData = {
		playerOneName: '',
		playerTwoName: '',
		playerOneHandicap: NaN,
		playerTwoHandicap: NaN,
		playerOneColor: 'red',
		playerTwoColor: 'blue'
	};
</script>

<!-- <h2>Who's Playin?</h2>-->

<p>Cue Count - Crafty Calculations for Cool Cueists</p>
<PlayerFieldSet
	name="player-one"
	bind:playerName={playerFormData.playerOneName}
	bind:playerHandicap={playerFormData.playerOneHandicap}
	bind:opponentColor={playerFormData.playerTwoColor}
	bind:selectedColor={playerFormData.playerOneColor}
/>
<PlayerFieldSet
	name="player-two"
	bind:playerName={playerFormData.playerTwoName}
	bind:playerHandicap={playerFormData.playerTwoHandicap}
	bind:opponentColor={playerFormData.playerOneColor}
	bind:selectedColor={playerFormData.playerTwoColor}
/>
