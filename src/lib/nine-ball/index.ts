import type { Action } from './actions';
import { Player } from './player';

class AssertionError extends Error {
	constructor(cause: string) {
		super('Assertion Error: ' + cause);
	}
}

export class NineBallGame {
	players: [Player, Player] = [new Player(), new Player()];
	innings: number = 0;
	winner: Player | null = null;
	racks = [new NineBallRack()];
	actions: Action[] = [];
	undoneActions: Action[] = [];

	get currentRack() {
		const rack = this.racks.at(-1);
		if (!rack) throw new AssertionError('current rack should always be defined');
		return rack;
	}

	get currentPlayer() {
		return this.players[this.currentRack.turn];
	}

	endRack() {
		const additionalDeadBalls = this.currentRack.endRack();
		this.racks.push(new NineBallRack());
		return additionalDeadBalls;
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
		// TODO: switch case undo
		this.undoneActions.push(action);
	}

	doAction(action: Action) {
		switch (action.type) {
			case 'UNDO':
				const actionToUndo = this.undoneActions.pop();
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
			case 'MISS':
				this.currentRack.endTurn();
				break;
			case 'END_RACK':
				// save deadBalls for use in redo
				action.deadBalls = this.endRack();
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

	endTurn() {
		this.turn = (this.turn + 1) % 2;
		if (this.turn === 0) {
			this.innings++;
		}
	}

	// returns additional dead balls
	endRack() {
		const additional = NineBallRack.RACK_POINTS - this.deadBalls - this.total;
		this.deadBalls += additional;
		return additional;
	}

	increment() {
		this.scores[this.turn] += 1;
	}

	decrement() {
		this.scores[this.turn] -= 1;
	}

	get total() {
		return this.scores.reduce((a, b) => a + b);
	}
}

export * as Actions from './actions';
export * from './player';
