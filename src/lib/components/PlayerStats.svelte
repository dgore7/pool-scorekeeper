<script lang="ts">
	import type { Player, NineBallGame, EightBallGame } from '$lib';
	import type { Player as EightBallPlayer } from '$lib/index/player';

	export let player: Player | EightBallPlayer;
	export let game: NineBallGame | EightBallGame;
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
		font-size: 2rem;
	}

	.player-info {
		display: flex;
		gap: 1em;
	}
</style>
