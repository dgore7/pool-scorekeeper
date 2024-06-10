import { browser } from '$app/environment';
import { EightBallGame, EightBallRack, EightBallPlayer } from '$lib/eight-ball';
import { redirect } from '@sveltejs/kit';

import { persisted } from 'svelte-persisted-store';
import { get } from 'svelte/store';

export async function load({ parent }) {
	const { game: setupGame } = await parent();
	const game = persisted<EightBallGame | null>('game', null, {
		storage: 'session',
		serializer: {
			parse: (str) => {
				const game: EightBallGame = Object.setPrototypeOf(JSON.parse(str), EightBallGame.prototype);
				game.players.forEach((player: EightBallPlayer) =>
					Object.setPrototypeOf(player, EightBallPlayer.prototype)
				);
				game.racks.forEach((rack) => Object.setPrototypeOf(rack, EightBallRack.prototype));
				return game;
			},
			stringify: JSON.stringify
		}
	});
	if (get(setupGame)) {
		game.set(get(setupGame));
	}
	const $game = get(game);
	console.log($game);
	if (browser && (!$game || $game.type !== '8ball')) {
		redirect(303, '/setup');
	}
	return { game };
}
