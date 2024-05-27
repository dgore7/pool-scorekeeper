import { quintOut } from 'svelte/easing';
import { crossfade } from 'svelte/transition';

export const [send, receive] = crossfade({
	duration: 400,

	fallback(node) {
		const style = getComputedStyle(node);
		const transform = style.transform === 'none' ? '' : style.transform;

		return {
			duration: 400,
			easing: quintOut,
			css: (t) => `
				transform: ${transform};
				opacity: ${t};
			`
		};
	}
});
