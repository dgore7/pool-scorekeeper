<script lang="ts">
	import '../app.css';
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

<div
	class="flex flex-col mx-auto max-w-xl landscape:max-w-none w-full h-dvh landscape:h- portrait:px-4"
>
	<Header />
	<main class="mb-auto flex flex-col flex-1 justify-between">
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
