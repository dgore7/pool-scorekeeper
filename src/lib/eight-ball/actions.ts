interface IWin {
	type: 'WIN';
}

interface ILose {
	type: 'LOSE';
}

interface ISafety {
	type: 'SAFETY';
}

interface IMiss {
	readonly type: 'MISS';
}

interface IEndRack {
	type: 'END_RACK';
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

interface IStripe {
	type: 'STRIPE';
}

interface ISolid {
	type: 'SOLID';
}

export class Win implements IWin {
	readonly type = 'WIN';
}

export class Lose implements ILose {
	readonly type = 'LOSE';
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

export class Stripe implements IStripe {
	readonly type = 'STRIPE';
}

export class Solid implements ISolid {
	readonly type = 'SOLID';
}

export type Action = Win | Lose | Safety | Miss | EndRack | Undo | Redo | Timeout | Stripe | Solid;
