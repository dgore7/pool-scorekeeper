import { EightBallGame, EightBallRack, EightBallPlayer } from '$lib/eight-ball';

import { persisted } from 'svelte-persisted-store';

export function load() {
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
	return { game };
}

export const ssr = false;
export const csr = true;
export const prerender = false;
