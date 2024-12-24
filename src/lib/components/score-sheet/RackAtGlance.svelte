<script lang="ts">
	export let rack;
</script>

<div class="flex gap-4"> 
	<span>Rack Points: {rack.scores[0]}-{rack.scores[1]}</span>
	<span>Innings: {rack.innings}</span>
</div>