<script lang="ts">
	import type { Game } from '$lib/types';
	import type { Writable } from 'svelte/store';
	import BackIcon from './icons/BackIcon.svelte';

	export let game: Writable<Game>;
</script>

<header class="flex h-14 text-[#afafaa] justify-between font-normal items-center portrait:hidden">
	<BackIcon />
	<span>
		{$game.currentPlayer.name}'s Turn
	</span>
</header>
