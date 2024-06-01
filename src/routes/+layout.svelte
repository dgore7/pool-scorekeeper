<script lang="ts">
	import '../app.pcss';
	import { pwaInfo } from 'virtual:pwa-info';
	import Toast from '$lib/components/Toast.svelte';

	$: webManifestLink = pwaInfo ? pwaInfo.webManifest.linkTag : '';

	export let data;
	let toastInt: NodeJS.Timeout;

	const { toast, toastTime } = data;

	$: if ($toast && $toastTime) {
		toastInt = setTimeout(() => {
			$toast = null;
		}, $toastTime);
	}

	function handleToastClose() {
		$toast = null;
		clearTimeout(toastInt);
	}
</script>

<svelte:head>
	{@html webManifestLink}
</svelte:head>

<div class="container w-full h-full py-4 flex flex-col">
	{#if $toast}
		<Toast
			on:close={handleToastClose}
			message={$toast.message}
			icon={$toast.icon}
			class={$toast.class}
		/>
	{/if}
	<slot />
</div>
