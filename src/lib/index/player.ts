export class Player {
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
}

