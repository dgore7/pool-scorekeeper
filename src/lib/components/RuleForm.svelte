<script lang="ts">
	import type { GameType, RuleType } from '$lib/types';
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
	class="flex flex-col flex-grow gap-6 p-4 bg-gradient-to-b from-[#686870] to-black rounded-2xl justify-end"
>
	<div>
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
		<Select
			bind:selectedItem={selectedRules}
			options={rules}
			label={'Choose Rules'}
			name="rules"
		/>
	</fieldset>
</div>
