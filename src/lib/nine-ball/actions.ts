interface IIncrement {
	type: 'INCREMENT';
}

interface IDecrement {
	type: 'DECREMENT';
}

interface ISafety {
	type: 'SAFETY';
}

interface IMiss {
	readonly type: 'MISS';
	readonly deadBallCount: number;
}

interface IEndRack {
	type: 'END_RACK';
	deadBallCount: number;
}

interface IUndo {
	type: 'UNDO';
}

interface IRedo {
	type: 'REDO';
}

interface ITimeOut {
	type: 'TIMEOUT';
}

interface IDeadBall {
	type: 'DEAD_BALL';
}

interface IPostKill {
	type: 'POST_KILL';
}

export class Increment implements IIncrement {
	readonly type = 'INCREMENT';
}

export class Decrement implements IDecrement {
	readonly type = 'DECREMENT';
}

export class Safety implements ISafety {
	readonly type = 'SAFETY';
}

export class Miss implements IMiss {
	readonly type = 'MISS';
	constructor(readonly deadBallCount: number = 0) {}
}

export class EndRack implements IEndRack {
	readonly type = 'END_RACK';
	deadBallCount = 0;
}

export class Undo implements IUndo {
	readonly type = 'UNDO';
}

export class Redo implements IRedo {
	readonly type = 'REDO';
}

export class Timeout implements ITimeOut {
	readonly type = 'TIMEOUT';
}

export class DeadBall implements IDeadBall {
	readonly type = 'DEAD_BALL';
}

export class PostKill implements IPostKill {
	readonly type = 'POST_KILL';
}

export type Action =
	| Increment
	| Decrement
	| Safety
	| Miss
	| EndRack
	| Undo
	| Redo
	| Timeout
	| DeadBall
	| PostKill;
