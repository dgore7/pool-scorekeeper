/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			backgroundColor: {
				'dead-ball': 'rgb(75, 85, 105)',
				'dead-ball-stripe': 'rgb(100, 116, 139)'
			}
		}
	},
	plugins: []
};
