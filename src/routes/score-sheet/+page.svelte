<script lang="ts">
	import ScoreSheetTitle from '$lib/components/ScoreSheetTitle.svelte';
	import Accordion from '$lib/components/Accordion.svelte';
	import PlayerHead from '$lib/components/PlayerHead.svelte';
	import PlayerInfo from '$lib/components/PlayerInfo.svelte';
	import RackHeader from '$lib/components/RackHeader.svelte';
	import RackInfo from '$lib/components/RackInfo.svelte';

	export let data;

	const { game } = data;
</script>

<ScoreSheetTitle padding={'p-4'}>
	<h1 class="m-auto">9 Ball Score Sheet</h1>
</ScoreSheetTitle>

<ScoreSheetTitle padding={'p-2'}>
	<h2 class="m-auto">Match Totals:</h2>
</ScoreSheetTitle>

{#if $game?.winner}
	<div>Winner: {$game?.winner.name}</div>
{/if}
<div>
	Score: {$game?.player1.score}-{$game?.player2.score}
</div>
<div>Total Innings: {$game?.totalInnings}</div>
<div>Total Safeties: {$game?.player1.safeties}-{$game?.player2.safeties}</div>
<div>Total Dead Balls: {$game?.totalDeadBalls}</div>

<ScoreSheetTitle padding={'p-2'}>
	<h2 class="m-auto">Player Break Down:</h2>
</ScoreSheetTitle>

{#each $game?.players as player, i}
	<Accordion>
		<div slot="header">
			<PlayerHead {player} playerNumber={i + 1} />
		</div>
		<div slot="info">
			<PlayerInfo />
		</div>
	</Accordion>
{/each}

<ScoreSheetTitle padding={'p2'}>
	<h2 class="m-auto">Rack Break Downs:</h2>
</ScoreSheetTitle>

{#each $game?.racks as rack, i}
	<Accordion>
		<div slot="header">
			<RackHeader {rack} rackNumber={i + 1} />
		</div>
		<div slot="info">
			<RackInfo {rack} />
		</div>
	</Accordion>
{/each}

<style>
</style>
