<script lang="ts">
	import PlayerForm from '$lib/components/PlayerForm.svelte';
	import { goto } from '$app/navigation';
	import { NineBallGame, Player } from '$lib';
	import { RuleForm, type PlayerFormData } from '$lib/components';
	import WarningIcon from '$lib/components/WarningIcon.svelte';
	import { startCase } from 'lodash';

	export let data;
	let { game, toast, toastTime } = data;

	let step = 0;

	let selectedGame: string;
	let selectedRules: string;

	let playerFormData: PlayerFormData;

	function handlePrev() {
		step--;
	}
	function handleNext() {
		step++;
	}

	function deriveMissingFields(formData: PlayerFormData) {
		return Object.entries(formData)
			.map(([name, value]) => (!value ? startCase(name) : ''))
			.filter((name) => name.length);
	}

	function hasMissingData(formData: PlayerFormData) {
		return Object.entries(formData).some(([_, value]) => !value);
	}

	function deriveErrorList(messages: string[]) {
		return messages.map((message) => `<li class="ml-4">${message}</li>`).join(' ');
	}

	function handleGameStart() {
		const isInvalid = hasMissingData(playerFormData);
		const messages = deriveMissingFields(playerFormData);
		const errorList = deriveErrorList(messages);

		if (isInvalid) {
			$toastTime = 5000;
			$toast = {
				message: `Missing required player information: <ul class="list-disc">${errorList}</ul>`,
				icon: WarningIcon,
				class: 'bg-gray-200'
			};
		} else {
			$game = new NineBallGame(
				new Player(playerFormData.playerOneName, playerFormData.playerOneHandicap, 'bg-[red]'),
				new Player(playerFormData.playerTwoName, playerFormData.playerTwoHandicap, 'bg-[blue]')
			);
		}

		goto('/');
	}
</script>

<div class="flex flex-col gap-4 max-w-full">
	{#if step === 0}
		<RuleForm bind:selectedGame bind:selectedRules />
	{:else}
		<PlayerForm bind:playerFormData />
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
