import type { Action, EndRack } from './actions';
import type { Player } from './player';
import type { BallModel } from '$lib/components/Ball.svelte';

class AssertionError extends Error {
	constructor(cause: string) {
		super('Assertion Error: ' + cause);
	}
}

export class NineBallGame {
	players: [Player, Player];
	winner: Player | null = null;
	racks = [new NineBallRack(0)];
	actions: Action[] = [];
	undoneActions: Action[] = [];

	constructor(player1: Player, player2: Player) {
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

	endRack(turn: number) {
		const additionalDeadBalls = this.currentRack.endRack();
		this.racks.push(new NineBallRack(turn));
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
		this.currentPlayer.score--;
		this.currentRack.decrement();
	}

	undoAction(action: Action) {
		switch (action.type) {
			// undo and redo should never get here because they don't get pushed to either stack
			case 'DECREMENT':
				this.increment();
				break;
			case 'INCREMENT':
				this.decrement();
				this.currentRack.unpocketBall();
				break;
			case 'DOUBLE_INCREMENT':
				this.decrement();
				this.decrement();
				this.currentRack.unpocketBall();
				break;
			case 'DOUBLE_DECREMENT':
				this.increment();
				this.increment();
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
			default:
				throw new AssertionError('unexpected action');
		}
		this.undoneActions.push(action);
	}

	doAction(action: Action, turn?: number) {
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
				this.decrement();
				break;
			case 'INCREMENT':
				this.increment();
				break;
			case 'DOUBLE_INCREMENT':
				this.increment();
				this.increment();
				break;
			case 'DOUBLE_DECREMENT':
				this.decrement();
				this.decrement();
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
				action.deadBallCount = this.endRack(turn!);
				break;
			default:
				throw new AssertionError('unexpected action');
		}
		this.actions.push(action);
		// clear undone actions because history has been overridden
		this.undoneActions.length = 0;
	}
}

class NineBallRack {
	static RACK_POINTS = 10;
	innings = 0;
	deadBallCount = 0;
	scores = [0, 0];
	turn = 0;
	timeouts = [1, 1];
	liveBalls = this.createBalls();
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
		const additional = NineBallRack.RACK_POINTS - this.deadBallCount - this.total;
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

	unpocketBall() {
		if (this.pocketedBalls.length) {
			const zombieBall = this.pocketedBalls.pop();
			zombieBall!.isPocketed = false;
		}
	}

	private createBalls() {
		const balls = [];
		const colors: string[] = [
			'yellow',
			'blue',
			'red',
			'purple',
			'orange',
			'green',
			'brown',
			'black'
		];
		for (let i = 0; i < 15; i++) {
			const ball: BallModel = {
				number: i + 1,
				color: colors[i % colors.length],
				isStripe: i >= 8,
				isDead: false,
				isPocketed: false
			};
			balls.push(ball);
		}
		return balls;
	}

	get total() {
		return this.scores.reduce((a, b) => a + b);
	}
}

export * as Actions from './actions';
export * from './player';
