<script lang="ts">
	import '../app.pcss';
	import { pwaInfo } from 'virtual:pwa-info';
	import Toast from '$lib/components/Toast.svelte';
	import Header from '$lib/components/Header.svelte';

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

<div class="flex flex-col h-full">
	<Header />
	<main class="container w-full py-4 px-4 mt-4 mb-auto mx-auto max-w-96 flex flex-col flex-1">
		{#if $toast}
			<Toast
				on:close={handleToastClose}
				message={$toast.message}
				icon={$toast.icon}
				class={$toast.class}
			/>
		{/if}
		<slot />
	</main>
</div>
