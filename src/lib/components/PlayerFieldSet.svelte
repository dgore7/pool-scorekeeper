<script lang="ts">
	import type { APAHandicaps, GameType } from '$lib/types';
	import Well from './Well.svelte';
	import startcase from 'lodash.startcase';
	import Select from './Select.svelte';

	import { BALL_COLORS, type BallColorSpec } from '$lib/common/ball';
	import Input from './Input.svelte';
	import ColorBox from './ColorBox.svelte';

	type Option<T> = {
		value: T;
		label: string;
	};

	export let name: 'player-one' | 'player-two';
	export let playerName: string | null;
	export let playerHandicap: APAHandicaps = 0;
	export let opponentColor;
	export let selectedColor: BallColorSpec;

	export let selectedGame: GameType;

	let NineBallHandicaps: Option<APAHandicaps>[] = [];
	let EightBallHandicaps: Option<APAHandicaps>[] = [];

	for (let i = 1; i <= 9; i++) {
		const handicap = { value: i, label: i.toString() };
		NineBallHandicaps.push(handicap);
	}

	for (let i = 2; i <= 7; i++) {
		const handicap = { value: i, label: i.toString() };
		EightBallHandicaps.push(handicap);
	}

	let handicaps = selectedGame === '9ball' ? NineBallHandicaps : EightBallHandicaps;

	// omit black ball from color choices
	let colors: Option<BallColorSpec>[] = BALL_COLORS.slice(0, -1).map((ballColor) => ({
		label: ballColor.label,
		value: ballColor
	}));
	let availableColors: Option<BallColorSpec>[] = [];

	$: if (opponentColor) {
		availableColors = colors.filter((color) => color.value !== opponentColor);
	}
</script>

<Well color={selectedColor}>
	<fieldset class="flex flex-col gap-4" {name}>
		<legend class="flex mb-1.5 w-full justify-between">
			<h4>
				{startcase(name)}
			</h4>
			{#if name === 'player-one'}
				<div class="border-white border-2 rounded-full py-1 px-4">Won Lag</div>
			{/if}
		</legend>
		<Input name="name" ariaLabel="name" bind:value={playerName} />
		<Select
			bind:selectedItem={playerHandicap}
			options={handicaps}
			label={'Choose Level'}
			name={'handicap'}
		/>
		<Select
			bind:selectedItem={selectedColor}
			options={availableColors}
			label="Choose Color"
			name="color"
		>
			<ColorBox color={selectedColor} />
		</Select>
	</fieldset>
</Well>
