import { Ball } from '$lib/common/ball';
import type { Action, EndRack } from './actions';
import type { NineBallPlayer } from './player';

class AssertionError extends Error {
	constructor(cause: string) {
		super('Assertion Error: ' + cause);
	}
}

export class NineBallGame {
	readonly type = '9ball';
	players: [NineBallPlayer, NineBallPlayer];
	winner: NineBallPlayer | null = null;
	racks = [new NineBallRack(0)];
	actions: Action[] = [];
	undoneActions: Action[] = [];

	constructor(player1: NineBallPlayer, player2: NineBallPlayer) {
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
		this.racks.push(new NineBallRack(this.currentRack.turn));
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

	hasPlayerWon() {
		return this.currentPlayer.score === this.currentPlayer.scoreRequired;
	}

	killLeftOverBalls() {
		this.currentRack.leftOverBalls.forEach((ball) => {
			ball.isDead = true;
			this.currentRack.deadBallStack.push(ball.number);
		});
	}

	reviveLeftOverBalls() {
		this.currentRack.leftOverBalls.forEach((ball) => {
			ball.isDead = false;
			this.currentRack.deadBallStack.pop();
		});
	}

	pocketBall(ball: Ball) {
		if (this.hasPlayerWon()) {
			return;
		}

		ball.isPocketed = true;
		if (!ball.isDead) {
			if (ball.number === 9) {
				this.increment();
				this.killLeftOverBalls();
			}
			this.increment();
		}

		this.currentRack.pocketedBallStack.push(ball.number);
		if (this.hasPlayerWon()) {
			this.killLeftOverBalls();
		}
	}

	unPocketBall() {
		if (this.hasPlayerWon()) {
			this.reviveLeftOverBalls();
		}

		const ballNumberToRevive = this.currentRack.pocketedBallStack.pop();
		if (ballNumberToRevive) {
			const zombieBall = this.currentRack.getBall(ballNumberToRevive);
			zombieBall.isPocketed = false;

			if (!zombieBall.isDead) {
				if (zombieBall.number === 9) {
					this.decrement();
					this.reviveLeftOverBalls();
				}
				this.decrement();
			}
		}
	}

	killBall(ball: Ball) {
		ball.isDead = true;
		this.currentRack.deadBallStack.push(ball.number);

		if (!ball.isPocketed) {
			this.pocketBall(ball);
		}
	}

	unKillBall() {
		const ballNumberToRevive = this.currentRack.deadBallStack.pop();
		if (ballNumberToRevive) {
			const zombieBall = this.currentRack.getBall(ballNumberToRevive);
			if (!zombieBall.isPostKill) {
				this.unPocketBall();
			} else {
				this.increment();
			}

			// needs to happen AFTER unpPocketBall()
			zombieBall.isDead = false;
		}
	}

	undoAction(action: Action) {
		switch (action.type) {
			// undo and redo should never get here because they don't get pushed to either stack
			case 'DECREMENT':
				this.increment();
				break;
			case 'INCREMENT':
				this.unPocketBall();
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
			case 'DEAD_BALL':
			case 'POST_KILL':
				this.unKillBall();
				break;
			default:
				throw new AssertionError('unexpected action');
		}
		this.undoneActions.push(action);
	}

	doAction(action: Action, ball?: Ball) {
    if (action.type !== 'UNDO' && this.hasPlayerWon()) return
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
				this.unPocketBall();
				break;
			case 'INCREMENT':
				this.pocketBall(ball!);
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
			case 'DEAD_BALL':
				this.killBall(ball!);
				break;
			case 'POST_KILL':
				this.decrement();
				ball!.isPostKill = true;
				this.killBall(ball!);
				break;
			default:
				throw new AssertionError('unexpected action');
		}

		this.actions.push(action);
		// clear undone actions because history has been overridden
		this.undoneActions.length = 0;
	}
}

export class NineBallRack {
	static RACK_POINTS = 10;
	innings = 0;
	deadBallCount = 0;
	scores = [0, 0];
	turn = 0;
	timeouts = [1, 1];
	readonly gameBalls = this.createBalls();
	pocketedBallStack: number[] = [];
	deadBallStack: number[] = [];

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

	isRackOver() {
		const nineBall = this.gameBalls.at(-1);
		return !!nineBall?.isPocketed;
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

	unUseTimeout() {
		//since you use a timeout while its a players turn, undoing actions should always lead to it being this.turn
		this.timeouts[this.turn]++;
	}

	getBall(ballNumber: number) {
		return this.gameBalls.find((ball) => ball.number === ballNumber)!;
	}

	private createBalls() {
		const balls = [];

		for (let i = 0; i < 9; i++) {
			balls.push(Ball.fromIndex(i));
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
