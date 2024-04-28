<script lang="ts">
	export let stage: number;

	function handleNext() {
		if (stage === 3) {
			stage = 0;
		} else {
			stage++;
		}
	}
</script>

<button on:click={handleNext}>
	{#if stage < 2}
		Next
	{:else if stage === 2}
		Start Game!
	{:else}
		End Game!
	{/if}
</button>

<style>
	button {
		border: 5px solid white;
		padding: 1em 2em;
	}

	button:hover {
		background-color: orange;
	}

	button:active {
		background-color: red;
	}
</style>
