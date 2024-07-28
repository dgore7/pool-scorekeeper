<script lang="ts">
	import { fly } from 'svelte/transition';
	import TimeoutIcon from '../icons/TimeoutIcon.svelte';
	import ShieldIcon from '../icons/ShieldIcon.svelte';
	import type { Game, Player } from '$lib/types';

	export let player: Player;
	export let game: Game;
	export let playerNumber: number;
</script>

<!-- the color-mix below is a trick to add opacity to the given color -->
<div
	class="player-score w-1/2 border-2 px-2 py-1 border-solid rounded-xl space-y-2 {player.color
		.border}"
	class:radial-to-tr={playerNumber === 0}
	class:radial-to-bl={playerNumber === 1}
	style:background-image="radial-gradient(var(--position), color-mix(in srgb, {player.color.gradient
		.stops[0]} 70%, transparent), #1F2026 var(--end-stop))"
>
	<div class="flex w-full justify-between">
		<div class="font-large truncate">{player.name}</div>
		<div class="font-light text-secondary whitespace-nowrap ml-2">level {player.handicap}</div>
	</div>
	<div class="score font-light text-5xl relative overflow-hidden stack text-center">
		{#key player.score}
			<div in:fly={{ y: '100%' }} out:fly={{ y: '-100%' }}>
				{player.score}
			</div>
		{/key}
	</div>
	<div class="w-full flex justify-between">
		<div class="flex gap-2 items-center">
			<ShieldIcon class="w-4" variant="filled" />
			{player.safeties}
		</div>
		<div class="flex gap-2 items-center">
			<TimeoutIcon class="w-4" variant="filled" />
			{game.currentRack.timeouts[playerNumber]}
		</div>
		<div class="bg-white/20 rounded-lg px-1.5 mix-blend-screen">
			<span class="capitalize text-secondary text-sm leading-4">goal</span>
			<span class="text-primary">{player.scoreRequired}</span>
		</div>
	</div>
</div>

<style>
	.player-score {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		background-size: 150% 150%;
		animation: Animation 8s ease infinite alternate;
	}
	@keyframes Animation {
		0% {
			background-position: 0% 0%;
		}
		50% {
			background-position: 91% 100%;
		}
		100% {
			background-position: 0% 0%;
		}
	}
	.radial-to-bl {
		--position: circle at left 70% top 0%;
		--end-stop: 80%;
		animation: Animation 8s ease infinite alternate-reverse;
	}

	.radial-to-tr {
		--position: circle at right 70% bottom 0%;
		--end-stop: 100%;
	}
</style>
