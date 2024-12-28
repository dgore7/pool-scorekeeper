<script lang="ts">
	import BallSelect from './BallSelect.svelte';
	import SlideLeftIcon from '../icons/SlideLeftIcon.svelte';
	import SlideRightIcon from '../icons/SlideRightIcon.svelte';
	import AssignedBall from './AssignedBall.svelte';
	import { createEventDispatcher } from 'svelte';
	import type { BallType, EightBallGame } from '$lib/eight-ball';

	export let game: EightBallGame;
	export let areTeamsAssigned: boolean;

	let showGameInfo = false;

	function toggleInfoView() {
		showGameInfo = !showGameInfo;
	}

	const dispatch = createEventDispatcher();

	function handleBallSelect(event: CustomEvent<BallType>) {
		dispatch('ballAssigned', event.detail);
	}
</script>

<div
	class="wrapper h-16 flex gap-4 items-center transition-transform duration-300
	{!showGameInfo && !areTeamsAssigned
		? '-translate-x-0'
		: areTeamsAssigned
			? '-translate-x-1/2'
			: '-translate-x-[47%]'}"
>
	<div class="flex items-center gap-4 w-4/6 pl-4">
		<div>Assign {game.currentPlayer.name} to:</div>
		<BallSelect {game} on:ballSelect={handleBallSelect} />
	</div>

	<button
		on:click={toggleInfoView}
		class="transition-opacity duration-300 {areTeamsAssigned ? 'opacity-0' : 'opacity-100'}"
		disabled={areTeamsAssigned}
	>
		{#if showGameInfo}
			<SlideRightIcon />
		{:else}
			<SlideLeftIcon />
		{/if}
	</button>

	<div class="flex flex-col h-full w-4/6 justify-center">
		<div>Rack Innings: {game.currentRack.innings}</div>
		<div>Total Innings: {game.totalInnings}</div>
	</div>

	{#if areTeamsAssigned}
		<AssignedBall {game} team={game.currentRack.teams[game.currentRack.turn]} />
	{/if}
</div>

<style>
	.wrapper {
		width: 190%;
	}
</style>
