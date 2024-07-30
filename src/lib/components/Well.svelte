<script lang="ts">
	import type { BallColorSpec } from '$lib/common/ball';

	let className = '';
	export { className as class };
	export let color: BallColorSpec;
</script>

<div
	class="p-4 rounded-2xl {className} bg-gradient-to-bl {color.gradient.from} {color.gradient.to}"
>
	<slot />
</div>
