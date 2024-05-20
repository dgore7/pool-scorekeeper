<script lang="ts">
	import ShieldIcon from './icons/ShieldIcon.svelte';
	import UndoIcon from './icons/UndoIcon.svelte';
	import PauseIcon from './icons/PauseIcon.svelte';
	import GraveIcon from './icons/GraveIcon.svelte';

	let icons: any[] = [UndoIcon, ShieldIcon, PauseIcon, GraveIcon];
</script>

{#each icons as icon}
	<button class="py-4"><svelte:component this={icon} /></button>
{/each}
