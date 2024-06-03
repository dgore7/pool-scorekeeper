<script lang="ts">
	import HamburgerIcon from './icons/HamburgerIcon.svelte';
	import CloseIcon from './icons/CloseIcon.svelte';

	import SaveIcon from './icons/SaveIcon.svelte';
	import ScoreSheetIcon from './icons/ScoreSheetIcon.svelte';
	import EndGameIcon from './icons/EndGameIcon.svelte';
	import SettingsIcon from './icons/SettingsIcon.svelte';

	import { fade } from 'svelte/transition';

	import type { ComponentType } from 'svelte';

	type OptionTitle = 'Score Sheet' | 'Save Game' | 'Settings' | 'End Game';
	type Option = { title: OptionTitle; icon: ComponentType };

	let isHamburger = false;
	let hamburgerOptions: Option[] = [
		{ title: 'Score Sheet', icon: ScoreSheetIcon },
		{ title: 'Save Game', icon: SaveIcon },
		{ title: 'Settings', icon: SettingsIcon },
		{ title: 'End Game', icon: EndGameIcon }
	];

	function handleHamburger() {
		isHamburger = !isHamburger;
	}

	function handleOptionClick(title: OptionTitle) {
		console.log(title);
		isHamburger = false;
	}
</script>

<button on:click={handleHamburger}>
	{#if isHamburger}
		<CloseIcon color="#FFF" />
	{:else}
		<HamburgerIcon />
	{/if}
</button>

{#if isHamburger}
	<div
		class="rounded absolute top-16 right-5 text-2xl bg-white overflow-hidden"
		transition:fade={{ duration: 300 }}
	>
		{#each hamburgerOptions as option, i}
			<button
				class="flex w-full gap-2 py-2 px-6 bg-white text-black hover:bg-slate-300"
				style:border-bottom={i < hamburgerOptions.length - 1 ? '1px solid black' : ''}
				on:click={() => handleOptionClick(option.title)}
			>
				<svelte:component this={option.icon} />
				{option.title}
			</button>
		{/each}
	</div>
{/if}
