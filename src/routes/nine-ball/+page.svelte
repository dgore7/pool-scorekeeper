<script lang="ts">
	import type { NineBallGame } from '$lib';
	import type { Writable } from 'svelte/store';
	import {
		Safety,
		Miss,
		Increment,
		EndRack,
		Timeout,
		Undo,
		DeadBall,
		PostKill
	} from '$lib/nine-ball/actions.js';
	import GraveIcon from '$lib/components/icons/GraveIcon.svelte';
	import WarningIcon from '$lib/components/WarningIcon.svelte';
	import Scoreboard from '$lib/components/nine-ball/Scoreboard.svelte';
	import PlayerStats from '$lib/components/nine-ball/PlayerStats.svelte';
	import ProgressBar from '$lib/components/ProgressBar.svelte';
	import ControlPad from '$lib/components/nine-ball/ControlPad.svelte';
	import DeadBallTitle from '$lib/components/nine-ball/DeadBallTitle.svelte';
	import TrophyIcon from '$lib/components/icons/TrophyIcon.svelte';
	import type { Ball } from '$lib/common/ball.js';
	import HeaderRight from '$lib/components/HeaderRight.svelte';
	import HeaderLeft from '$lib/components/HeaderLeft.svelte';
	import { tweened } from 'svelte/motion';
	import { getCssPropertyValue } from '$lib/colors';
	import { interpolateLab } from 'd3-interpolate';

	type radioHeightType = { 108: string; 116: string; 132: string };

	export let data;

	const { game } = data as Required<{ game: Writable<NineBallGame> }>;
	const { toast, toastTime, barSize } = data;

	let isDeadBallMode = false;
	let isBarSizeSelect = false;

	function handlePocket(ball: Ball) {
		$game.doAction(new Increment(), ball);
		$game = $game;

		if ($game.currentPlayer.score === $game.currentPlayer.scoreRequired) {
			handleWinner();
		}
	}

	function handleTurn() {
		$game.doAction(new Miss());
		$game = $game;
	}

	function handleSafety() {
		$game.doAction(new Safety());
		$game = $game;
	}

	function handleTimeout() {
		$game.doAction(new Timeout());
		$game = $game;
	}

	function handleUndo() {
		$game.doAction(new Undo());
		$game = $game;
	}

	function handleNewRack() {
		$game.doAction(new EndRack());
		$game = $game;
	}

	function handleDeadBallMode() {
		isDeadBallMode = !isDeadBallMode;
		$toastTime = 10000;
		if (isDeadBallMode) {
			$toast = {
				message:
					'You Have Entered Dead Ball Mode. Select All Dead Balls Then Click Dead Ball Button Again to Save and Exist Dead Ball Mode.',
				icon: GraveIcon,
				class: 'bg-gray-200'
			};
		} else {
			$toast = {
				message: 'You Have Re-Entered the World of the Living.',
				icon: WarningIcon,
				class: 'bg-gray-200'
			};
		}
	}

	function handleWinner() {
		$toastTime = 5000;
		$toast = {
			message: `Player ${$game.currentPlayer.name} wins!`,
			icon: TrophyIcon,
			class: 'bg-gray-200'
		};
	}

	function handleBallPocket(event: CustomEvent<Ball>) {
		const pocketedBall = event.detail;
		handlePocket(pocketedBall);
		$game = $game;
	}

	function handleDeadBalls(event: CustomEvent<Ball[]>) {
		handleDeadBallMode();
		const deadBalls = event.detail;
		deadBalls.forEach((ball) => {
			if (ball.isPocketed) {
				$game.doAction(new PostKill(), ball);
			} else if (($game.isGameOver && ball.number === 9) || ball.number < 9) {
				$game.doAction(new DeadBall(), ball);
			}
		});
		$game = $game;
	}

	const fromColor = tweened(getCssPropertyValue($game.currentPlayer.color.gradient.stops[0]), {
		interpolate: interpolateLab
	});

	const toColor = tweened(getCssPropertyValue($game.currentPlayer.color.gradient.stops[1]), {
		interpolate: interpolateLab
	});

	$: [$fromColor, $toColor] = $game.currentPlayer.color.gradient.stops.map(getCssPropertyValue);
</script>

<div class="flex-[1_0_auto] flex gap-4 portrait:flex-col">
	{#if $game}
		{#if isDeadBallMode}
			<DeadBallTitle />
		{:else}
			<div
				class="grid grid-rows-[auto_1fr_auto] landscape:flex-[1_1_50%] bg-[#131318] portrait:py-4 px-6 portrait:-mx-6 landscape:h-full"
			>
				<HeaderLeft {game} />
				<Scoreboard>
					{#each $game.players as player, playerNumber}
						<PlayerStats {player} game={$game} {playerNumber} />
					{/each}
				</Scoreboard>

				<div class="self-end">
					{#each $game.players as player}
						<ProgressBar {player} game={$game} barSize={$barSize} bind:isBarSizeSelect />
					{/each}
				</div>
			</div>
		{/if}
		<div class="flex flex-col flex-[1_1_50%] bg-[#0a0a0a] px-4 -mx-4">
			<HeaderRight {game} />
			<div class="flex flex-col landscape:flex-row grow">
				<div class="flex justify-between py-1 items-baseline landscape:hidden">
					<span class="text-xl truncate">
						{$game.currentPlayer.name}'s Turn
					</span>
					<span class="text-secondary whitespace-nowrap">
						Innings: {$game.currentRack.innings}
					</span>
				</div>
				<ControlPad
					{game}
					{isDeadBallMode}
					on:ballPocket={handleBallPocket}
					on:miss={handleTurn}
					on:undo={handleUndo}
					on:safety={handleSafety}
					on:timeout={handleTimeout}
					on:newRack={handleNewRack}
					on:deadBallMode={handleDeadBallMode}
					on:saveDeadBalls={handleDeadBalls}
				/>
			</div>
		</div>
	{/if}
</div>
