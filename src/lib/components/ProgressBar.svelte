<script lang="ts">
	import type { Player } from '$lib';
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';

	export let player: Player;
  export let color: string;

  const progress = tweened(0, {
    duration: 500,
    easing: cubicOut,
  })

  $: progressPercent = player.score / player.scoreRequired
  $: progress.set(progressPercent)

</script>

<div class="progress-container">
	<div class="player-name">
		{player.name}
	</div>
	<div class="progress-bar-outer">
    <div class="progress-bar-inner" style="width: {$progress * 100}%; background-color: {color}" ></div>
  </div>
</div>

<style>
	.progress-container {
		display: grid;
		grid-template-columns: 1fr 9fr;
		align-items: center;
	}

  .player-name {
    margin: auto;
  }

  .progress-bar-outer, .progress-bar-inner {
    justify-self: start;
    display: flex;
    border-radius: 10px;
    height: 18px;
  }

	.progress-bar-outer {
		background-color: white;
    width: 90%;
	}

</style>
