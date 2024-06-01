import type { BallType, EndGameCase } from './types';

interface IWin {
	readonly type: 'WIN';
	id: EndGameCase;
}

interface ILose {
	readonly type: 'LOSE';
	id: EndGameCase;
}

interface ISafety {
	readonly type: 'SAFETY';
}

interface IMiss {
	readonly type: 'MISS';
}

interface IEndRack {
	readonly type: 'END_RACK';
}

interface IUndo {
	readonly type: 'UNDO';
}

interface IRedo {
	readonly type: 'REDO';
}

interface ITimeOut {
	readonly type: 'TIMEOUT';
}

interface IAssignSide {
	readonly type: 'ASSIGN_SIDE';
}

export class Win implements IWin {
	readonly type = 'WIN';
	constructor(readonly id: EndGameCase) {}
}

export class Lose implements ILose {
	readonly type = 'LOSE';
	constructor(readonly id: EndGameCase) {}
}

export class Safety implements ISafety {
	readonly type = 'SAFETY';
}

export class Miss implements IMiss {
	readonly type = 'MISS';
}

export class EndRack implements IEndRack {
	readonly type = 'END_RACK';
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

export class AssignSide implements IAssignSide {
	readonly type = 'ASSIGN_SIDE';
  constructor(readonly side: BallType) {}
}

export type Action = Win | Lose | Safety | Miss | EndRack | Undo | Redo | Timeout | AssignSide;
