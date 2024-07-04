<script>
	import logo from '$lib/assets/brand.svg';
	import Hamburger from './Hamburger.svelte';
</script>

<div class="grid grid-cols-4 place-items-center max-w-[600px] m-auto relative">
	<div class="col-span-1"></div>
	<img src={logo} alt="rack em up" class="my-2 col-span-2" />
	<div>
		<Hamburger />
	</div>
</div>
