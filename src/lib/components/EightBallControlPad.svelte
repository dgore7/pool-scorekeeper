<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import ControlButtons from './ControlButtons.svelte';
	import type { ballType } from '$lib/eight-ball/types';

	export let isGameOver;
	export let game;

	let dispatch = createEventDispatcher();

	function handleMiss() {
		dispatch('miss');
	}

	function handleWin() {
		dispatch('win', 'M8');
	}

	function handleWinDialog() {
		dispatch('winDialog');
	}

	function handleLose() {
		dispatch('lose');
	}

	function handleUndo() {
		dispatch('undo');
	}

	function handleSaftey() {
		dispatch('safety');
	}

	function handleTimeout() {
		dispatch('timeout');
	}
</script>

<button
	class="flex justify-center rounded-xl py-4 text-2xl"
	style="background-color:{game.currentPlayer.color}"
	on:click={handleMiss}>End {game.currentPlayer.name}'s Turn</button
>

<div class="flex justify-center gap-6">
	{#if !game.currentRack.innings && game.currentRack.playerToBreak === game.currentPlayer}
		<button class="rounded-xl text-2xl text-black bg-green-400 w-full" on:click={handleWinDialog}
			>{game.currentPlayer.name} Won!</button
		>
	{:else}
		<button
			class="rounded-xl text-2xl text-black bg-green-400 w-full"
			on:click={handleWin}
			disabled={!game.currentRack.playerBalls[0]}>{game.currentPlayer.name} Won!</button
		>
	{/if}
	<button class="rounded-xl py-4 text-2xl bg-rose-600 w-full" on:click={handleLose}
		>{game.currentPlayer.name} Lost...</button
	>
</div>

<div
	aria-label="control button container"
	class="rounded-xl bg-slate-600 flex justify-self-stretch justify-evenly"
>
	<ControlButtons
		{isGameOver}
		isNineBall={false}
		on:undo={handleUndo}
		on:safety={handleSaftey}
		on:timeout={handleTimeout}
	/>
</div>

<style></style>
