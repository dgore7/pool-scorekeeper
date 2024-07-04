export class StraightPoolPlayer {
	constructor(name: string, scoreRequired: number, color: string) {
		this.name = name;
		this.scoreRequired = scoreRequired;
		this.color = color;
	}

	name = '';
	color = '';
	score = 0;
	safeties = 0;
	scoreRequired = 100;

	get progressPercent() {
		return this.score / this.scoreRequired;
	}
}
