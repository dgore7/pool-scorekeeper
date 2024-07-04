<script lang="ts">
	import type { StraightPoolGame } from '$lib/straight-pool';
	import ControlButtons from '../ControlButtons.svelte';
	import { createEventDispatcher } from 'svelte';

	export let game: StraightPoolGame;

	const dispatch = createEventDispatcher();

	function handleIncrement() {
		dispatch('increment');
	}

	function handleDecrement() {
		dispatch('decrement');
	}

	function handleEndTurn() {
		dispatch('miss');
	}

	function handleUndo() {
		dispatch('undo');
	}
</script>

<div class="flex rounded-xl border-white border-4 overflow-hidden justify-center my-4">
	<button on:click={handleIncrement} class="w-full p-4 border-r-2">+</button>
	<button on:click={handleDecrement} class="w-full p-4 border-l-2">-</button>
</div>

<button on:click={handleEndTurn}>{game.currentPlayer.name}'s Turn is Over</button>

<div
	aria-label="control button container"
	class="rounded-xl bg-slate-600 flex justify-self-stretch justify-evenly"
>
	<ControlButtons isNineBall={false} isGameOver={false} on:saftey on:timeout on:undo />
</div>
