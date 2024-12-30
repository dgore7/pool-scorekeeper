<script lang="ts">
	import { BALL_COLORS } from '$lib/common/ball';

	let className = ""
	export { className as class}

  const blackColor = BALL_COLORS.find(color => color.label === "black")


</script>

<div
	class="info-box w-full border-2 border-solid rounded-xl grid grid-cols-1 gap-y-2 bg-[#28282C] border-[#28282C] overflow-clip {className}"
	style:--from-stop="var({blackColor?.gradient.stops[0]})"
	style:--transparency="{70}%"
	style:background-image={'radial-gradient(var(--position), color-mix(in srgb, var(--from-stop) var(--transparency), transparent), #1F2026 var(--end-stop))'}
>
	<slot />
</div>

<style>
	.info-box {
		background-size: 150% 150%;
		animation: Animation 8s ease infinite alternate;
    --position: circle at left 70% top 0%;
		--end-stop: 80%;
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