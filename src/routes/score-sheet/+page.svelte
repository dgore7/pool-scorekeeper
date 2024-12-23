<script lang="ts">
	import ScoreSheetTitle from '$lib/components/score-sheet/ScoreSheetTitle.svelte';
	import Accordion from '$lib/components/score-sheet/Accordion.svelte';
	import RackAtGlance from '$lib/components/score-sheet/RackAtGlance.svelte';
	import Scoreboard from '$lib/components/nine-ball/Scoreboard.svelte';
	import PlayerStats from '$lib/components/nine-ball/PlayerStats.svelte';
	import InfoBox from '$lib/components/score-sheet/InfoBox.svelte';
	import InfoLine from '$lib/components/score-sheet/InfoLine.svelte';
	import RackNumber from '$lib/components/score-sheet/RackNumber.svelte';

	export let data;
	const { game } = data;
</script>

<div class="grid gap-4">
	<h2 class="flex m-auto text-2xl">Match Details:</h2>
	<Scoreboard>
		{#each $game.players as player, playerNumber}
			<PlayerStats {player} game={$game} {playerNumber} isScoreSheet />
		{/each}
	</Scoreboard>

	<InfoBox transparency={70}>
		{#if $game?.winner}
			<InfoLine title="Winner" amount={$game.winner.name} />
		{/if}
		<InfoLine title="Total Innings" amount={$game.totalInnings} />
		<InfoLine title="Total Dead Balls" amount={$game.totalInnings} />
	</InfoBox>
</div>

<ScoreSheetTitle padding={'p2'}>
	<h2 class="m-auto">Rack Break Downs:</h2>
</ScoreSheetTitle>

{#each $game?.racks as rack, i}
	<Accordion>
		<div slot="header">
			<RackNumber {rack} game={$game} rackNumber={i + 1} />
		</div>
		<div slot="points">
			<RackAtGlance {rack} />
		</div>
		<div slot="info" class="grid gap-4">
			<Scoreboard>
				{#each $game.players as player, playerNumber}
					<PlayerStats {player} {rack} game={$game} {playerNumber} isScoreSheet />
				{/each}
			</Scoreboard>
			<div class="grid bg-[#686870] bg-opacity-50 py-2 px-3 rounded-xl flex-grow capitalize">
				<InfoLine title="Innings" amount={rack.innings} />
				<InfoLine title="Dead Balls" amount={rack.deadBallCount} />
			</div>
		</div>
	</Accordion>
{/each}
