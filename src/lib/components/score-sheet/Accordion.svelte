<script lang="ts">
	import InfoBox from './InfoBox.svelte';
	import { slide } from 'svelte/transition';
	import RightArrow from '../icons/RightArrow.svelte';
	let isOpen = false;
	function toggle() {
		isOpen = !isOpen;
	}
</script>

<InfoBox transparency={70}>
	<div class="flex justify-between items-center">
		<slot name="header" />
		<div class="transition-opacity duration-300 {isOpen ? 'opacity-0' : 'opacity-100'}">
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
</InfoBox>

<style>
	.rotate {
		transform: rotate(90deg) scale(0.5);
	}
</style>
