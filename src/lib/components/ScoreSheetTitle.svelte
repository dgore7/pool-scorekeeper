<script lang="ts">
	export let padding;
</script>

<div class="flex m-auto text-2xl w-full title {padding}">
	<slot />
</div>

<style>
	.title {
		border-bottom: 2px solid white;
	}
</style>
