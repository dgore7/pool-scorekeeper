<script lang="ts">
	import HamburgerIcon from './icons/HamburgerIcon.svelte';
	import CloseIcon from './icons/CloseIcon.svelte';

	import SaveIcon from './icons/SaveIcon.svelte';
	import ScoreSheetIcon from './icons/ScoreSheetIcon.svelte';
	import EndGameIcon from './icons/EndGameIcon.svelte';
	import SettingsIcon from './icons/SettingsIcon.svelte';

	import { fade } from 'svelte/transition';
	import statefulFade from '$lib/stateful-fade';

	const { state, fadeTo, fadeOut } = statefulFade('close');

	import type { ComponentType } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	type OptionTitle = 'Score Sheet' | 'Save Game' | 'Settings' | 'End Game';
	type Option = { title: OptionTitle; icon: ComponentType; onClick?: () => void };

	const hamburgerOptions: Option[] = [
		{ title: 'Score Sheet', icon: ScoreSheetIcon },
		{ title: 'Save Game', icon: SaveIcon },
		{ title: 'Settings', icon: SettingsIcon },
		{
			title: 'End Game',
			icon: EndGameIcon,
			onClick() {
				$page.data.game.set(null);
				goto('/setup');
				fadeTo('close');
			}
		}
	];

	function handleHamburger() {
		fadeTo('open');
	}

	function handleClose() {
		fadeTo('close');
	}

	function handleOptionClick(title: OptionTitle) {
		console.log(title);
		fadeTo('close');
	}
</script>

{#if $state === 'open'}
	<button
		on:click={handleClose}
		in:fade={{ duration: 150 }}
		out:fade={{ duration: 150 }}
		on:outroend={fadeOut}
		aria-label="Close"
	>
		<CloseIcon class="fill-white" />
	</button>
{:else if $state === 'close'}
	<button
		on:click={handleHamburger}
		in:fade={{ duration: 150 }}
		out:fade={{ duration: 150 }}
		on:outroend={fadeOut}
		aria-label="Hamburger menu"
	>
		<HamburgerIcon />
	</button>
{/if}

{#if $state === 'open'}
	<div
		class="rounded absolute top-16 right-5 text-2xl bg-white overflow-hidden"
		transition:fade={{ duration: 300 }}
	>
		{#each hamburgerOptions as option, i}
			<button
				class="flex w-full gap-2 py-2 px-6 bg-white text-black hover:bg-slate-300"
				style:border-bottom={i < hamburgerOptions.length - 1 ? '1px solid black' : ''}
				on:click={() => option.onClick?.() ?? handleOptionClick(option.title)}
			>
				<svelte:component this={option.icon} />
				{option.title}
			</button>
		{/each}
	</div>
{/if}
