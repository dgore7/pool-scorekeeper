<script lang="ts">
	import Ball from './Ball.svelte';
	import EightBallIcon from './icons/EightBallIcon.svelte';
	import SkullIcon from './icons/SkullIcon.svelte';
	import { slide } from 'svelte/transition';

	export let rack;

	let isOpen = false;

	function toggle() {
		isOpen = !isOpen;
	}
</script>

<div>Innings: {rack.innings}</div>
<div>Timeouts used:</div>
<div class="flex items-center gap-4">
	Dead Balls: {rack.deadBalls.length}
	<button on:click={toggle}>
		{#if isOpen}
			<SkullIcon />
		{:else}
			<EightBallIcon />
		{/if}
	</button>
</div>

<div>
	{#if isOpen}
		<div class="grid grid-cols-9 h-8" transition:slide>
			{#each rack.deadBalls as ball}
				<Ball size={'small'} {ball} />
			{/each}
		</div>
	{/if}
</div>
