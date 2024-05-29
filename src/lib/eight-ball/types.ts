export type endGameCase = 'M8' | 'BNR' | '8OB' | '8WP' | 'E8' | 'S8';

export type ballType = 'stripe' | 'solid';

export type condition = {
	id: endGameCase;
	message: string;
};
