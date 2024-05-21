<script lang="ts">
	import type { NineBallGame } from '$lib';
	import Ball from './Ball.svelte';
	export let game: NineBallGame;
</script>

<div
	aria-label="ball return container"
	class="rounded-lg bg-slate-400 h-10 w-[22.5rem] flex m-auto border-4 border-slate-700 box-content"
>
	{#if game.currentRack.pocketedBalls.length}
		{#each game.currentRack.pocketedBalls as ball}
			<Ball {ball} size="small" />
		{/each}
	{/if}
</div>
