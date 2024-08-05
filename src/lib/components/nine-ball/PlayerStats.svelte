<script lang="ts">
	import { fly } from 'svelte/transition';
	import TimeoutIcon from '../icons/TimeoutIcon.svelte';
	import ShieldIcon from '../icons/ShieldIcon.svelte';
	import type { Game, Player } from '$lib/types';
	import { tweened } from 'svelte/motion';

	export let player: Player;
	export let game: Game;
	export let playerNumber: number;

	const transparency = tweened();

	$: timeouts = game.currentRack.timeouts[playerNumber];
	$: isActive = game.currentPlayer === player;
	$: border = isActive ? player.color.border : 'border-[#28282C]';
	$: $transparency = isActive ? 70 : 0;
</script>

<!-- the color-mix below is a trick to add opacity to the given color -->
<div
	class="player-score portrait:w-1/2 landscape:h-1/2 border-2 max-h-60 px-2 py-1 border-solid rounded-xl grid grid-rows-[auto_1fr_auto] grid-cols-1 landscape:grid-rows-[min-content_min-content] landscape:grid-cols-2 gap-y-2 content-between {border} bg-[#28282C] overflow-clip"
	class:radial-to-tr={playerNumber === 0}
	class:radial-to-bl={playerNumber === 1}
	style:--transparency="{$transparency}%"
	style:--from-stop="var({player.color.gradient.stops[0]})"
	style:background-image={'radial-gradient(var(--position), color-mix(in srgb, var(--from-stop) var(--transparency), transparent), #1F2026 var(--end-stop))'}
>
	<div class="flex landscape:block w-full justify-between overflow-hidden">
		<div class="font-large truncate mr-2">{player.name}</div>
		<div class="font-light text-secondary whitespace-nowrap">level {player.handicap}</div>
	</div>
	<div
		class="score font-light text-5xl relative overflow-hidden stack text-center landscape:justify-end row-span-2 self-center landscape:text-7xl landscape:mx-4"
	>
		{#key player.score}
			<div in:fly={{ y: '100%' }} out:fly={{ y: '-100%' }}>
				{player.score}
			</div>
		{/key}
	</div>
	<div class="w-full flex portrait:justify-between landscape:gap-2">
		<div class="flex gap-2 min-w-10 items-center">
			<ShieldIcon class="w-4" variant="filled" />
			<div class="stack relative">
				{#key player.safeties}
					<div in:fly={{ y: '80%' }} out:fly={{ y: '-80%', duration: 50 }}>
						{player.safeties}
					</div>
				{/key}
			</div>
		</div>
		<div class="flex gap-2 min-w-10 items-center">
			<TimeoutIcon class="w-4" variant="filled" />
			<div class="stack relative">
				{#key timeouts}
					<div in:fly={{ y: '80%' }} out:fly={{ y: '-80%', duration: 50 }}>
						{timeouts}
					</div>
				{/key}
			</div>
		</div>
		<div class="bg-white/20 rounded-lg px-1.5 mix-blend-screen whitespace-nowrap">
			<span class="capitalize text-secondary text-sm leading-4">goal</span>
			<span class="text-primary">{player.scoreRequired}</span>
		</div>
	</div>
</div>

<style>
	.player-score {
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
