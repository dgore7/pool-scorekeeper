<script lang="ts">
	import type { EightBallGame } from '$lib/eight-ball';
	import type { NineBallGame } from '$lib';
	import type { StraightPoolGame } from '$lib/straight-pool';

	export let game: NineBallGame | EightBallGame | StraightPoolGame;
</script>

<div aria-live="polite" class="rounded-lg overflow-hidden">
	<div aria-label="scoreboard">
		<slot />
	</div>
	<div class="flex justify-between py-1 px-4 items-baseline">
		<span aria-label="turns" class="text-xl">
			{game.currentPlayer.name}'s Turn
		</span>
		<span aria-label="innings">
			Innings: {game.currentRack.innings}
		</span>
	</div>
</div>
<hr />

<style>
	[aria-label='scoreboard'] {
		padding: 0 1rem 1rem 1rem;
		display: grid;
		grid-template-columns: repeat(2, 1fr);
	}
</style>
