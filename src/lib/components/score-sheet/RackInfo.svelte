<script lang="ts">
	export let rack;
	let isOpen = false;
	function toggle() {
		isOpen = !isOpen;
	}
</script>

<div>Innings: {rack.innings}</div>
<div>Timeouts used:</div>
<div>Deadballs: {rack.deadBallCount}</div>

<!-- <div>
	{#if isOpen}
		<div class="grid grid-cols-9 h-8" transition:slide>
			{#each rack.deadBalls as ball}
				<Ball {ball} />
			{/each}
		</div>
	{/if}
</div> -->
