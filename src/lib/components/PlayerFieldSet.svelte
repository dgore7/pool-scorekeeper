<script lang="ts">
	import Well from './Well.svelte';
	import startcase from 'lodash.startcase';
	export let name: 'player-one' | 'player-two';
</script>

<Well>
	<fieldset class="flex flex-col gap-4" {name}>
		<legend class="mb-1.5">{startcase(name)}</legend>
		<input
			type="text"
			name="name"
			aria-label="name"
			class="bg-black h-10 py-2 px-3 rounded"
			placeholder="name"
		/>
		<select
			name="handicap"
			aria-label="handicap"
			class="bg-black h-10 py-2 px-3 rounded invalid:text-[#9ca3af]"
			required
		>
			<option disabled selected value class="hidden">handicap</option>
			<option value="1">1</option>
			<option value="1">1</option>
			<option value="2">2</option>
			<option value="3">3</option>
			<option value="4">4</option>
			<option value="5">5</option>
			<option value="6">6</option>
			<option value="7">7</option>
			<option value="8">8</option>
			<option value="9">9</option>
		</select>
	</fieldset>
</Well>

<style>
	select {
		-moz-appearance: none; /* Firefox */
		-webkit-appearance: none; /* Safari and Chrome */
		appearance: none;
	}
</style>
