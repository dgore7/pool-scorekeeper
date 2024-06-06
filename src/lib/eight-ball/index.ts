import type { EightBallPlayer } from '$lib/eight-ball/player';
import type { Action } from '$lib/eight-ball/actions';
import type { EndGameCase, BallType } from './types';
import type { BallModel } from '$lib/components/Ball.svelte';
export * from './actions';
export * from './player';
export * from './types';

type ScoreRequiredMatrix = number[][][];
const MIN_HANDICAP = 2;

// prettier-ignore
const APA_SCORE_REQUIRED: ScoreRequiredMatrix =[
 [[2,2],[2,3],[2,4],[2,5],[2,6],[2,7]],
 [[3,2],[2,2],[2,3],[2,4],[2,5],[2,6]],
 [[4,2],[3,2],[3,3],[3,4],[3,5],[2,5]],
 [[5,2],[4,2],[4,3],[4,4],[4,5],[3,5]],
 [[6,2],[5,2],[5,3],[5,4],[5,5],[4,5]],
 [[7,2],[6,2],[5,2],[5,3],[5,4],[5,5]],
]

class AssertionError extends Error {
	constructor(cause: string) {
		super('Assertion Error: ' + cause);
	}
}

export class EightBallGame {
	readonly type = '8ball';
	players: [EightBallPlayer, EightBallPlayer];
	winner: EightBallPlayer | null = null;
	actions: Action[] = [];
	racks: EightBallRack[] = [];
	undoneActions: Action[] = [];

	constructor(player1: EightBallPlayer, player2: EightBallPlayer) {
		this.players = [player1, player2];
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
		// prettier-ignore
		return APA_SCORE_REQUIRED[this.player1.handicap - MIN_HANDICAP][this.player2.handicap - MIN_HANDICAP];
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

	win(id: EndGameCase) {
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

	lose(id: EndGameCase) {
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

	assignSide(side: BallType) {
		if (side === 'solid') {
			this.assignSolid();
		} else {
			this.assignStripe();
		}
	}

	assignStripe() {
		if (this.currentRack.turn) {
			this.currentRack.playerBalls = ['solid', 'stripe'];
		} else {
			this.currentRack.playerBalls = ['stripe', 'solid'];
			this.currentRack.assignmentBalls.reverse();
		}
	}

	assignSolid() {
		if (this.currentRack.turn) {
			this.currentRack.playerBalls = ['stripe', 'solid'];
			this.currentRack.assignmentBalls.reverse();
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
			case 'LOSE':
				this.lose(action.id);
				break;
			case 'WIN':
				this.win(action.id);
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
			case 'ASSIGN_SIDE':
				this.assignSide(action.side);
				break;
			default:
				throw new AssertionError('unexpected action');
		}
		this.actions.push(action);
		// clear undone actions because history has been overridden
		this.undoneActions.length = 0;
	}
}

export class EightBallRack {
	innings = 0;
	scores = [0, 0];
	timeouts = [1, 1];
	endGameCase: EndGameCase | null = null;
	playerBalls: BallType[] | null[] = [null, null];
	assignmentBalls: BallModel[] = this.createBalls();
	winner: EightBallPlayer | null = null;

	constructor(
		public turn: number,
		readonly playerToBreak: EightBallPlayer
	) {}

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
		const ballHolder: BallModel[] = [];
		for (let i = 0; i < 2; i++) {
			const ball = {
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
