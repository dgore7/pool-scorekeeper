// export const ssr = false
// export const prerender = false

import { writable } from "svelte/store";
import { NineBallGame } from "$lib";

export function load() {

  const game = writable<NineBallGame | null>(null)
	return { game }
}
