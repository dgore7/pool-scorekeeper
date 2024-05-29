export class Rack {
	innings = 0;
	scores = [0, 0];
	turn = 0;
	timeouts = [1, 1];

	constructor(turn: number) {
		this.turn = turn;
	}

	endTurn() {
		this.changeTurn();
		if (this.turn === 0) {
			this.innings++;
		}
	}

	unEndTurn() {
		this.changeTurn();
		if (this.turn === 1) {
			this.innings--;
		}
	}

	private changeTurn() {
		this.turn = (this.turn + 1) % 2;
	}

	increment() {
		this.scores[this.turn] += 1;
	}

	decrement() {
		this.scores[this.turn] -= 1;
	}

	useTimeout() {
		if (this.timeouts[this.turn]) {
			this.timeouts[this.turn]--;
		}
	}

	unUseTimeout() {
		//since you use a timeout while its a players turn, undoing actions should always lead to it being this.turn
		this.timeouts[this.turn]++;
	}
}
