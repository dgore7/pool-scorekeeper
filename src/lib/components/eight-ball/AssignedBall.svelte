<script lang="ts">
	import type { Game, Player } from '$lib/types';
	import Ball from '../Ball.svelte';

	export let game: Game;
</script>

<div class="absolute scale-[2] right-0 top-6">
  {#each game.currentRack.assignmentBalls as ball, i}
    {#if game.players[i].name === game.currentPlayer.name}
      <Ball {ball} />
    {/if}
  {/each}
</div>
