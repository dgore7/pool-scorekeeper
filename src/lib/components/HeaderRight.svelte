<script lang="ts">
	import type { Writable } from 'svelte/store';
	import Hamburger from './Hamburger.svelte';
	import type { Game } from '$lib/types';

	export let game: Writable<Game>;
</script>

<div class="flex h-14 text-[#afafaa] font-normal items-center justify-between portrait:hidden">
	<div>
		Innings: {$game.totalInnings}
	</div>
	<div class="flex items-center justify-center w-20">
		<Hamburger />
	</div>
</div>
