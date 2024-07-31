<script lang="ts">
	import type { GameType, RuleType } from '$lib/types';
	import splash from '../assets/rules-panel.svg';
	import Select from './Select.svelte';

	const poolGames = [
		{ value: '9ball', label: '9 Ball' },
		{ value: '8ball', label: '8 Ball' },
		{ value: '10ball', label: '10 Ball' },
		{ value: 'straightPool', label: 'Straight Pool' },
		{ value: 'onePocket', label: 'One Pocket' }
	];
	const rules = [
		{ value: 'APA', label: 'APA' },
		{ value: 'BCA', label: 'BCA' },
		{ value: 'Pro', label: 'Pro' }
	];

	export let selectedGame: GameType;
	export let selectedRules: RuleType;
</script>

<div
	class="relative flex flex-col flex-grow gap-6 p-4 rounded-2xl justify-end overflow-hidden"
	style:background-image="linear-gradient(to bottom, #28282c, #16161a)"
>
	<div
		id="rules-form-splash"
		style:--splash="url({splash})"
		class="flex-1 -m-4 mb-0 p-4 content-end relative"
	>
		<h4 class="text-xl color-[#D5D5D5]">POOL SCOREKEEPER</h4>
		<h1 class="text-5xl">Rack'em Up!</h1>
	</div>

	<fieldset class="grid gap-6 w-full justify-items-stretch">
		<Select
			bind:selectedItem={selectedGame}
			options={poolGames}
			label={'Choose Game'}
			name="game"
		/>
		<Select bind:selectedItem={selectedRules} options={rules} label={'Choose Rules'} name="rules" />
	</fieldset>
</div>

<style>
	#rules-form-splash::before {
		content: '';
		width: 100%;
		height: 100%;
		position: absolute;
		inset: 0;
		background-image: var(--splash);
		background-size: 100% 110%;
		background-repeat: no-repeat;
		background-position: center;
	}

	#rules-form-splash {
		background-image: linear-gradient(to bottom, #1c1c2000, #1c1c20ff),
			linear-gradient(220deg in oklab, #4fbefd88 0%, #0096ed88 19%, #002b4888 72%, #001a2988 92%);
		background-position: bottom, top;
		background-size:
			100% 45%,
			160% 100%;
		background-repeat: no-repeat, no-repeat;
	}
</style>
