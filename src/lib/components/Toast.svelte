<script lang="ts">
	import type { ComponentType } from 'svelte';
	import { fade } from 'svelte/transition';
	import CloseToastIcon from './icons/CloseToastIcon.svelte';
	import { createEventDispatcher } from 'svelte';

	export let message: string;
	export let icon: ComponentType;
	let className = '';
	export { className as class };

	const dispatch = createEventDispatcher();
</script>

<div
	class="toast-dialog fixed left-5 right-5 top-10 max-w-xl {className}"
	role="alert"
	transition:fade
>
	<svelte:component this={icon} />
	<div class="text">{message}</div>
	<button class="close" on:click={() => dispatch('close')}>
		<CloseToastIcon width="0.8em" />
	</button>
</div>

<style>
	.toast-dialog {
		color: black;
		padding: 0.75rem 1.5rem;
		border-radius: 0.2rem;
		display: flex;
		align-items: center;
		margin: 0 auto;
		background-color: white;
	}

	.text {
		max-width: 15rem;
		margin: 1rem;
	}

	button {
		color: white;
		background: transparent;
		border: 0 none;
		padding: 0;
		margin: 0 0 0 auto;
		line-height: 1;
		font-size: 1rem;
	}
</style>
