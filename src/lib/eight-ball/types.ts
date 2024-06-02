export type EndGameCase = 'M8' | 'BNR' | '8OB' | '8WP' | 'E8' | 'S8';

export type BallType = 'stripe' | 'solid';

export type Condition = {
	id: EndGameCase;
	message: string;
};
