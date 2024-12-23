<script lang="ts">
	import { slide } from 'svelte/transition';
	import RightArrow from '../icons/RightArrow.svelte';
	let isOpen = false;
	function toggle() {
		isOpen = !isOpen;
	}
</script>

<div class="py-2 accordion">
	<div class="flex justify-between">
		<slot name="header" />
		<div class="transition-opacity {isOpen ? 'opacity-0' : 'opacity-100'}">
			<slot name="points" />
		</div>
		<button on:click={toggle} class="transition scale-50" class:rotate={isOpen}>
			<RightArrow />
		</button>
	</div>
	{#if isOpen}
		<div transition:slide>
			<slot name="info" />
		</div>
	{/if}
</div>

<style>
	.accordion {
		border-bottom: 1px solid grey;
	}
	.rotate {
		transform: rotate(90deg) scale(0.5);
	}
</style>
