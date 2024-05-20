<script>
	import '../app.pcss';
	import { pwaInfo } from 'virtual:pwa-info';

	$: webManifestLink = pwaInfo ? pwaInfo.webManifest.linkTag : '';
</script>

<svelte:head>
	{@html webManifestLink}
</svelte:head>

<div class="container m-auto max-w-xl h-full my-4">
	<slot />
</div>
