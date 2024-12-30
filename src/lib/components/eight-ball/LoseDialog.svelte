<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import PlayerColorButton from '../PlayerColorButton.svelte';
	import InfoBox from '../score-sheet/InfoBox.svelte';
	import type { Condition, EndGameCase } from '$lib/eight-ball';
	import type { Game } from '$lib/types';
	import BallComponent from '../Ball.svelte';
	import { Ball } from '$lib/common/ball';

	const dispatch = createEventDispatcher<{
		submitDialog: EndGameCase;
		cancelDialog: undefined;
	}>();

	export let message: string;
	export let conditions: Condition[];
	export let game: Game;

	let selectedCondition: Condition | null = null;

	function handleSubmit() {
		dispatch('submitDialog', selectedCondition!.id);
	}

	function handleCancel() {
		dispatch('cancelDialog');
	}
</script>

<div class="fixed left-5 right-5 top-1/3 max-w-xl h-[50svh] rounded-lg z-10">
	<InfoBox>
		<h2 class="text-2xl">{message}</h2>
		<div class="w-3/4 m-auto">
			{#each conditions as condition}
				<div class=" p-2 has-[:checked]:bg-[#131318] flex gap-2 rounded">
					<div class="grid place-items-center">
						<input
							type="radio"
							class="appearance-none peer shrink-0 w-4 h-4 border-2 rounded-full bg-white col-start-1 row-start-1"
							id={condition.id}
							bind:group={selectedCondition}
							value={condition.id}
						/>
						<div class="col-start-1 row-start-1 w-3.5 h-3.5 hidden peer-checked:block">
							<BallComponent ball={Ball.fromNumber(8)} />
						</div>
					</div>
					<label for={condition.id} class="w-full border-b-2 border-solid border-b-white"
						>{condition.message}</label
					>
				</div>
			{/each}
		</div>

		<div>
			<PlayerColorButton
				player={game.currentPlayer}
				dispatchEvent="submit"
				on:submit={handleSubmit}
				disabled={selectedCondition === null}
			>
				Submit
			</PlayerColorButton>
			<PlayerColorButton
				player={game.previousPlayer}
				dispatchEvent="cancel"
				on:cancel={handleCancel}
				disabled={false}
			>
				Cancel
			</PlayerColorButton>
		</div>
	</InfoBox>
</div>
