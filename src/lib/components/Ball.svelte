<script context="module" lang="ts">
	import { cva } from 'class-variance-authority';

	const ballClasses = cva(['transition-colors', 'duration-200',  'max-h-full']);

	export type BallModel = {
		number: number;
		color: string;
		isStripe: boolean;
		isDead: boolean;
		isPocketed: boolean;
		isPostKill: boolean;
	};
</script>

<script lang="ts">
	import BallText from './BallText.svelte';

	export let size: 'large' | 'small';
	export let ball: BallModel;
	export let pocketed = false;
	let className = '';
	export { className as class };

	$: ballColor = pocketed ? 'fill-dead-ball' : `fill-${ball.color}-ball`;
</script>

<svg
	viewBox="0 0 48 48"
	class={ballClasses({
		class: [ball.isStripe ? 'fill-white' : ballColor, className]
	})}
	clip-rule="even-odd"
>
	<circle cx="50%" cy="50%" r="22" id="pool-ball" />
	{#key ball.isPocketed}
		<clipPath id="stripe">
			<!--
        Everything outside the circle will be
        clipped and therefore invisible.
      -->
			<rect y="20%" height="60%" width="100%" />
		</clipPath>
		<use
			clip-path="url(#stripe)"
			href="#pool-ball"
			class:hidden={!ball.isStripe}
			class={ball.isPocketed && size === 'large' ? 'fill-dead-ball' : `fill-${ball.color}-ball`}
		/>
		<BallText alignment="center">
			{ball.number}
		</BallText>
	{/key}
</svg>

<style>
	circle {
		stroke: #646464;
		stroke-width: 1px;
		stroke-opacity: 0.6;
		stroke-linejoin: round;
		filter: url(#drop-shadow);
	}
</style>
