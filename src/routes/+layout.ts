// export const ssr = false
// export const prerender = false
import { NineBallGame, NineBallPlayer, NineBallRack } from '$lib';
import { EightBallGame, EightBallRack, EightBallPlayer } from '$lib/eight-ball';
import type { ToastProps, DialogProps } from '$lib/components';
import { persisted } from 'svelte-persisted-store';
import { writable } from 'svelte/store';

export function load() {
	const dialog = persisted<DialogProps | null>('dialog', null, { storage: 'session' });
	const toastTime = writable<number>(0);
	const nineBallGame = persisted<NineBallGame | null>('game', null, {
		storage: 'session',
		serializer: {
			parse: (str) => {
				const game: NineBallGame = Object.setPrototypeOf(JSON.parse(str), NineBallGame.prototype);
				game.players.forEach((player: EightBallPlayer) =>
					Object.setPrototypeOf(player, EightBallPlayer.prototype)
				);
				game.racks.forEach((rack) => Object.setPrototypeOf(rack, EightBallRack.prototype));
				return game;
			},
			stringify: JSON.stringify
		}
	});
	const eightBallGame = persisted<EightBallGame | null>('game', null, {
		storage: 'session',
		serializer: {
			parse: (str) => {
				const game: EightBallGame = Object.setPrototypeOf(JSON.parse(str), EightBallGame.prototype);
				game.players.forEach((player: NineBallPlayer) =>
					Object.setPrototypeOf(player, NineBallPlayer.prototype)
				);
				game.racks.forEach((rack) => Object.setPrototypeOf(rack, NineBallRack.prototype));
				return game;
			},
			stringify: JSON.stringify
		}
	});
	const game = nineBallGame ? nineBallGame : eightBallGame;

	const toast = persisted<ToastProps | null>('toast', null, { storage: 'session' });
	return { game, toast, toastTime, dialog };
}

export const ssr = false;
export const csr = true;
export const prerender = false;
