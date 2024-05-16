<script lang="ts">
	import Rules from '$lib/components/RuleForm.svelte';
	import Players from '$lib/components/PlayerForm.svelte';
	import logo from '$lib/assets/brand.svg';
	import { goto, onNavigate } from '$app/navigation';
	import { NineBallGame, Player } from '$lib';
	import Toast from '$lib/components/Toast.svelte';
	import WarningIcon from '$lib/components/icons/WarningIcon.svelte';

	export let data;
	let { game } = data;

	let isRedirect = false;
	let redirectInt: NodeJS.Timeout;

	onNavigate((nav) => {
		if (nav.from?.route.id === nav.to?.route.id) {
			isRedirect = true;

			redirectInt = setTimeout(() => {
				isRedirect = false;
			}, 5000);
		}
	});

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
		$game = new NineBallGame(
			new Player(playerOneName, playerOneHandicap),
			new Player(playerTwoName, playerTwoHandicap)
		);

		goto('/');
	}

	function handleToastClose() {
		isRedirect = false;
		clearTimeout(redirectInt);
	}
</script>

{#if isRedirect}
	<Toast
		on:close={handleToastClose}
		message={'Missing required player info.'}
		icon={WarningIcon}
	/>
{/if}

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
