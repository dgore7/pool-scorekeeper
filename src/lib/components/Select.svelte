<script lang="ts">
	import type { BallColorSpec } from '$lib/common/ball';
	import type { GameType, RuleType, APAHandicaps } from '$lib/types';
	import DownCaret from './icons/DownCaret.svelte';

	export let selectedItem: GameType | RuleType | APAHandicaps | BallColorSpec;
	export let options;
	export let label;
	export let name;

	let isFocus = false;

	function handleFocus() {
		isFocus = true;
	}

	function handleBlur() {
		isFocus = false;
	}
</script>

<label class="relative flex">
	<div
		class="text-[#DADADA] absolute transition-transform top-1 left-4 text-xs {selectedItem
			? 'top-1'
			: isFocus
				? 'top-1'
				: 'translate-x-6 translate-y-3 scale-[1.75]'}"
	>
		{label}
	</div>
	<div class="absolute top-3 right-4 pointer-events-none">
		<slot>
			<DownCaret />
		</slot>
	</div>
	<select
		bind:value={selectedItem}
		{name}
		on:focus={handleFocus}
		on:blur={handleBlur}
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
