<script lang="ts">
	import type { BallColorSpec } from '$lib/common/ball';

	export let color: BallColorSpec;
</script>

<div
	class="h-6 w-6 border-white border-2 rounded-sm"
	style:background-color={color.gradient.stops[0]}
></div>
