import { describe, expect, it } from 'vitest';
import { NineBallGame } from '$lib/nine-ball';
import { NineBallPlayer } from '$lib/nine-ball/player';
import {
	Safety,
	Miss,
	Increment,
	EndRack,
	Timeout,
	Undo,
	DeadBall,
	PostKill
} from '$lib/nine-ball/actions';
import type { BallColorSpec } from '$lib/common/ball';

// we don't care about the actual color values for these tests
const red = {} as unknown as BallColorSpec;
const blue = {} as unknown as BallColorSpec;

describe('pocketBall', () => {
	it('pocket one ball', () => {
		const testGame = new NineBallGame(
			new NineBallPlayer('Player1', 7, red),
			new NineBallPlayer('Player2', 6, blue)
		);
		testGame.doAction(new Increment(), testGame.currentRack.gameBalls[0]);
		expect(testGame.player1.score).toBe(1);
		expect(testGame.currentRack.pocketedBalls.length).toBe(1);
		expect(testGame.currentRack.deadBalls.length).toBe(0);
		expect(testGame.currentRack.scores[0]).toBe(1);
	});

	it('pocket nine ball', () => {
		const testGame = new NineBallGame(
			new NineBallPlayer('Player1', 7, red),
			new NineBallPlayer('Player2', 6, blue)
		);
		testGame.doAction(new Increment(), testGame.currentRack.gameBalls[8]);
		expect(testGame.player1.score).toBe(2);
		expect(testGame.currentRack.pocketedBalls.length).toBe(1);
		expect(testGame.currentRack.deadBalls.length).toBe(8);
		expect(testGame.currentRack.scores[0]).toBe(2);
	});

	it('pocket more than required score to win', () => {
		const testGame = new NineBallGame(
			new NineBallPlayer('Player1', 1, red),
			new NineBallPlayer('Player2', 6, blue)
		);
		for (let i = 0; i < 9; i++) {
			testGame.doAction(new Increment(), testGame.currentRack.gameBalls[i]);
		}

		expect(testGame.player1.score).toBe(10);
		expect(testGame.currentRack.pocketedBalls.length).toBe(9);
		expect(testGame.currentRack.deadBalls.length).toBe(0);
		expect(testGame.currentRack.scores[0]).toBe(10);

		testGame.doAction(new EndRack());

		for (let j = 0; j < 9; j++) {
			testGame.doAction(new Increment(), testGame.currentRack.gameBalls[j]);
		}
		expect(testGame.player1.score).toBe(14);
		expect(testGame.currentRack.pocketedBalls.length).toBe(4);
		expect(testGame.currentRack.deadBalls.length).toBe(5);
		expect(testGame.currentRack.scores[0]).toBe(4);
	});

	it('both players pocket balls', () => {
		const testGame = new NineBallGame(
			new NineBallPlayer('Player1', 1, red),
			new NineBallPlayer('Player2', 6, blue)
		);

		for (let i = 0; i < 3; i++) {
			testGame.doAction(new Increment(), testGame.currentRack.gameBalls[i]);
		}
		expect(testGame.player1.score).toBe(3);
		expect(testGame.player2.score).toBe(0);
		expect(testGame.currentRack.pocketedBalls.length).toBe(3);
		expect(testGame.currentRack.deadBalls.length).toBe(0);
		expect(testGame.currentRack.scores[0]).toBe(3);
		expect(testGame.currentRack.scores[1]).toBe(0);

		testGame.doAction(new Miss());

		for (let j = 0; j < 3; j++) {
			testGame.doAction(new Increment(), testGame.currentRack.gameBalls[j]);
		}

		expect(testGame.player1.score).toBe(3);
		expect(testGame.player2.score).toBe(3);
		expect(testGame.currentRack.pocketedBalls.length).toBe(6);
		expect(testGame.currentRack.deadBalls.length).toBe(0);
		expect(testGame.currentRack.scores[0]).toBe(3);
		expect(testGame.currentRack.scores[1]).toBe(3);
	});
});

describe('unPocketBalls', () => {
	it('player unPockets pocketed ball', () => {
		const testGame = new NineBallGame(
			new NineBallPlayer('Player1', 7, red),
			new NineBallPlayer('Player2', 6, blue)
		);
		testGame.doAction(new Increment(), testGame.currentRack.gameBalls[0]);
		expect(testGame.player1.score).toBe(1);
		expect(testGame.currentRack.pocketedBalls.length).toBe(1);
		expect(testGame.currentRack.deadBalls.length).toBe(0);
		expect(testGame.currentRack.scores[0]).toBe(1);

		testGame.doAction(new Undo());

		expect(testGame.player1.score).toBe(0);
		expect(testGame.currentRack.pocketedBalls.length).toBe(0);
		expect(testGame.currentRack.deadBalls.length).toBe(0);
		expect(testGame.currentRack.scores[0]).toBe(0);
	});

	it('player unPockets nine ball', () => {
		const testGame = new NineBallGame(
			new NineBallPlayer('Player1', 7, red),
			new NineBallPlayer('Player2', 6, blue)
		);
		testGame.doAction(new Increment(), testGame.currentRack.gameBalls[8]);
		expect(testGame.player1.score).toBe(2);
		expect(testGame.currentRack.pocketedBalls.length).toBe(1);
		expect(testGame.currentRack.deadBalls.length).toBe(8);
		expect(testGame.currentRack.scores[0]).toBe(2);

		testGame.doAction(new Undo());

		expect(testGame.player1.score).toBe(0);
		expect(testGame.currentRack.pocketedBalls.length).toBe(0);
		expect(testGame.currentRack.deadBalls.length).toBe(0);
		expect(testGame.currentRack.scores[0]).toBe(0);
	});

	it('player unPockets winning ball', () => {
		const testGame = new NineBallGame(
			new NineBallPlayer('Player1', 1, red),
			new NineBallPlayer('Player2', 6, blue)
		);
		for (let i = 0; i < 9; i++) {
			testGame.doAction(new Increment(), testGame.currentRack.gameBalls[i]);
		}

		testGame.doAction(new EndRack());

		for (let j = 0; j < 9; j++) {
			testGame.doAction(new Increment(), testGame.currentRack.gameBalls[j]);
		}

		testGame.doAction(new Undo());

		expect(testGame.player1.score).toBe(13);
		expect(testGame.currentRack.pocketedBalls.length).toBe(3);
		expect(testGame.currentRack.deadBalls.length).toBe(0);
		expect(testGame.currentRack.scores[0]).toBe(3);
	});
});

