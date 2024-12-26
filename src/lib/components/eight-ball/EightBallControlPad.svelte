<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import ControlButtons from '../nine-ball/ControlButtons.svelte';
	import type { EightBallGame } from '$lib/eight-ball';
	import PlayerColorButton from '../PlayerColorButton.svelte';

	export let isGameOver: boolean;
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

<PlayerColorButton
	player={game.currentPlayer}
	disabled={isGameOver}
	dispatchEvent={'miss'}
	on:miss={handleMiss}
	isTurnButton>End {game.currentPlayer.name}'s Turn</PlayerColorButton
>

<div class="flex justify-center gap-6">
	<PlayerColorButton player={game.currentPlayer} disabled={isGameOver} dispatchEvent="win" on:win={handleWin}>
		{game.currentPlayer.name} Won!
	</PlayerColorButton>

	<PlayerColorButton player={game.previousPlayer} disabled={isGameOver} dispatchEvent="lose" on:lose={handleLose}>
		{game.currentPlayer.name} Lost...
	</PlayerColorButton>
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
