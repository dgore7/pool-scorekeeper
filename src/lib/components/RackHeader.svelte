<script lang="ts">
	export let rack;
	export let rackNumber;
</script>

<div>Rack {rackNumber}:</div>
<div>Points per player: {rack.scores[0]}-{rack.scores[1]}</div>
