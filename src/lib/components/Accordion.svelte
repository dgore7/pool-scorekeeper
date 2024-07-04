<script lang="ts">
	import { slide } from 'svelte/transition';
	import RightArrow from './icons/RightArrow.svelte';
	import EditIcon from './icons/EditIcon.svelte';

	let isOpen = false;

	function toggle() {
		isOpen = !isOpen;
	}

	function handleEdit() {
		console.log('edit');
	}
</script>

<div class="py-2 accordion">
	<div class="flex justify-between">
		<slot name="header" />
		<button on:click={toggle} class="transition" class:rotate={isOpen} transition:slide>
			<RightArrow />
		</button>
	</div>
	{#if isOpen}
		<div class="grid grid-cols-5" transition:slide>
			<div class="col-span-4">
				<slot name="info" />
			</div>
			<button class="self-start justify-self-end" on:click={handleEdit}><EditIcon /></button>
		</div>
	{/if}
</div>

<style>
	.accordion {
		border-bottom: 1px solid grey;
	}

	.rotate {
		transform: rotate(90deg);
	}
</style>
