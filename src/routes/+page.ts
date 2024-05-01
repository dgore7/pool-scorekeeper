import { redirect } from '@sveltejs/kit';
import { get } from 'svelte/store';

export async function load({ parent }) {
	const { game } = await parent();
	const $game = get(game);

	if (
		!$game?.player1.name ||
		!$game?.player1.handicap ||
		!$game?.player2.name ||
		!$game?.player2.handicap
	) {
		throw redirect(303, '/setup');
	}
}
