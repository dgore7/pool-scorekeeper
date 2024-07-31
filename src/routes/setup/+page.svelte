<script lang="ts">
	import PlayerForm from '$lib/components/PlayerForm.svelte';
	import { goto } from '$app/navigation';
	import { NineBallGame, NineBallPlayer } from '$lib';
	import { EightBallGame, EightBallPlayer } from '$lib/eight-ball';
	import { RuleForm, type PlayerFormData } from '$lib/components';
	import WarningIcon from '$lib/components/icons/WarningIcon.svelte';
	import { startCase } from 'lodash';
	import type { GameType, RuleType } from '$lib/types.js';

	import { cva } from 'class-variance-authority';

	const buttonClass = cva([
		'flex',
		'justify-center',
		'items-center',
		'h-[3.75rem]',
		'rounded',
		'bg-gradient-to-b',
		'from-[#018FE0]',
		'to-[#011A29]',
		'text-white',
		'mx-auto',
		'px-10',
		'w-full'
	]);

	export let data;
	let { game, toast, toastTime } = data;

	let step = 0;

	let selectedGame: GameType;
	let selectedRules: RuleType;

	let playerFormData: PlayerFormData;

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
				message: `Missing required player information: <ul class="list-disc text-[#AFAFAA]">${errorList}</ul>`,
				icon: WarningIcon,
				class: 'scale-150'
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

<form class="flex flex-col gap-4 max-w-full flex-grow my-4" on:submit={handleGameStart}>
	{#if step === 0}
		<RuleForm bind:selectedGame bind:selectedRules />
	{:else}
		<PlayerForm bind:playerFormData bind:step {selectedGame} />
	{/if}

	<div class="flex">
		{#if step < 1}
			<button type="button" class={buttonClass()} on:click={handleNext}>Next</button>
		{:else}
			<button class={buttonClass()} type="submit">Let's Rack 'em Up</button>
		{/if}
	</div>
</form>
