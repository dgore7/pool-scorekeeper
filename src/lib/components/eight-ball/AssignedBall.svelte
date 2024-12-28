<script lang="ts">
	import type { Game, Player } from '$lib/types';
	import Ball from '../Ball.svelte';

	export let game: Game;
	export let team: string | null;
</script>

<div class="absolute scale-105 -right-6 -top-2">
	{#each game.currentRack.gameBalls as ball, i}
		{#if (team === 'stripes' && game.currentPlayer.color === ball.color && i > 8) || (team !== 'stripes' && game.currentPlayer.color === ball.color && i < 8)}
			<Ball {ball} />
		{/if}
	{/each}
</div>
