import { browser } from '$app/environment';
import { redirect } from '@sveltejs/kit';
import { get } from 'svelte/store';

export async function load({ parent }) {
	const { game } = await parent();
	const $game = get(game);

	if (browser && !$game) {
		throw redirect(303, '/setup');
	}
}
