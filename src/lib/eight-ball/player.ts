import type { BallColorSpec } from '$lib/common/ball';

export class EightBallPlayer {
	constructor(
		readonly name: string,
		readonly handicap: number,
		readonly color: BallColorSpec
	) {}

	score = 0;
	safeties = 0;
	scoreRequired = 0;

	get progressPercent() {
		return this.score / this.scoreRequired;
	}
}
