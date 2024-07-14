const balls = {
	'yellow-ball': 'var(--yellow-ball)',
	'yellow-ball-2': 'var(--yellow-ball-2)',
	'blue-ball': 'var(--blue-ball)',
	'blue-ball-2': 'var(--blue-ball-2)',
	'red-ball': 'var(--red-ball)',
	'red-ball-2': 'var(--red-ball-2)',
	'purple-ball': 'var(--purple-ball)',
	'purple-ball-2': 'var(--purple-ball-2)',
	'orange-ball': 'var(--orange-ball)',
	'orange-ball-2': 'var(--orange-ball-2)',
	'green-ball': 'var(--green-ball)',
	'green-ball-2': 'var(--green-ball-2)',
	'maroon-ball': 'var(--maroon-ball)',
	'maroon-ball-2': 'var(--maroon-ball-2)',
	'black-ball': 'var(--black-ball)',
	'black-ball-2': 'var(--black-ball-2)'
};

const borders = {
	'yellow-ball': 'var(--yellow-ball-stroke)',
	'blue-ball': 'var(--blue-ball-stroke)',
	'red-ball': 'var(--red-ball-stroke)',
	'purple-ball': 'var(--purple-ball-stroke)',
	'orange-ball': 'var(--orange-ball-stroke)',
	'green-ball': 'var(--green-ball-stroke)',
	'maroon-ball': 'var(--maroon-ball-stroke)',
	'black-ball': 'var(--black-ball-stroke)'
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
			},
			stroke: borders,
			borderColor: borders,
			textColor: {
				primary: '#FFFFFF',
				secondary: '#AFAFAA'
			},
			backgroundSize: {
				'1.5x': '150%'
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
