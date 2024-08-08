// export const ssr = false
// export const prerender = false
import type { ToastProps, DialogProps } from '$lib/components';
import type { BarSizeType } from '$lib/types';
import { persisted } from 'svelte-persisted-store';
import { writable } from 'svelte/store';

export function load() {
	const dialog = persisted<DialogProps | null>('dialog', null, { storage: 'session' });
	const toastTime = writable<number>(0);
	const toast = persisted<ToastProps | null>('toast', null, { storage: 'session' });
	const barSize = persisted<BarSizeType>('barSize', 'h-2', { storage: 'session' });
	// eslint-disable-next-line
	const game = writable<any>(null);
	return { game, toast, toastTime, dialog, barSize };
}

export const ssr = false;
