<script lang="ts">
	import { BALL_COLORS } from '$lib/common/ball';
	export let transparency: number;
</script>

<div
	class="player-score radial-to-bl w-full border-2 px-2 py-1 border-solid rounded-xl grid grid-cols-1 gap-y-2 bg-[#28282C] border-[#28282C] overflow-clip"
	style:--from-stop="var({BALL_COLORS[BALL_COLORS.length - 1].gradient.stops[0]})"
	style:--transparency="{transparency}%"
	style:background-image={'radial-gradient(var(--position), color-mix(in srgb, var(--from-stop) var(--transparency), transparent), #1F2026 var(--end-stop))'}
>
	<slot />
</div>

<style>
	.player-score {
		background-size: 150% 150%;
		animation: Animation 8s ease infinite alternate;
	}

	.radial-to-bl {
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
