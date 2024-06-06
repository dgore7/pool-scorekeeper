<script lang="ts">
	import type { GameType } from '$lib/types';
	import Well from './Well.svelte';
	import startcase from 'lodash.startcase';
	export let name: 'player-one' | 'player-two';
	export let playerName: string | null;
	export let playerHandicap: number | null;

	export let selectedGame: GameType;

	let NineBallHandicaps = [1, 2, 3, 4, 5, 6, 7, 8, 9];
	let EightBallHandicaps = [2, 3, 4, 5, 6, 7];
	let handicaps = selectedGame === '9ball' ? NineBallHandicaps : EightBallHandicaps;
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
			placeholder="name"
			bind:value={playerName}
		/>
		<select
			name="handicap"
			aria-label="handicap"
			class="bg-black h-10 py-2 px-3 rounded invalid:text-[#9ca3af]"
			bind:value={playerHandicap}
		>
			<option disabled selected value class="hidden">handicap</option>
			{#each handicaps as handicap}
				<option value={handicap}>{handicap}</option>
			{/each}
		</select>
	</fieldset>
</Well>

<style>
	select {
		-moz-appearance: none; /* Firefox */
		-webkit-appearance: none; /* Safari and Chrome */
		appearance: none;
	}
</style>
