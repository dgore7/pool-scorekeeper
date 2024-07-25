import { describe, expect, it } from 'vitest';
import { EightBallGame } from '$lib/eight-ball';
import { Win, Lose, Miss, Safety, Timeout, AssignSide } from '$lib/eight-ball/actions';
import { EightBallPlayer } from '$lib/eight-ball/player';
import type { BallColorSpec } from '$lib/common/ball';

// we don't care about the actual color values for these tests
const red = {} as unknown as BallColorSpec;
const blue = {} as unknown as BallColorSpec;

describe('initialization', () => {
	it('a 6 vs 3 has a 5/2 race', () => {
		const testGame = new EightBallGame(
			new EightBallPlayer('Player1', 6, red),
			new EightBallPlayer('Player2', 3, blue)
		);
		expect(testGame.player1.scoreRequired).toBe(5);
		expect(testGame.player2.scoreRequired).toBe(2);
	});
});

describe('teamBallSelect', () => {
	it('Player1 claims stripes', () => {
		const testGame = new EightBallGame(
			new EightBallPlayer('Player1', 6, red),
			new EightBallPlayer('Player2', 3, blue)
		);

		testGame.doAction(new AssignSide('stripe'));
		expect(testGame.currentRack.assignmentBalls[0].isStripe).toBe(true);
	});

	it('Player1 claims stripes after misses', () => {
		const testGame = new EightBallGame(
			new EightBallPlayer('Player1', 6, red),
			new EightBallPlayer('Player2', 3, blue)
		);

		testGame.doAction(new Miss());
		testGame.doAction(new Miss());
		testGame.doAction(new AssignSide('stripe'));
		expect(testGame.currentRack.assignmentBalls[0].isStripe).toBe(true);
	});

	it('Player1 claims solids', () => {
		const testGame = new EightBallGame(
			new EightBallPlayer('Player1', 6, red),
			new EightBallPlayer('Player2', 3, blue)
		);

		testGame.doAction(new AssignSide('solid'));
		expect(testGame.currentRack.assignmentBalls[0].isStripe).toBe(false);
	});
});

describe('win', () => {
	it('player one wins', () => {
		const testGame = new EightBallGame(
			new EightBallPlayer('Player1', 7, red),
			new EightBallPlayer('Player2', 4, blue)
		);

		testGame.doAction(new AssignSide('stripe'));
		testGame.doAction(new Win('M8'));
		expect(testGame.currentPlayer.score).toBe(1);
		expect(testGame.racks.length).toBe(2);
	});

	it('player cannot win over expected amount', () => {
		const testGame = new EightBallGame(
			new EightBallPlayer('Player1', 7, red),
			new EightBallPlayer('Player2', 4, blue)
		);

		for (let i = 0; i < 9; i++) {
			testGame.doAction(new AssignSide('stripe'));
			testGame.doAction(new Win('BNR'));
		}

		expect(testGame.currentPlayer.score).toBe(5);
		expect(testGame.racks.length).toBe(5);
		expect(testGame.totalInnings).toBe(0);
	});
});

describe('lose', () => {
	it('player one loses', () => {
		const testGame = new EightBallGame(
			new EightBallPlayer('Player1', 7, red),
			new EightBallPlayer('Player2', 4, blue)
		);

		testGame.doAction(new AssignSide('stripe'));
		testGame.doAction(new Lose('E8'));
		expect(testGame.player1.score).toBe(0);
		expect(testGame.player2.score).toBe(1);
		expect(testGame.currentPlayer.score).toBe(1);
		expect(testGame.racks.length).toBe(2);
	});

	it('player cannot over lose', () => {
		const testGame = new EightBallGame(
			new EightBallPlayer('Player1', 7, red),
			new EightBallPlayer('Player2', 4, blue)
		);

		for (let i = 0; i < 7; i++) {
			testGame.doAction(new AssignSide('stripe'));
			testGame.doAction(new Lose('E8'));
			testGame.doAction(new Miss());
		}

		expect(testGame.player1.score).toBe(0);
		expect(testGame.player2.score).toBe(2);
		expect(testGame.racks.length).toBe(2);
	});
});

describe('switchTurn', () => {
	it('player one misses', () => {
		const testGame = new EightBallGame(
			new EightBallPlayer('Player1', 7, red),
			new EightBallPlayer('Player2', 4, blue)
		);

		testGame.doAction(new Miss());
		expect(testGame.currentRack.turn).toBe(1);
		expect(testGame.currentRack.innings).toBe(0);
	});

	it('both players miss', () => {
		const testGame = new EightBallGame(
			new EightBallPlayer('Player1', 7, red),
			new EightBallPlayer('Player2', 4, blue)
		);

		testGame.doAction(new Miss());
		testGame.doAction(new Miss());
		expect(testGame.currentRack.turn).toBe(0);
		expect(testGame.currentRack.innings).toBe(1);
	});
});

describe('safety', () => {
	it('Player1 does safety', () => {
		const testGame = new EightBallGame(
			new EightBallPlayer('Player1', 7, red),
			new EightBallPlayer('Player2', 4, blue)
		);

		testGame.doAction(new Safety());
		expect(testGame.currentPlayer.safeties).toBe(1);
	});
});

describe('timeout', () => {
	it('Player1 uses timeout', () => {
		const testGame = new EightBallGame(
			new EightBallPlayer('Player1', 7, red),
			new EightBallPlayer('Player2', 4, blue)
		);

		testGame.doAction(new Timeout());
		expect(testGame.currentRack.timeouts[0]).toBe(0);
	});

	it('Player1 uses timeout, wins, then new rack', () => {
		const testGame = new EightBallGame(
			new EightBallPlayer('Player1', 7, red),
			new EightBallPlayer('Player2', 4, blue)
		);

		testGame.doAction(new AssignSide('stripe'));
		testGame.doAction(new Timeout());
		testGame.doAction(new Win('BNR'));
		expect(testGame.currentRack.timeouts[0]).toBe(1);
	});
});
