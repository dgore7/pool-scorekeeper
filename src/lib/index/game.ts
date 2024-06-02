import { EightBallRack } from '$lib/eight-ball';
import { NineBallGame } from '$lib/nine-ball';
import type { Player } from '$lib/index/player';
import type { Action } from '$lib/nine-ball/actions';

class AssertionError extends Error {
	constructor(cause: string) {
		super('Assertion Error: ' + cause);
	}
}

export class Game {
	players: [Player, Player];
	winner: Player | null = null;
	actions: Action[] = [];
	racks: any[] = [];
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

	endRack(rack: any) {
		this.racks.push(rack(this.currentRack.turn));
	}

	unEndRack() {
		this.racks.pop();
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
			case 'SAFETY':
				this.currentPlayer.safeties--;
				break;
			case 'MISS':
				this.currentRack.unEndTurn();
				break;
			case 'END_RACK':
				this.unEndRack();
				break;
			case 'TIMEOUT':
				this.currentRack.unUseTimeout();
				break;
			default:
				throw new AssertionError('unexpected action');
		}
		this.undoneActions.push(action);
	}
}
