<script lang="ts">
	import Rules from '$lib/components/Rules.svelte';
	import Players from '$lib/components/Players.svelte';
	import logo from '$lib/assets/brand.svg';
	import { goto } from '$app/navigation';

	let gameInfo = {
		gameType: '',
		ruleSet: '',
		playerOne: '',
		playerTwo: '',
		playerOneHandicap: 9,
		playerTwoHandicap: 9
	};

	let step = 0;

	let selectedGame: string;
	let selectedRules: string;

	let playerOneName: string;
	let playerTwoName: string;

	let playerOneHandicap: number;
	let playerTwoHandicap: number;

	function handlePrev() {
		step--;
	}
	function handleNext() {
		step++;
	}

	function handleGameStart() {
		gameInfo.gameType = selectedGame;
		gameInfo.ruleSet = selectedRules;
		gameInfo.playerOne = playerOneName;
		gameInfo.playerTwo = playerTwoName;
		gameInfo.playerOneHandicap = playerOneHandicap;
		gameInfo.playerTwoHandicap = playerTwoHandicap;

		goto('/');
	}
</script>

<div class="flex flex-col gap-4 min-h-screen max-w-full">
	<div class="mx-auto"><img src={logo} alt="rack em up" class="my-1" /></div>

	{#if step === 0}
		<Rules bind:selectedGame bind:selectedRules />
	{:else}
		<Players bind:playerOneName bind:playerOneHandicap bind:playerTwoName bind:playerTwoHandicap />
	{/if}

	<div class="flex">
		{#if step < 1}
			<button
				class="flex justify-center items-center h-[3.75rem] rounded-[60px] bg-white text-black mx-auto px-10"
				on:click={handleNext}>Next</button
			>
		{:else}
			<button
				class="flex justify-center items-center h-[3.75rem] rounded-[60px] bg-white text-black mx-auto px-10"
				disabled={!step}
				on:click={handlePrev}>Back</button
			>
			<button
				class="flex justify-center items-center h-[3.75rem] rounded-[60px] bg-white text-black mx-auto px-10"
				on:click={handleGameStart}>Let's Rack 'em Up</button
			>
		{/if}
	</div>
</div>

<style>
</style>
