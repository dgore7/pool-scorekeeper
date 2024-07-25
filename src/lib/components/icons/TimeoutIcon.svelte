<script lang="ts">
	type Variant = 'traced' | 'filled';

	let className = '';
	export { className as class };
	export let variant: Variant = 'traced';
</script>

{#if variant === 'traced'}
	<svg
		width="22"
		height="22"
		class={className}
		viewBox="0 0 22 22"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M11 5V11L15 13M21 11C21 16.5228 16.5228 21 11 21C5.47715 21 1 16.5228 1 11C1 5.47715 5.47715 1 11 1C16.5228 1 21 5.47715 21 11Z"
			stroke="#AFAFAA"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
	</svg>
{:else if variant === 'filled'}
	<svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path
			opacity="0.6"
			fill-rule="evenodd"
			clip-rule="evenodd"
			d="M0.914551 6C0.914551 2.68629 3.60084 0 6.91455 0C10.2283 0 12.9146 2.68629 12.9146 6C12.9146 9.31371 10.2283 12 6.91455 12C3.60084 12 0.914551 9.31371 0.914551 6ZM6.91455 1.63636C7.2158 1.63636 7.46001 1.88057 7.46001 2.18182V5.66289L9.85697 7.1197C10.1264 7.25442 10.2356 7.58206 10.1009 7.8515C9.96618 8.12095 9.63854 8.23016 9.3691 8.09544L6.67062 6.48787C6.48582 6.39547 6.3691 6.2066 6.3691 6V2.18182C6.3691 1.88057 6.6133 1.63636 6.91455 1.63636Z"
			fill="white"
		/>
	</svg>
{/if}
