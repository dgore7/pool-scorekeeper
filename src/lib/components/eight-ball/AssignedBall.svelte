<script lang="ts">
	import type { Game, Player } from '$lib/types';
	import Ball from '../Ball.svelte';

	export let game: Game;
	export let team: string | null;
</script>

<div class="absolute scale-[2] right-0 top-6">
	{#each game.currentRack.gameBalls as ball, i}
		{#if team === 'stripes'}
			{#if game.currentPlayer.color === ball.color && i > 8}
				<Ball {ball} />
			{/if}
		{:else if game.currentPlayer.color === ball.color && i < 8}
			<Ball {ball} />
		{/if}
	{/each}
</div>
