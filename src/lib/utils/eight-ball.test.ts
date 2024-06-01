import { describe, expect, it } from 'vitest';
import { EightBallGame } from '$lib/eight-ball';
import { Win, Lose, Miss, Safety, Timeout, Undo, Stripe, Solid } from '$lib/eight-ball/actions';
import { Player } from '$lib/eight-ball/player';

const win = new Win();
const lose = new Lose();
const miss = new Miss();
const safety = new Safety();
const timeout = new Timeout();
const undo = new Undo();
const stripe = new Stripe();
const solid = new Solid();

describe('#initialization', () => {
	it('a 6 vs 3 has a 6/2 race', () => {
		const testGame = new EightBallGame(
			new Player('Player1', 6, 'red'),
			new Player('Player2', 3, 'blue')
		);
		expect(testGame.player1.scoreRequired).toBe(5);
		expect(testGame.player2.scoreRequired).toBe(2);
	});
});

describe('#teamBallSelect', () => {
	it('Player1 claims stripes', () => {
		const testGame = new EightBallGame(
			new Player('Player1', 6, 'red'),
			new Player('Player2', 3, 'blue')
		);

		testGame.doAction(stripe);
		expect(testGame.currentRack.assignmentBalls[0].number).toBe(9);
	});

	it('Player1 claims stripes after misses', () => {
		const testGame = new EightBallGame(
			new Player('Player1', 6, 'red'),
			new Player('Player2', 3, 'blue')
		);

		testGame.doAction(miss);
		testGame.doAction(miss);
		testGame.doAction(stripe);
		expect(testGame.currentRack.assignmentBalls[0].number).toBe(9);
	});

	it('Player1 claims solids', () => {
		const testGame = new EightBallGame(
			new Player('Player1', 6, 'red'),
			new Player('Player2', 3, 'blue')
		);

		testGame.doAction(solid);
		expect(testGame.currentRack.assignmentBalls[0].number).toBe(1);
	});
});

describe('#win', () => {
	it('player one wins', () => {
		const testGame = new EightBallGame(
			new Player('Player1', 7, 'red'),
			new Player('Player2', 4, 'blue')
		);

		testGame.doAction(stripe);
		testGame.doAction(win, 'M8');
		expect(testGame.currentPlayer.score).toBe(1);
		expect(testGame.racks.length).toBe(2);
	});

	it('player cannot win over expected amount', () => {
		const testGame = new EightBallGame(
			new Player('Player1', 7, 'red'),
			new Player('Player2', 4, 'blue')
		);

		for (let i = 0; i < 9; i++) {
			testGame.doAction(stripe);
			testGame.doAction(win, 'BNR');
		}

		expect(testGame.currentPlayer.score).toBe(5);
		expect(testGame.racks.length).toBe(5);
		expect(testGame.totalInnings).toBe(0);
	});
});

describe('#lose', () => {
	it('player one loses', () => {
		const testGame = new EightBallGame(
			new Player('Player1', 7, 'red'),
			new Player('Player2', 4, 'blue')
		);

		testGame.doAction(stripe);
		testGame.doAction(lose, 'E8');
		expect(testGame.player1.score).toBe(0);
		expect(testGame.player2.score).toBe(1);
		expect(testGame.currentPlayer.score).toBe(1);
		expect(testGame.racks.length).toBe(2);
	});

	it('player cannot over lose', () => {
		const testGame = new EightBallGame(
			new Player('Player1', 7, 'red'),
			new Player('Player2', 4, 'blue')
		);

		for (let i = 0; i < 7; i++) {
      testGame.doAction(stripe)
			testGame.doAction(lose, 'E8');
			testGame.doAction(miss);
		}

		expect(testGame.player1.score).toBe(0);
		expect(testGame.player2.score).toBe(2);
		expect(testGame.racks.length).toBe(2);
	});
});

describe('switchTurn', () => {
	it('player one misses', () => {
		const testGame = new EightBallGame(
			new Player('Player1', 7, 'red'),
			new Player('Player2', 4, 'blue')
		);

		testGame.doAction(miss);
		expect(testGame.currentRack.turn).toBe(1);
		expect(testGame.currentRack.innings).toBe(0);
	});

	it('both players miss', () => {
		const testGame = new EightBallGame(
			new Player('Player1', 7, 'red'),
			new Player('Player2', 4, 'blue')
		);

		testGame.doAction(miss);
		testGame.doAction(miss);
		expect(testGame.currentRack.turn).toBe(0);
		expect(testGame.currentRack.innings).toBe(1);
	});
});

describe('safety', () => {
	it('Player1 does safety', () => {
		const testGame = new EightBallGame(
			new Player('Player1', 7, 'red'),
			new Player('Player2', 4, 'blue')
		);

		testGame.doAction(safety);
		expect(testGame.currentPlayer.safeties).toBe(1);
	});
});

describe('timeout', () => {
	it('Player1 uses timeout', () => {
		const testGame = new EightBallGame(
			new Player('Player1', 7, 'red'),
			new Player('Player2', 4, 'blue')
		);

		testGame.doAction(timeout);
		expect(testGame.currentRack.timeouts[0]).toBe(0);
	});

	it('Player1 uses timeout, wins, then new rack', () => {
		const testGame = new EightBallGame(
			new Player('Player1', 7, 'red'),
			new Player('Player2', 4, 'blue')
		);

    testGame.doAction(stripe)
		testGame.doAction(timeout);
		testGame.doAction(win, 'BNR');
		expect(testGame.currentRack.timeouts[0]).toBe(1);
	});
});
