<script lang="ts">
	import PlayerForm from '$lib/components/PlayerForm.svelte';
	import { goto, invalidateAll } from '$app/navigation';
	import { NineBallGame, NineBallPlayer } from '$lib';
	import { EightBallGame, EightBallPlayer } from '$lib/eight-ball';
	import { RuleForm, type PlayerFormData } from '$lib/components';
	import WarningIcon from '$lib/components/WarningIcon.svelte';
	import { startCase } from 'lodash';
	import type { GameType, RuleType } from '$lib/types.js';

	export let data;
	let { game, toast, toastTime } = data;

	let step = 0;

	let selectedGame: GameType;
	let selectedRules: RuleType;

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

	async function handleGameStart(event: SubmitEvent) {
		event.preventDefault();
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
			if (selectedGame === '9ball') {
				$game = new NineBallGame(
					new NineBallPlayer(
						playerFormData.playerOneName,
						playerFormData.playerOneHandicap,
						playerFormData.playerOneColor
					),
					new NineBallPlayer(
						playerFormData.playerTwoName,
						playerFormData.playerTwoHandicap,
						playerFormData.playerTwoColor
					)
				);
				goto('/nine-ball');
			} else if (selectedGame === '8ball') {
				$game = new EightBallGame(
					new EightBallPlayer(
						playerFormData.playerOneName,
						playerFormData.playerOneHandicap,
						playerFormData.playerOneColor
					),
					new EightBallPlayer(
						playerFormData.playerTwoName,
						playerFormData.playerTwoHandicap,
						playerFormData.playerTwoColor
					)
				);
				goto('/eight-ball');
			}
		}
	}
</script>

<form class="flex flex-col gap-4 max-w-full" on:submit={handleGameStart}>
	{#if step === 0}
		<RuleForm bind:selectedGame bind:selectedRules />
	{:else}
		<PlayerForm bind:playerFormData {selectedGame} />
	{/if}

	<div class="flex">
		{#if step < 1}
			<button
				type="button"
				class="flex justify-center items-center h-[3.75rem] rounded-[60px] bg-white text-black mx-auto px-10"
				on:click={handleNext}>Next</button
			>
		{:else}
			<button
				class="flex justify-center items-center h-[3.75rem] rounded-[60px] bg-white text-black mx-auto px-10"
				disabled={!step}
				type="button"
				on:click={handlePrev}>Back</button
			>
			<button
				class="flex justify-center items-center h-[3.75rem] rounded-[60px] bg-white text-black mx-auto px-10"
				>Let's Rack 'em Up</button
			>
		{/if}
	</div>
</form>
