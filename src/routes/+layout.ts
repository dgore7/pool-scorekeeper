// export const ssr = false
// export const prerender = false
import type { NineBallGame } from '$lib';
import type { ToastProps } from '$lib/components';
import { persisted } from 'svelte-persisted-store';

export function load() {
	const game = persisted<NineBallGame | null>('game', null, { storage: 'session' });
	const toast = persisted<ToastProps | null>('toast', null, { storage: 'session' });
	return { game, toast };
}

export const ssr = false;
export const prerender = false;
