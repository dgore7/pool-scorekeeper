<script lang="ts">
	import type { EightBallGame } from '$lib/eight-ball';
	import type { NineBallGame } from '$lib';

	export let game: NineBallGame | EightBallGame;
</script>

<div aria-live="polite" class="rounded-lg overflow-hidden flex-[1_0_auto]">
	<div aria-label="scoreboard">
		<slot />
	</div>
	<div class="flex justify-between py-1 items-baseline">
		<span aria-label="turns" class="text-xl">
			{game.currentPlayer.name}'s Turn
		</span>
		<span aria-label="innings">
			Innings: {game.currentRack.innings}
		</span>
	</div>
</div>

<style>
	[aria-label='scoreboard'] {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
	}
</style>
