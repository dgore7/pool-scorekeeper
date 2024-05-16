<script lang="ts">
	import PlayerFieldSet from './PlayerFieldSet.svelte';

	export let playerFormData = {
		playerOneName: '',
		playerTwoName: '',
		playerOneHandicap: NaN,
		playerTwoHandicap: NaN
	};
</script>

<!-- <h2>Who's Playin?</h2>-->

<p class="mx-10">Cue Count - Crafty Calculations for Cool Cueists</p>
<PlayerFieldSet
	name="player-one"
	bind:playerName={playerFormData.playerOneName}
	bind:playerHandicap={playerFormData.playerOneHandicap}
/>
<PlayerFieldSet
	name="player-two"
	bind:playerName={playerFormData.playerTwoName}
	bind:playerHandicap={playerFormData.playerTwoHandicap}
/>
