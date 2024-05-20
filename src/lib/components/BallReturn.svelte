<script lang="ts">
	import Ball from './Ball.svelte';
	export let madeBalls: any[];
</script>

<div
	aria-label="ball return container"
	class="rounded-lg bg-slate-400 h-10 w-[22.5rem] flex m-auto border-4 border-slate-700 box-content"
>
	{#if madeBalls.length}
		{#each madeBalls as ball}
			<Ball {ball} size="small" />
		{/each}
	{/if}
</div>
