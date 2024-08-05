<script lang="ts">
	import type { ComponentType } from 'svelte';
	import { fade } from 'svelte/transition';
	import CloseIcon from './icons/CloseIcon.svelte';
	import { createEventDispatcher } from 'svelte';

	export let message: string;
	export let icon: ComponentType;
	let className = '';
	export { className as class };

	const dispatch = createEventDispatcher();
</script>

<div
	class="toast-dialog fixed left-5 right-5 z-10 top-10 max-w-xl rounded-lg {className}"
	role="alert"
	transition:fade
>
	<svelte:component this={icon} />
	<div class="text">{@html message}</div>
	<button aria-label="Close" class="close shrink" on:click={() => dispatch('close')}>
		<CloseIcon width="0.8em" class={'fill-black'} />
	</button>
</div>

<style>
	.toast-dialog {
		color: black;
		padding: 0.75rem 1.5rem;
		display: flex;
		align-items: center;
		margin: 0 auto;
	}

	.text {
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
