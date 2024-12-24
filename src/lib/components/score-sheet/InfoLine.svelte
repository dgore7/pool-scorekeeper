<script lang="ts">
	export let title: string;
	export let amount: string | number;
</script>

<div class="m-auto w-1/2 flex justify-between">
	<span>{title}:</span>
	<span>{amount}</span>
</div>
