import { redirect } from '@sveltejs/kit';

export function load() {
	redirect(304, '/setup');
}
