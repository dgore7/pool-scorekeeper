<script lang="ts">
	export let player: string;
	export let playerNumber: number;
	export let selectedRules: string;

	const apaSkills = [1, 2, 3, 4, 5, 6, 7, 8, 9]
</script>

	<div>
		<label>
				Player {playerNumber}
					<input type="text" bind:value={player}/>	
		</label>
		<label>
			Skill Level

			{#if selectedRules === "APA"}
			<select>
				{#each apaSkills as skill}
					<option value={skill}>{skill}</option>
				{/each}
			</select>
			{:else}
			<input type="number"/>
			{/if}
		</label>
	</div>

<style></style>