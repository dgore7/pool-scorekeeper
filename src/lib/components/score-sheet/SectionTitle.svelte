<script lang="ts">
	import logo from '../../assets/logo.svg';
</script>

<div
	class="flex flex-col flex-grow gap-6 rounded-2xl justify-end overflow-hidden relative"
	
>
	<div id="title-splash" style:--splash="url({logo})" class="flex items-center p-2 justify-center">
		<h2 class="text-2xl p-2">
			<slot />
		</h2>
	</div>
</div>

<style>
	#title-splash::before {
		content: '';
		width: 100%;
		height: 100%;
		position: absolute;
		inset: 0;
		background-image: var(--splash);
		background-size: 15%;
		background-repeat: no-repeat;
		background-position: top 50% left 10%;
	}

	#title-splash {
		background-position: bottom, top;
		background-size: 100% 110%;
		background-repeat: no-repeat, no-repeat;
	}
</style>
