<script lang="ts">
	import type { EightBallGame } from '$lib/eight-ball';
	import type { NineBallGame } from '$lib';

	export let game: NineBallGame | EightBallGame;
</script>

<div
	aria-live="polite"
	class="rounded-lg overflow-hidden flex-[1_0_auto] flex gap-2"
	aria-label="scoreboard"
>
	<slot />
</div>
