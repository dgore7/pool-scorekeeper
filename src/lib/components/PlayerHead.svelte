<script lang="ts">
	import { Player } from '$lib/nine-ball';

	export let player: Player;
	export let playerNumber: number;
</script>

<div>
	Player {playerNumber}: {player.name}
</div>
<div>
	Score: {player.score}
	Required Score: {player.scoreRequired}
</div>
