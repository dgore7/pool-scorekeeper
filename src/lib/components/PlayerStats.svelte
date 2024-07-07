<script lang="ts">
	import type { NineBallPlayer, NineBallGame } from '$lib';
	import type { EightBallGame, EightBallPlayer } from '$lib/eight-ball';

	export let player: NineBallPlayer | EightBallPlayer;
	export let game: NineBallGame | EightBallGame;
	export let playerNumber: number;
</script>

<div class="player-score border-2 m-1 px-2 border-solid rounded-xl">
	<div class="flex w-full justify-between">
		<div>{player.name}</div>
		<div>{player.handicap}</div>
	</div>
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
		<div>
			<span>goal</span>
			<span>{player.scoreRequired}</span>
		</div>
	</div>
</div>

<style>
	.player-score {
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
