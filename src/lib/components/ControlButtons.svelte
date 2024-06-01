<script lang="ts">
	import ShieldIcon from './icons/ShieldIcon.svelte';
	import UndoIcon from './icons/UndoIcon.svelte';
	import PauseIcon from './icons/PauseIcon.svelte';
	import GraveIcon from './icons/GraveIcon.svelte';
	import { createEventDispatcher } from 'svelte';
	import type { ComponentType } from 'svelte';

	export let isGameOver: boolean;
	export let isNineBall: boolean = true;

	let dispatch = createEventDispatcher();

	type ComponentEvent = {
		icon: ComponentType;
		event: string;
		label: string;
	};

	let components: ComponentEvent[] = [
		{ icon: UndoIcon, event: 'undo', label: 'undo' },
		{ icon: ShieldIcon, event: 'safety', label: 'safety' },
		{ icon: PauseIcon, event: 'timeout', label: 'timeout' },
		{ icon: GraveIcon, event: 'deadBallMode', label: 'dead ball mode' }
	].filter((component) => isNineBall || component.event !== 'deadBallMode');

	function handleClick(eventType: string) {
		dispatch(eventType);
	}
</script>

{#each components as component}
	<button
		class="py-4"
		on:click={() => handleClick(component.event)}
		disabled={(component.event === 'safety' || component.event === 'timeout') && isGameOver}
		aria-label={component.label}
	>
		<svelte:component this={component.icon} />
	</button>
{/each}
