import type { Action, EndRack } from './actions';
import type { StraightPoolPlayer } from './player';
import type { BallModel } from '$lib/components/Ball.svelte';

class AssertionError extends Error {
	constructor(cause: string) {
		super('Assertion Error: ' + cause);
	}
}

const BALL_COLORS: string[] = [
	'yellow',
	'blue',
	'red',
	'purple',
	'orange',
	'green',
	'maroon',
	'black'
];

export class StraightPoolGame {
	readonly type = 'straightPool';
	players: [StraightPoolPlayer, StraightPoolPlayer];
	winner: StraightPoolPlayer | null = null;
	racks = [new StraightPoolRack(0)];
	actions: Action[] = [];
	undoneActions: Action[] = [];

	constructor(player1: StraightPoolPlayer, player2: StraightPoolPlayer) {
		this.players = [player1, player2];
	}

	get player1() {
		return this.players[0];
	}

	get player2() {
		return this.players[1];
	}

	get totalInnings() {
		return this.racks.reduce((n, { innings }) => n + innings, 0);
	}

	get currentRack() {
		const rack = this.racks.at(-1);
		if (!rack) throw new AssertionError('current rack should always be defined');
		return rack;
	}

	get currentPlayer() {
		return this.players[this.currentRack.turn];
	}

	get previousPlayer() {
		const prevPlayer = this.currentRack.turn === 0 ? 1 : 0;
		return this.players[prevPlayer];
	}

	endRack() {
		const additionalDeadBalls = this.currentRack.endRack();
		this.racks.push(new StraightPoolRack(this.currentRack.turn));
		return additionalDeadBalls;
	}

	unEndRack(action: EndRack) {
		this.racks.pop();
		this.currentRack.unEndRack(action.deadBallCount);
	}

	increment() {
		this.currentPlayer.score++;
		this.currentRack.increment();
	}

	decrement() {
		if (this.currentPlayer.score) {
			this.currentPlayer.score--;
			this.currentRack.decrement();
		}
	}


	undoAction(action: Action) {
		switch (action.type) {
			// undo and redo should never get here because they don't get pushed to either stack
			case 'DECREMENT':
				this.increment();
				break;
			case 'INCREMENT':
				this.decrement()
				break;
			case 'SAFETY':
				this.currentPlayer.safeties--;
				break;
			case 'MISS':
				this.currentRack.unEndTurn();
				break;
			case 'END_RACK':
				// save deadBalls for use in redo
				this.unEndRack(action);
				break;
			case 'TIMEOUT':
				this.currentRack.unUseTimeout();
				break;
			default:
				throw new AssertionError('unexpected action');
		}
		this.undoneActions.push(action);
	}

	doAction(action: Action) {
		switch (action.type) {
			case 'UNDO':
				const actionToUndo = this.actions.pop();
				if (actionToUndo) this.undoAction(actionToUndo);
				return;
			case 'REDO':
				const actionToRedo = this.undoneActions.pop();
				if (actionToRedo) this.doAction(actionToRedo);
				return;
			case 'DECREMENT':
				this.decrement()
				break;
			case 'INCREMENT':
				this.increment()
				break;
			case 'SAFETY':
				this.currentPlayer.safeties++;
				break;
			case 'MISS':
				this.currentRack.endTurn();
				break;
			case 'TIMEOUT':
				this.currentRack.useTimeout();
				break;
			case 'END_RACK':
				// save deadBalls for use in redo
				action.deadBallCount = this.endRack();
				break;
			default:
				throw new AssertionError('unexpected action');
		}
		this.actions.push(action);
		// clear undone actions because history has been overridden
		this.undoneActions.length = 0;
	}
}

export class StraightPoolRack {
	static RACK_POINTS = 10;
	innings = 0;
	deadBallCount = 0;
	scores = [0, 0];
	turn = 0;
	timeouts = [1, 1];
	gameBalls = this.createBalls();
	pocketedBalls: BallModel[] = [];
	deadBalls: BallModel[] = [];

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

	// returns additional dead balls
	endRack() {
		const additional = StraightPoolRack.RACK_POINTS - this.deadBallCount - this.total;
		this.deadBallCount += additional;
		return additional;
	}

	unEndRack(deadBallsToRestore: number) {
		this.deadBallCount -= deadBallsToRestore;
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

	private createBalls() {
		const balls = [];

		for (let i = 0; i < 9; i++) {
			const ball: BallModel = {
				number: i + 1,
				color: BALL_COLORS[i % BALL_COLORS.length],
				isStripe: i >= 8,
				isDead: false,
				isPocketed: false,
				isPostKill: false
			};
			balls.push(ball);
		}
		return balls;
	}

	get total() {
		return this.scores.reduce((a, b) => a + b);
	}

	get leftOverBalls() {
		return this.gameBalls.filter((ball) => !ball.isPocketed);
	}
}

export * as Actions from './actions';
export * from './player';
