import { NineBallGame, NineBallPlayer, NineBallRack } from '$lib';

import { persisted } from 'svelte-persisted-store';

export function load() {
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
	return { game };
}

export const ssr = false;
export const csr = true;
export const prerender = false;
