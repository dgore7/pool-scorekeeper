<script lang="ts">
	export let name: string;
	export let ariaLabel;
	export let value: string | null;

	let isFocus = false;

	function handleFocus() {
		isFocus = true;
	}

	function handleBlur() {
		isFocus = false;
	}
</script>

<label class="relative flex">
	<div
		class="absolute text-[#DADADA] left-4 transition text-xs {value
			? 'top-1'
			: isFocus
				? 'top-1'
				: 'translate-x-2 translate-y-5 scale-[1.75]'}"
	>
		Name
	</div>
	<input
		type="text"
		{name}
		aria-label={ariaLabel}
		bind:value
		class="flex items-end bg-[#686870] bg-opacity-50 pt-6 pb-1 px-3 rounded-xl flex-grow"
		on:focus={handleFocus}
    on:blur={handleBlur}
	/>
</label>
