<script lang="ts">
	import Ball from './Ball.svelte';

	export let game;
</script>

<div class="flex justify-between">
	{#each game.currentRack.assignmentBalls as ball}
		<Ball {ball} size={'small'} />
	{/each}
</div>
