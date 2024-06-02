export class Player {
	constructor(
		readonly name: string,
		readonly handicap: number,
		readonly color: string
	) {}

	score = 0;
	safeties = 0;
	scoreRequired = 0;

	get progressPercent() {
		return this.score / this.scoreRequired;
	}
}
