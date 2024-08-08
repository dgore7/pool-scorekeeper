import type { EightBallGame, EightBallPlayer } from './eight-ball';
import type { NineBallGame, NineBallPlayer } from './nine-ball';

export type GameType = '9ball' | '8ball' | '10ball' | 'straightPool' | 'onePocket';
export type RuleType = 'APA' | 'BCA' | 'Pro';
export type APAHandicaps = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | typeof NaN;
export type Player = NineBallPlayer | EightBallPlayer;
export type Game = NineBallGame | EightBallGame;
export type BarSizeType = 'h-1' | 'h-2' | 'h-4'
