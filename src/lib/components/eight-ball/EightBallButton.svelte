<script lang="ts">
	import { createEventDispatcher } from 'svelte';
  import { tweened } from 'svelte/motion';
  import { interpolateLab } from 'd3-interpolate';
  import { getCssPropertyValue } from '$lib/colors';
	import { BALL_COLORS } from '$lib/common/ball';
  import BallComponent from '../Ball.svelte';
	import { Ball } from '$lib/common/ball';

	const dispatch = createEventDispatcher();

	export let detail: string;

	function handleClick() {
		dispatch("lose", detail);
	}

	const blackColor = BALL_COLORS[BALL_COLORS.length - 1];

  console.log(blackColor)

  const fromColor = tweened(getCssPropertyValue(blackColor!.gradient.stops[0]), {
		interpolate: interpolateLab
	});

	const toColor = tweened(getCssPropertyValue(blackColor!.gradient.stops[1]), {
		interpolate: interpolateLab
	});

  $: [$fromColor, $toColor] = blackColor.gradient.stops.map(getCssPropertyValue);
</script>

<button
	aria-label="8 ball lose button"
	class="rounded-xl py-1 w-full mb-2 bg-gradient-to-b {blackColor?.border} border relative overflow-hidden"
	style:--tw-gradient-stops="{$fromColor}, {$toColor}"
	on:click={handleClick}
>
  <div class="h-10 w-10 absolute -top-1 -left-2">
    <BallComponent ball={Ball.fromNumber(8)}/>
  </div>
  <div class="flex ml-10">
    <slot />
  </div>
</button>
