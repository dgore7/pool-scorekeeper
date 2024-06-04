import { writable } from 'svelte/store';

export default function statefulFade(initialState: string | null) {
	const state = writable(initialState);
	let nextState = initialState;

	function fadeTo(newState: string | null) {
		if (nextState === newState) {
			return;
		} else {
			nextState = newState;
			state.set(null);
		}
	}

	function fadeOut() {
		state.set(nextState);
	}

	return {
		state,
		fadeTo,
		fadeOut
	};
}
