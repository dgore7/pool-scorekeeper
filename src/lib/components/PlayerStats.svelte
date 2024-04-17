<script lang="ts">
	export let score: number;
	export let safeties: number;
	export let timeouts: number;
</script>

<div class="player-score" aria-label="score-player-one">
	<div class="score">
		{score}
	</div>
	<div class="player-info">
		<div>
			S: {safeties}
		</div>
		<div>
			T: {timeouts}
		</div>
	</div>
</div>

<style>
	.player-score {
		border: none;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}

	.score {
		font-size: 4rem;
	}

  .player-info {
    display: flex;
    gap: 1em;
  }
</style>
