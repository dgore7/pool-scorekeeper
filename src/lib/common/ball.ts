export type BallColorSpec = {
	label: string;
	border: string;
	stroke: string;
	gradient: {
		stops: string[];
		from: string;
		to: string;
	};
};

export const BALL_COLORS: BallColorSpec[] = [
	{
		label: 'yellow',
		gradient: {
			stops: ['--yellow-ball', '--yellow-ball-2'],
			from: 'from-yellow-ball',
			to: 'to-yellow-ball-2'
		},
		border: 'border-yellow-ball',
		stroke: 'stroke-yellow-ball'
	},
	{
		label: 'blue',
		gradient: {
			stops: ['--blue-ball', '--blue-ball-2'],
			from: 'from-blue-ball',
			to: 'to-blue-ball-2'
		},
		border: 'border-blue-ball',
		stroke: 'stroke-blue-ball'
	},
	{
		label: 'red',
		gradient: {
			stops: ['--red-ball', '--red-ball-2'],
			from: 'from-red-ball',
			to: 'to-red-ball-2'
		},
		border: 'border-red-ball',
		stroke: 'stroke-red-ball'
	},
	{
		label: 'purple',
		gradient: {
			stops: ['--purple-ball', '--purple-ball-2'],
			from: 'from-purple-ball',
			to: 'to-purple-ball-2'
		},
		border: 'border-purple-ball',
		stroke: 'stroke-purple-ball'
	},
	{
		label: 'orange',
		gradient: {
			stops: ['--orange-ball', '--orange-ball-2'],
			from: 'from-orange-ball',
			to: 'to-orange-ball-2'
		},
		border: 'border-orange-ball',
		stroke: 'stroke-orange-ball'
	},
	{
		label: 'green',
		gradient: {
			stops: ['--green-ball', '--green-ball-2'],
			from: 'from-green-ball',
			to: 'to-green-ball-2'
		},
		border: 'border-green-ball',
		stroke: 'stroke-green-ball'
	},
	{
		label: 'maroon',
		gradient: {
			stops: ['--maroon-ball', '--maroon-ball-2'],
			from: 'from-maroon-ball',
			to: 'to-maroon-ball-2'
		},
		border: 'border-maroon-ball',
		stroke: 'stroke-maroon-ball'
	},
	{
		label: 'black',
		gradient: {
			stops: ['--black-ball', '--black-ball-2'],
			from: 'from-black-ball',
			to: 'to-black-ball-2'
		},
		border: 'border-black-ball',
		stroke: 'stroke-black-ball'
	}
];

export class Ball {
	static fromIndex(index: number) {
		return Ball.fromNumber(index + 1);
	}

	static fromNumber(number: number) {
		const colorSpec = BALL_COLORS[(number - 1) % BALL_COLORS.length];
		return new Ball(number, colorSpec, number >= 9, false, false, false);
	}

	private constructor(
		public number: number,
		public color: BallColorSpec,
		public isStripe: boolean,
		public isDead: boolean,
		public isPocketed: boolean,
		public isPostKill: boolean
	) {}
}
