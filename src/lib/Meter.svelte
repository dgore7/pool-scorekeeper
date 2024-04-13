<script lang="ts">
	import type { Writable } from 'svelte/store';
	import type { Player } from './nine-ball/player';

	export let player: Writable<Player>;
	export let placement: 'left' | 'right';

	$: ({ score, scoreRequired } = $player);
</script>

<div
	class="meter {placement}"
	style="--bottom: {(score / scoreRequired) * 100}%; --tickSize=calc(100% / {scoreRequired})"
>
	{#each { length: scoreRequired } as _, i}
		<div class="tick">
			<span class="tick-mark" class:complete={score > i}> </span>
			<span>
				{i + 1}
			</span>
		</div>
	{/each}
</div>

<style>
	.meter {
		background-color: grey;
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		position: relative;
	}


	.tick {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.left > .tick {
		flex-direction: row-reverse;
		padding-inline-start: 4px;
	}
	.right > .tick {
		flex-direction: row;
		padding-inline-end: 4px;
	}
	.tick-mark {
		height:  2px;
		width: 40%;
    background-color: white;
    position: relative;
	}
  .tick-mark.complete::after {
    content: "";
    position: absolute;
    transform: rotate(45deg);
    height: 2px;
    z-index: 1;
    inset: 0;
    background-color: white;
  }
</style>
