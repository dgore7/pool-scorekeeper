<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Condition } from '$lib';

	const dispatch = createEventDispatcher<{
		submitDialog: Condition;
		cancelDialog: undefined;
	}>();

	export let message: string;
	export let conditions: Condition[];

	let selectedCondition: Condition | null = null;

	function handleSubmit() {
		dispatch('submitDialog', selectedCondition!);
	}

	function handleCancel() {
		dispatch('cancelDialog');
	}
</script>

<div
	class="toast-dialog fixed left-5 right-5 top-1/3 max-w-xl rounded-lg text-black bg-slate-300 z-10 flex flex-col items-center p-2"
>
	<h2 class="text-2xl">{message}</h2>
	{#each conditions as condition}
		<div>
			<input type="radio" id={condition.id} bind:group={selectedCondition} value={condition.id} />
			<label for={condition.id}>{condition.message}</label>
		</div>
	{/each}
	<div>
		<button
			on:click={handleSubmit}
			class="rounded-xl bg-emerald-400 p-4"
			disabled={selectedCondition === null}>Submit</button
		>
		<button on:click={handleCancel} class="rounded-xl p-4 bg-red-400">Cancel</button>
	</div>
</div>
