<svelte:options namespace="svg" />

<script lang="ts">
	export let alignment: 'top' | 'center';
</script>

<circle
	cx="50%"
	cy={alignment === 'top' ? '28%' : '50%'}
	r="9"
	aria-label="ball number"
	fill="white"
/>
<text
	x="50%"
	y={alignment === 'top' ? '28%' : '50%'}
	text-anchor="middle"
	alignment-baseline="central"
	stroke="black"
	stroke-width="0.5px"
	fill="black"
	font-size="14px"
	class="font-noto"
>
	<slot />
</text>
