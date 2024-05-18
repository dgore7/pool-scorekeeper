<script lang="ts">
	import type { Player, NineBallGame } from '$lib';

	export let player: Player;
	export let game: NineBallGame;
	export let playerNumber: number;
</script>

<div class="player-score">
	<div class="score">
		{player.score}
	</div>
	<div class="player-info">
		<div>
			S: {player.safeties}
		</div>
		<div>
			T: {game.currentRack.timeouts[playerNumber]}
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
