<script lang="ts">
	import ShieldIcon from './icons/ShieldIcon.svelte';
	import UndoIcon from './icons/UndoIcon.svelte';
	import TimeoutIcon from './icons/TimeoutIcon.svelte';
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
		displayName?: string;
	};

	let components: ComponentEvent[] = [
		{ icon: UndoIcon, event: 'undo', label: 'undo' },
		{ icon: ShieldIcon, event: 'safety', label: 'safety' },
		{ icon: TimeoutIcon, event: 'timeout', label: 'timeout' },
		{ icon: GraveIcon, event: 'deadBallMode', label: 'dead ball mode', displayName: 'Dead' }
	].filter((component) => isNineBall || component.event !== 'deadBallMode');

	function handleClick(eventType: string) {
		dispatch(eventType);
	}
</script>

{#each components as { icon, event, label, displayName }}
	<button
		class="my-1 grow active:bg-slate-700 rounded flex flex-col justify-center items-center transition-colors text-secondary text-[.625rem] capitalize"
		on:click={() => handleClick(event)}
		disabled={(event === 'safety' || event === 'timeout') && isGameOver}
	>
		<svelte:component this={icon} />
		<span>{displayName ?? label}</span>
	</button>
{/each}
