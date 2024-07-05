// export const ssr = false
// export const prerender = false
import type { ToastProps, DialogProps } from '$lib/components';
import { persisted } from 'svelte-persisted-store';
import { writable } from 'svelte/store';

export function load() {
	const dialog = persisted<DialogProps | null>('dialog', null, { storage: 'session' });
	const toastTime = writable<number>(0);
	const toast = persisted<ToastProps | null>('toast', null, { storage: 'session' });
	// eslint-disable-next-line
	const game = writable<any>(null);
	return { game, toast, toastTime, dialog };
}

export const ssr = false