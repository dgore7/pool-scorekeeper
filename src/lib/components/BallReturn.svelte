<script lang="ts">
	import type { NineBallGame } from '$lib';
	import { fly, type TransitionConfig } from 'svelte/transition';
	import Ball, { type BallModel } from './Ball.svelte';
	import { bounceIn, bounceInOut, bounceOut, cubicIn, cubicOut, elasticOut, linear, quintIn } from 'svelte/easing';

	export let game: NineBallGame;

	function roll(node: HTMLElement): TransitionConfig {
		const existingTransform = getComputedStyle(node).transform.replace('none', '');

		return {
			delay: 0,
			duration: 1000,
			easing: (t) => (t < 0.9 ? linear(t) : bounceInOut(t)),
			css: (_, u) =>
				`transform: ${existingTransform} translateX(${22 * u}rem) rotate(${u * 3.5}turn)`
		};
	}
</script>

<div
	aria-label="ball return container"
	class="rounded-lg bg-slate-400 h-10 w-[22.5rem] flex m-auto border-4 border-slate-700 box-content overflow-hidden"
>
	{#each game.currentRack.pocketedBalls as ball}
		<div in:roll>
			<Ball {ball} size="small" />
		</div>
	{/each}
</div>
