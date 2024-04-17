<script lang="ts">
	import type { Player } from '$lib';

	export let totalInnings: number;
	export let rackInngings: number;
	export let rackNumber: number;
	export let currentPlayer: Player;
</script>


<div class="scoreboard-container">
  <div class="scoreboard">
    <slot />
  </div>
  <div class="additional-info">
    <div class="turn-container">
      {currentPlayer.name}'s Turn
    </div>
    <div class="innings-container">
      <span>
        Rack {rackNumber} Innings: {rackInngings}
      </span>
      <span>
        Match Inngings: {totalInnings}
      </span>
    </div>
  </div>
</div>

<style>
  .scoreboard-container {
    margin: 2em auto;
  }

	.scoreboard {
		padding: 1em;
		border: 5px solid white;
		display: grid;
		grid-template-columns: 1fr 1fr;
		max-width: 700px;
    margin: auto;
	}

	.additional-info {
		border-right: 5px solid white;
		border-bottom: 5px solid white;
		border-left: 5px solid white;
		max-width: 400px;
		margin: 0 auto;
		padding: 0.25em 1em;
		display: flex;
    flex-direction: column;
	}

	.turn-container {
		margin: auto;
    font-size: 20px;
	}

  .innings-container {
    display: flex;
    justify-content: space-between;
  }
</style>
