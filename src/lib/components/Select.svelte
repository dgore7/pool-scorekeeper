<script lang="ts">
	import type { BallColorSpec } from '$lib/common/ball';
	import type { GameType, RuleType, APAHandicaps } from '$lib/types';
	import DownCaret from './icons/DownCaret.svelte';
	import ColorBox from './ColorBox.svelte';

	export let selectedItem: GameType | RuleType | APAHandicaps | BallColorSpec;
	export let options;
	export let label;
	export let name;
	export let isColorSelect = false;
</script>

<label class="relative flex">
	<div class="text-[#DADADA] absolute top-1 left-4 text-xs">{label}</div>
	<div class="absolute top-3 right-10 pointer-events-none">
		{#if isColorSelect && typeof selectedItem === 'object'}
			<ColorBox color={selectedItem} />
		{:else}
			<DownCaret />
		{/if}
	</div>
	<select
		bind:value={selectedItem}
		{name}
		class="flex items-end bg-[#686870] bg-opacity-50 h-12 py-2 px-3 rounded-xl flex-grow capitalize invalid:text-[#9ca3af]"
		required
	>
		{#each options as option}
			<option value={option.value}>{option.label}</option>
		{/each}
	</select>
</label>

<style>
	select {
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;
	}
</style>
