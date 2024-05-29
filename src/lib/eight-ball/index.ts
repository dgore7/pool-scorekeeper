import type { Player } from '$lib/eight-ball/player';
import type { Action } from '$lib/eight-ball/actions';
import type { endGameCase, ballType } from './types';
import type { BallModel } from '$lib/components/Ball.svelte';

const APA_SCORE_REQUIRED: number[][][] = [];

class AssertionError extends Error {
	constructor(cause: string) {
		super('Assertion Error: ' + cause);
	}
}

export class EightBallGame {
	players: [Player, Player];
	winner: Player | null = null;
	actions: Action[] = [];
	racks: any[] = [];
	undoneActions: Action[] = [];

	constructor(player1: Player, player2: Player) {
		this.players = [player1, player2];
		this.createScoreMatrix();
		this.player1.scoreRequired = this.requiredScores[0];
		this.player2.scoreRequired = this.requiredScores[1];
		this.racks = [new EightBallRack(0, player1)];
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

	private get isScoreValidToIncrease() {
		return this.currentPlayer.score < this.requiredScores[this.currentRack.turn];
	}

	private get isScoreValidToDecrease() {
		return this.currentPlayer.score > 0;
	}

	private get requiredScores() {
		return APA_SCORE_REQUIRED[this.player1.handicap - 2][this.player2.handicap - 2];
	}

	endRack() {
		this.racks.push(new EightBallRack(this.currentRack.turn, this.currentPlayer));
	}

	unEndRack() {
		this.racks.pop();
	}

	increment() {
		this.currentPlayer.score++;
		this.currentRack.increment();
	}

	win(id: endGameCase) {
		if (this.isScoreValidToIncrease) {
			this.increment();
			this.currentRack.endGameCase = id;
			this.endRack();
		}
	}

	unWin() {
		if (this.isScoreValidToDecrease) {
			this.decrement();
			this.unEndRack();
			this.currentRack.endGameCase = null;
		}
	}

	lose(id: endGameCase) {
		this.currentRack.endTurn();
		this.win(id);
	}

	unLose() {
		this.unWin();
		this.currentRack.unEndTurn();
	}

	decrement() {
		this.currentPlayer.score--;
		this.currentRack.decrement();
	}

	assignStripe() {
		if (this.currentRack.turn) {
			this.currentRack.playerBalls = ['solid', 'stripe'];
		} else {
			this.currentRack.playerBalls = ['stripe', 'solid'];
			let ballToMove = this.currentRack.assignmentBalls.pop();
			this.currentRack.assignmentBalls.unshift(ballToMove);
		}
	}

	assignSolid() {
		if (this.currentRack.turn) {
			this.currentRack.playerBalls = ['stripe', 'solid'];
			let ballToMove = this.currentRack.assignmentBalls.pop();
			this.currentRack.assignmentBalls.unshift(ballToMove);
		} else {
			this.currentRack.playerBalls = ['solid', 'stripe'];
		}
	}

	undoAction(action: Action) {
		switch (action.type) {
			// undo and redo should never get here because they don't get pushed to either stack
			case 'WIN':
				this.unWin();
				break;
			case 'LOSE':
				this.unLose();
				break;
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

	doAction(action: Action, id?: endGameCase) {
		switch (action.type) {
			case 'UNDO':
				const actionToUndo = this.actions.pop();
				if (actionToUndo) this.undoAction(actionToUndo);
				return;
			case 'REDO':
				const actionToRedo = this.undoneActions.pop();
				if (actionToRedo) this.doAction(actionToRedo);
				return;
			case 'LOSE':
				this.lose(id!);
				break;
			case 'WIN':
				this.win(id!);
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
				this.endRack();
				break;
			case 'STRIPE':
				this.assignStripe();
				break;
			case 'SOLID':
				this.assignSolid();
				break;
			default:
				throw new AssertionError('unexpected action');
		}
		this.actions.push(action);
		// clear undone actions because history has been overridden
		this.undoneActions.length = 0;
	}

	private createScoreMatrix() {
		for (let i = 0; i < 6; i++) {
			APA_SCORE_REQUIRED[i] = [];
			for (let j = 0; j < 6; j++) {
				if (!i || !j) {
					APA_SCORE_REQUIRED[i][j] = [i + 2, j + 2];
				} else if ((i < 5 && j < 5) || i + j === 6) {
					APA_SCORE_REQUIRED[i][j] = [i + 1, j + 1];
				} else {
					APA_SCORE_REQUIRED[i][j] = [i, j];
				}
			}
		}
	}
}

export class EightBallRack {
	innings = 0;
	scores = [0, 0];
	turn = 0;
	timeouts = [1, 1];
	gameEndCase: endGameCase | null = null;
	playerBalls: ballType | null[] = [null, null];
	assignmentBalls: BallModel[] = this.createBalls();
	winner: Player | null = null;
	playerToBreak: Player | null = null;

	constructor(turn: number, player: Player) {
		this.turn = turn;
		this.playerToBreak = player;
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
		this.timeouts[this.turn]++;
	}

	private createBalls() {
		let ballHolder: BallModel[] = [];
		for (let i = 0; i < 2; i++) {
			let ball = {
				number: i === 0 ? 1 : 9,
				color: '#FFB51E',
				isStripe: i !== 0,
				isPocketed: false,
				isDead: false,
				isPostKill: false
			};
			ballHolder.push(ball);
		}
		return ballHolder;
	}
}
