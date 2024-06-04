export class BasePlayer {
	constructor(
		public name: string,
		public handicap: number,
		public color: string
	) {
		this.color = color;
	}

	score = 0;
	safeties = 0;
}
