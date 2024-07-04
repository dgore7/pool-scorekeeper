<script lang="ts">
	import type { GameType } from '$lib/types';
	import Well from './Well.svelte';
	import startcase from 'lodash.startcase';

	import { cva } from 'class-variance-authority';

	const colorDisplay = cva(['border-solid', 'border-white', 'border-2', 'rounded']);

	export let name: 'player-one' | 'player-two';
	export let playerName: string | null;
	export let playerHandicap: number | null = 0;
	export let opponentColor;
	export let selectedColor: string;

	export let selectedGame: GameType;

	let NineBallHandicaps = [1, 2, 3, 4, 5, 6, 7, 8, 9];
	let EightBallHandicaps = [2, 3, 4, 5, 6, 7];
	let handicaps = selectedGame === '9ball' ? NineBallHandicaps : EightBallHandicaps;
	
	type ColorOption = {
		label: string;
		value: string;
	};

	let colors: ColorOption[] = [
		{ label: 'yellow', value: 'bg-yellow-ball' },
		{ label: 'blue', value: 'bg-blue-ball' },
		{ label: 'red', value: 'bg-red-ball' },
		{ label: 'purple', value: 'bg-purple-ball' },
		{ label: 'orange', value: 'bg-orange-ball' },
		{ label: 'green', value: 'bg-green-ball' },
		{ label: 'maroon', value: 'bg-maroon-ball' }
	];
	let availableColors: ColorOption[] = [];

	$: if (opponentColor) {
		availableColors = colors.filter((color) => color.value !== opponentColor);
	}
</script>

<Well>
	<fieldset class="flex flex-col gap-4" {name}>
		<legend class="mb-1.5">
			{startcase(name)}
			{#if name === 'player-one'}
				(Won Lag)
			{/if}
		</legend>
		<input
			type="text"
			name="name"
			aria-label="name"
			class="bg-black h-10 py-2 px-3 rounded"
			placeholder="Name"
			bind:value={playerName}
		/>
		<select
			name="handicap"
			aria-label="handicap"
			class="bg-black h-10 py-2 px-3 rounded text-white invalid:text-[#9ca3af]"
			bind:value={playerHandicap}
		>
			<option disabled selected value={0}>Handicap</option>
			{#each handicaps as handicap}
				<option value={handicap}>{handicap}</option>
			{/each}
		</select>

		<div class="grid grid-cols-2 gap-4">
			<select
				class="bg-black h-10 py-2 px-3 rounded invalid:text-[#9ca3af] capitalize"
				bind:value={selectedColor}
			>
				{#each availableColors as color}
					<option value={color.value}>{color.label}</option>
				{/each}
			</select>
			<div
				class={colorDisplay({
					class: selectedColor
				})}
			></div>
		</div>
	</fieldset>
</Well>

<style>
	select {
		-moz-appearance: none; /* Firefox */
		-webkit-appearance: none; /* Safari and Chrome */
		appearance: none;
	}
</style>
