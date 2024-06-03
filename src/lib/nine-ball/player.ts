const APA_SCORE_REQUIRED = new Map([
	[1, 14],
	[2, 19],
	[3, 25],
	[4, 31],
	[5, 38],
	[6, 46],
	[7, 55],
	[8, 65],
	[9, 75]
]);

export class NineBallPlayer {
	constructor(name: string, handicap: number, color: string) {
		this.name = name;
		this.handicap = handicap;
		this.color = color;
	}

	name = '';
	color = '';
	score = 0;
	safeties = 0;
	handicap = 9;

	get scoreRequired() {
		return APA_SCORE_REQUIRED.get(this.handicap)!;
	}

	get progressPercent() {
		return this.score / this.scoreRequired;
	}
}
