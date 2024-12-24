<script lang="ts">
	import type { Player } from '$lib/types';
	import { BALL_COLORS } from '$lib/common/ball';

	export let player: Player;
</script>

<div class="m-auto w-3/4 flex justify-between items-center text-xl">
	<span class="text-yellow-200">Winner:</span>
	<span
		class="winner border-2 px-2 py-1 border-solid rounded-xl {player
			.color.border} bg-[#28282C] overflow-clip"
		style:--from-stop="var({player.color.gradient.stops[0]})"
		style:--transparency="70%"
		style:background-image={'radial-gradient(var(--position), color-mix(in srgb, var(--from-stop) var(--transparency), transparent), #1F2026 var(--end-stop))'}
	>
		{player.name}
	</span>
</div>

<style>
	.winner {
		background-size: 150% 150%;
		animation: Animation 8s ease infinite alternate;
		--position: circle at left 70% top 0%;
		--end-stop: 80%;
		animation: Animation 8s ease infinite alternate-reverse;
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
</style>
