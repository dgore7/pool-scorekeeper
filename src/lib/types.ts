import type { EightBallGame, EightBallPlayer } from './eight-ball';
import type { NineBallGame, NineBallPlayer } from './nine-ball';

export type GameType = '9ball' | '8ball' | '10ball' | 'straightPool' | 'onePocket';
export type RuleType = 'APA' | 'BCA' | 'Pro';
export type Player = NineBallPlayer | EightBallPlayer;
export type Game = NineBallGame | EightBallGame;
