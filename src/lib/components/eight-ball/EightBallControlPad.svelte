<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import ControlButtons from '../nine-ball/ControlButtons.svelte';
	import type { EightBallGame } from '$lib/eight-ball';
	import { cva } from 'class-variance-authority';
	import TurnButton from '../TurnButton.svelte';
	import EngGameButton from './EndGameButton.svelte';
	import EndGameButton from './EndGameButton.svelte';

	export let isGameOver: boolean;
	export let game: EightBallGame;

	let dispatch = createEventDispatcher();
	const endGameButtons = cva(['rounded-xl', 'text-2xl', 'w-full']);

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

<TurnButton {game} disabled={isGameOver} on:miss={handleMiss}
	>End {game.currentPlayer.name}'s Turn</TurnButton
>

<div class="flex justify-center gap-6">
	<EngGameButton on:win={handleWin} disabled={isGameOver}>
		{game.currentPlayer.name} Won!
	</EngGameButton>
	<EndGameButton on:lose={handleLose} disabled={isGameOver} isWin={false}>
		{game.currentPlayer.name} Lost...
	</EndGameButton>
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
