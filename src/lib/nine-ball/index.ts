import type { Action, EndRack } from './actions';
import type { Player } from './player';

class AssertionError extends Error {
	constructor(cause: string) {
		super('Assertion Error: ' + cause);
	}
}

export class NineBallGame {
	players: [Player, Player];
	winner: Player | null = null;
	racks = [new NineBallRack()];
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

	endRack() {
		this.increment();
		this.increment();
		const additionalDeadBalls = this.currentRack.endRack();
		this.racks.push(new NineBallRack());
		return additionalDeadBalls;
	}

	unEndRack(action: EndRack) {
		this.decrement();
		this.decrement();
		this.racks.pop();
		this.currentRack.unEndRack(action.deadBalls);
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
				this.decrement();
				break;
			case 'INCREMENT':
				this.increment();
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
				action.deadBalls = this.endRack();
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
	deadBalls = 0;
	scores = [0, 0];
	turn = 0;
	timeouts = [1, 1];

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
		const additional = NineBallRack.RACK_POINTS - this.deadBalls - this.total;
		this.deadBalls += additional;
		return additional;
	}

	unEndRack(deadBallsToRestore: number) {
		this.deadBalls -= deadBallsToRestore;
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

	get total() {
		return this.scores.reduce((a, b) => a + b);
	}
}

export * as Actions from './actions';
export * from './player';
