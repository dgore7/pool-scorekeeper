<script lang="ts">
	import type { Game } from "$lib/types";
  import Ball from "../Ball.svelte";

  export let game: Game
</script>

<!-- using index 0 as placeholder for now -->

<div class="w-16 h-16 place-self-center">
  <Ball ball={game.currentRack.assignmentBalls[0]}/>
</div>
