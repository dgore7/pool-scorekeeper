<script lang="ts">
	import ShieldIcon from './icons/ShieldIcon.svelte';
	import UndoIcon from './icons/UndoIcon.svelte';
	import PauseIcon from './icons/PauseIcon.svelte';
	import GraveIcon from './icons/GraveIcon.svelte';
	import { createEventDispatcher } from 'svelte';
	import type { ComponentType } from 'svelte';

	let dispatch = createEventDispatcher();

	type ComponentEvent = {
		icon: ComponentType;
		event: string;
	};

	let components: ComponentEvent[] = [
		{ icon: UndoIcon, event: 'undo' },
		{ icon: ShieldIcon, event: 'safety' },
		{ icon: PauseIcon, event: 'timeout' },
		{ icon: GraveIcon, event: 'deadBallMode' }
	];

	function handleClick(eventType: string) {
		dispatch(eventType);
	}
</script>

{#each components as component}
	<button class="py-4" on:click={() => handleClick(component.event)}
		><svelte:component this={component.icon} /></button
	>
{/each}
