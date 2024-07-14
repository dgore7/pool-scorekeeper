<script lang="ts">
	import type { Ball as BallModel } from '$lib/common/ball';
	export let size: 'large' | 'small';
	export let ball: BallModel;
	export let pocketed = false;
	let className = '';
	export { className as class };

	async function getImgUrl(pocketed: boolean) {
		const { default: src } = await (pocketed
			? import(`$lib/assets/balls/pocketed/${ball.number}.svg?url`)
			: import(`$lib/assets/balls/${ball.number}.svg?url`));
		return src;
	}
</script>

{#await getImgUrl(pocketed) then src}
	<img class="w-full max-h-[min(100%,6rem)] m-auto" {src} alt="{ball.number} ball" />
{/await}
