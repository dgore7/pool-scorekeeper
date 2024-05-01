<script lang="ts">
	import Well from './Well.svelte';

	const poolGames = [
		{ type: '9ball', title: '9 Ball' },
		{ type: '8ball', title: '8 Ball' },
		{ type: '10ball', title: '10 Ball' },
		{ type: 'straightPool', title: 'Straight Pool' },
		{ type: 'onePocket', title: 'One Pocket' }
	];
	const rules = ['APA', 'BCA', 'Pro'];

	export let selectedGame: String;
	export let selectedRules: String;
</script>

<h2 class="mx-auto">What Type Of Pool Ya Wanna Shoot?</h2>

<Well>
	<fieldset class="flex flex-col gap-4">
		<label>
			Game
			<select
				bind:value={selectedGame}
				class="bg-black h-10 py-2 px-3 rounded invalid:text-[#9ca3af]"
				required
			>
				{#each poolGames as game}
					<option value={game.type}>{game.title}</option>
				{/each}
			</select>
		</label>
		<label>
			Rules
			<select
				bind:value={selectedRules}
				class="bg-black h-10 py-2 px-3 rounded invalid:text-[#9ca3af]"
				required
			>
				{#each rules as rule}
					<option value={rule}>{rule}</option>
				{/each}
			</select>
		</label>
	</fieldset>
</Well>
