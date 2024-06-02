<script lang="ts">
	import type { NineBallGame } from '$lib';
	import { type TransitionConfig } from 'svelte/transition';
	import Ball from './Ball.svelte';
	import { bounceInOut, linear } from 'svelte/easing';

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
	class="rounded-lg bg-slate-400 w-full flex m-auto border-4 border-slate-700 overflow-hidden aspect-[9/1] box-content"
>
	{#each game.currentRack.pocketedBalls as ball}
		<div in:roll style:width="{100 / game.currentRack.gameBalls.length}%">
			<Ball {ball} size="small" />
		</div>
	{/each}
</div>
