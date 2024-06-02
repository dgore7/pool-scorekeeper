// export const ssr = false
// export const prerender = false
import { NineBallGame, Player, NineBallRack } from '$lib';
import type { ToastProps, DialogProps } from '$lib/components';
import { persisted } from 'svelte-persisted-store';
import { writable } from 'svelte/store';

export function load() {
	const dialog = persisted<DialogProps | null>('dialog', null, { storage: 'session' });
	const toastTime = writable<number>(0);
	const game = persisted<NineBallGame | null>('game', null, {
		storage: 'session',
		serializer: {
			parse: (str) => {
				const game: NineBallGame = Object.setPrototypeOf(JSON.parse(str), NineBallGame.prototype);
				game.players.forEach((player: Player) => Object.setPrototypeOf(player, Player.prototype));
				game.racks.forEach((rack) => Object.setPrototypeOf(rack, NineBallRack.prototype));
				return game;
			},
			stringify: JSON.stringify
		}
	});
	const toast = persisted<ToastProps | null>('toast', null, { storage: 'session' });
	return { game, toast, toastTime, dialog };
}

export const ssr = false;
export const csr = true;
export const prerender = false;
