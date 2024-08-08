<script lang="ts">
	import { tweened } from 'svelte/motion';
	import { getCssPropertyValue } from '$lib/colors';
	import { interpolateLab } from 'd3-interpolate';
	import { BALL_COLORS } from '$lib/common/ball.js';

	export let data;
	const { barSize } = data;

	const barSizes = [
		{ label: 'Small', value: 'h-1' },
		{ label: 'Medium', value: 'h-2' },
		{ label: 'Large', value: 'h-4' }
	];

	const fromColor = tweened(getCssPropertyValue(BALL_COLORS[0].gradient.stops[0]), {
		interpolate: interpolateLab
	});

	const toColor = tweened(getCssPropertyValue(BALL_COLORS[0].gradient.stops[1]), {
		interpolate: interpolateLab
	});

	$: [$fromColor, $toColor] = BALL_COLORS[0].gradient.stops.map(getCssPropertyValue);
</script>


<div class="grid self-start gap-4">
	<h1 class="m-auto">Display Settings</h1>
	
	<div class="flex gap-2 items-center">
		<h2>Progress Bar Size:</h2>
		{#each barSizes as size}
			<label
				for={size.label}
				class="bg-[#3C3C46] rounded-lg py-1 px-2 transition-all {$barSize === size.value
					? `bg-gradient-to-b  text-white`
					: ''}"
				style:--tw-gradient-stops="{$fromColor}, {$toColor}">{size.label}</label
			>
			<input
				id={size.label}
				type="radio"
				bind:group={$barSize}
				value={size.value}
				class="fixed pointer-events-none opacity-0"
			/>
		{/each}
	</div>
	
</div>