describe('switchTurn', () => {
	it('player one misses first turn', () => {
		const testGame = new NineBallGame(
			new NineBallPlayer('Player1', 7, red),
			new NineBallPlayer('Player2', 6, blue)
		);
		testGame.doAction(new Miss());
		expect(testGame.currentRack.turn).toBe(1);
		expect(testGame.currentRack.innings).toBe(0);
	});

	it('both players miss first turn', () => {
		const testGame = new NineBallGame(
			new NineBallPlayer('Player1', 7, red),
			new NineBallPlayer('Player2', 6, blue)
		);
		testGame.doAction(new Miss());
		testGame.doAction(new Miss());
		expect(testGame.currentRack.turn).toBe(0);
		expect(testGame.currentRack.innings).toBe(1);
	});

	it("undo Player2's endTurn", () => {
		const testGame = new NineBallGame(
			new NineBallPlayer('Player1', 7, red),
			new NineBallPlayer('Player2', 6, blue)
		);
		testGame.doAction(new Miss());
		testGame.doAction(new Miss());
		testGame.doAction(new Undo());
		expect(testGame.currentRack.turn).toBe(1);
		expect(testGame.currentRack.innings).toBe(0);
	});
});

describe('killBall', () => {
	it('player makes one ball and kills one ball', () => {
		const testGame = new NineBallGame(
			new NineBallPlayer('Player1', 7, red),
			new NineBallPlayer('Player2', 6, blue)
		);
		testGame.doAction(new Increment(), testGame.currentRack.gameBalls[0]);
		testGame.doAction(new DeadBall(), testGame.currentRack.gameBalls[1]);
		expect(testGame.player1.score).toBe(1);
		expect(testGame.currentRack.deadBalls.length).toBe(1);
	});

	it('player makes one ball then kills it postmortem', () => {
		const testGame = new NineBallGame(
			new NineBallPlayer('Player1', 7, red),
			new NineBallPlayer('Player2', 6, blue)
		);
		testGame.doAction(new Increment(), testGame.currentRack.gameBalls[0]);
		testGame.doAction(new PostKill(), testGame.currentRack.gameBalls[0]);
		expect(testGame.player1.score).toBe(0);
		expect(testGame.currentRack.deadBalls.length).toBe(1);
	});
});

describe('reviveBall', () => {
	it('player kills one ball by accident and brings it back', () => {
		const testGame = new NineBallGame(
			new NineBallPlayer('Player1', 7, red),
			new NineBallPlayer('Player2', 6, blue)
		);
		testGame.doAction(new DeadBall(), testGame.currentRack.gameBalls[1]);
		testGame.doAction(new Undo());
		expect(testGame.currentRack.deadBalls.length).toBe(0);
		expect(testGame.currentRack.pocketedBalls.length).toBe(0);
	});

	it('player makes one ball, kills it by accident, and unKills it (leaving it pocketed) ', () => {
		const testGame = new NineBallGame(
			new NineBallPlayer('Player1', 7, red),
			new NineBallPlayer('Player2', 6, blue)
		);
		testGame.doAction(new Increment(), testGame.currentRack.gameBalls[1]);
		testGame.doAction(new PostKill(), testGame.currentRack.gameBalls[1]);
		testGame.doAction(new Undo());
		expect(testGame.player1.score).toBe(1);
		expect(testGame.currentRack.deadBalls.length).toBe(0);
		expect(testGame.currentRack.pocketedBalls.length).toBe(1);
	});
});

describe('safety', () => {
	it('player does a safety', () => {
		const testGame = new NineBallGame(
			new NineBallPlayer('Player1', 7, red),
			new NineBallPlayer('Player2', 6, blue)
		);
		testGame.doAction(new Safety());
		expect(testGame.currentPlayer.safeties).toBe(1);
	});

	it('player undoes safety', () => {
		const testGame = new NineBallGame(
			new NineBallPlayer('Player1', 7, red),
			new NineBallPlayer('Player2', 6, blue)
		);
		testGame.doAction(new Safety());
		testGame.doAction(new Undo());
		expect(testGame.currentPlayer.safeties).toBe(0);
	});
});

describe('timeout', () => {
	it('player uses timeout', () => {
		const testGame = new NineBallGame(
			new NineBallPlayer('Player1', 7, red),
			new NineBallPlayer('Player2', 6, blue)
		);
		testGame.doAction(new Timeout());
		expect(testGame.currentRack.timeouts[0]).toBe(0);
	});
	it('player uses timeout, then starts a new rack', () => {
		const testGame = new NineBallGame(
			new NineBallPlayer('Player1', 7, red),
			new NineBallPlayer('Player2', 6, blue)
		);
		testGame.doAction(new Timeout());
		testGame.doAction(new EndRack());
		expect(testGame.currentRack.timeouts[0]).toBe(1);
	});
});
