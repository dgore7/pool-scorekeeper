// export const ssr = false
// export const prerender = false

import { writable } from 'svelte/store';
import { NineBallGame } from '$lib';
import type { ToastProps } from '$lib/components';

export function load() {
	const game = writable<NineBallGame | null>(null);
	const toast = writable<ToastProps | null>(null);
	return { game, toast };
}
