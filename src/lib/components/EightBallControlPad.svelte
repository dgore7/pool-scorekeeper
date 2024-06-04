<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import ControlButtons from './ControlButtons.svelte';
	import type { EightBallGame } from '$lib/eight-ball';
	import { cva } from 'class-variance-authority';

	export let isGameOver;
	export let game: EightBallGame;

	let dispatch = createEventDispatcher();
	const endGameButtons = cva(['rounded-xl', 'text-2xl', 'w-full']);
	const turnButton = cva(['flex', 'justify-center', 'rounded-xl', 'py-4', 'text-2xl']);

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
	class={turnButton({ class: [isGameOver ? 'bg-slate-400' : game.currentPlayer.color] })}
	on:click={handleMiss}
	disabled={isGameOver}>End {game.currentPlayer.name}'s Turn</button
>

<div class="flex justify-center gap-6">
	<button
		class={endGameButtons({
			class: ['text-black', isGameOver ? 'bg-slate-400' : 'bg-green-400']
		})}
		on:click={handleWin}
		disabled={isGameOver}
	>
		{game.currentPlayer.name} Won!
	</button>
	<button
		class={endGameButtons({
			class: [isGameOver ? 'bg-slate-400' : 'bg-rose-600']
		})}
		on:click={handleLose}
		disabled={isGameOver}
	>
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
