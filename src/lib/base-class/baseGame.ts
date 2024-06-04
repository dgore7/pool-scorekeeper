import { BasePlayer } from './basePlayer';
import type { EightBallRack } from '$lib/eight-ball';
import type { NineBallRack } from '$lib/nine-ball';

class AssertionError extends Error {
	constructor(cause: string) {
		super('Assertion Error: ' + cause);
	}
}

export class BaseGame {
	players: [BasePlayer, BasePlayer];
	winner: BasePlayer | null = null;
	racks: EightBallRack[] | NineBallRack[] = [];

	constructor(player1: BasePlayer, player2: BasePlayer) {
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
}
