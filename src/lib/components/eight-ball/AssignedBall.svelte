<script lang="ts">
	import type { Game, Player } from '$lib/types';
	import Ball from '../Ball.svelte';

	export let game: Game;
</script>

<div class="w-16 h-16 place-self-center">
  {#each game.currentRack.assignmentBalls as ball, i}
    {#if game.players[i].name === game.currentPlayer.name}
      <Ball {ball} />
    {/if}
  {/each}
</div>
