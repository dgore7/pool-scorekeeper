<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import ControlButtons from './ControlButtons.svelte';
	import type { EightBallGame } from '$lib/eight-ball';

	export let isGameOver;
	export let game: EightBallGame;

	let dispatch = createEventDispatcher();

	function handleMiss() {
		dispatch('miss');
	}

	function handleWin() {
		if (!game.currentRack.innings && game.currentRack.playerToBreak === game.currentPlayer) {
			dispatch('winDialog');
		} else {
			dispatch('win', 'M8');
		}
	}

	function handleLose() {
		dispatch('lose');
	}

	function handleUndo() {
		dispatch('undo');
	}

	function handleSafety() {
		dispatch('safety');
	}

	function handleTimeout() {
		dispatch('timeout');
	}
</script>

<button
	class="flex justify-center rounded-xl py-4 text-2xl {game.currentPlayer.color}"
	on:click={handleMiss}>End {game.currentPlayer.name}'s Turn</button
>

<div class="flex justify-center gap-6">
	<button class="rounded-xl text-2xl text-black bg-green-400 w-full" on:click={handleWin}>
		{game.currentPlayer.name} Won!
	</button>
	<button class="rounded-xl py-4 text-2xl bg-rose-600 w-full" on:click={handleLose}>
		{game.currentPlayer.name} Lost...
	</button>
</div>

<div
	aria-label="control button container"
	class="rounded-xl bg-slate-600 flex justify-self-stretch justify-evenly"
>
	<ControlButtons
		{isGameOver}
		isNineBall={false}
		on:undo={handleUndo}
		on:safety={handleSafety}
		on:timeout={handleTimeout}
	/>
</div>
