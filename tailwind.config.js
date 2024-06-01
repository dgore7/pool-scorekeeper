const balls = {
	'yellow-ball': '#FFB51E',
	'blue-ball': '#313389',
	'red-ball': '#C62627',
	'purple-ball': '#662D68',
	'orange-ball': '#EE7D2B',
	'green-ball': '#24762E',
	'maroon-ball': '#A02A2A',
	'black-ball': '#131313'
};

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				'dead-ball': 'rgb(75, 85, 105)',
				'dead-ball-stripe': 'rgb(100, 116, 139)',
				...balls
			}
		}
	},
	plugins: [],
	safelist: [
		{
			pattern: new RegExp(`(fill|bg)-(${Object.keys(balls).join('|')})`)
		}
	]
};
