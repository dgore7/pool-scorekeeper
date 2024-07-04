<script lang="ts">
	import PlayerStats from '$lib/components/PlayerStats.svelte';

	import ProgressBar from '$lib/components/ProgressBar.svelte';

	import Scoreboard from '$lib/components/Scoreboard.svelte';
	import ControlPad from '$lib/components/straight-pool/ControlPad.svelte';
	import Container from '$lib/components/Container.svelte';

	import { StraightPoolGame, StraightPoolPlayer } from '$lib/straight-pool';

	let game = new StraightPoolGame(
		new StraightPoolPlayer('Straight Guy', 100, 'yellow'),
		new StraightPoolPlayer('Gay Guy', 150, 'orange')
	);
</script>

<Container>
	<Scoreboard {game}>
		{#each game.players as player, playerNumber}
			<PlayerStats {player} {game} {playerNumber} />
		{/each}
		{#each game.players as player, playerNumber}
			<ProgressBar {player} reverse={!!playerNumber} />
		{/each}
	</Scoreboard>


		<ControlPad {game} />

</Container>

<style></style>
