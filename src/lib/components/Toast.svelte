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
	class="flex shadow-sm justify-between gap-6 fixed left-5 right-5 top-10 py-4 px-6 max-w-xl rounded-lg bg-black text-white border-2 border-[#323233] border-solid z-10"
	style="box-shadow: 0 .5em 1em black"
	role="alert"
	transition:fade
>
	<svelte:component this={icon} />
	<div class="">{@html message}</div>
	<button
		aria-label="Close"
		class="flex shrink border-none bg-transparent p-0 self-start"
		on:click={() => dispatch('close')}
	>
		<CloseIcon width="0.8em" class={'fill-white'} />
	</button>
</div>
