import { browser } from '$app/environment';
import { NineBallGame, NineBallPlayer, NineBallRack } from '$lib';
import { redirect } from '@sveltejs/kit';

import { persisted } from 'svelte-persisted-store';
import { get } from 'svelte/store';

export async function load({ parent }) {
	const { game: setupGame } = await parent();
	const game = persisted<NineBallGame | null>('game', null, {
		storage: 'session',
		serializer: {
			parse: (str) => {
				const game: NineBallGame = Object.setPrototypeOf(JSON.parse(str), NineBallGame.prototype);
				game.players.forEach((player: NineBallPlayer) =>
					Object.setPrototypeOf(player, NineBallPlayer.prototype)
				);
				game.racks.forEach((rack) => Object.setPrototypeOf(rack, NineBallRack.prototype));
				return game;
			},
			stringify: JSON.stringify
		}
	});
	if (get(setupGame)) {
		game.set(get(setupGame));
	}
	const $game = get(game);
	if ($game) {
		makeGlobal($game);
	}
	if (browser && (!$game || $game.type !== '9ball')) {
		redirect(303, '/setup');
	}

	return { game };
}

function makeGlobal(game: NineBallGame) {
	if (!window || 'game' in window) return;
	Object.defineProperty(window, 'game', {
		get() {
			return game;
		}
	});
}
