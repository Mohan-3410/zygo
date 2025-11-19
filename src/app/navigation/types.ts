import {DifficultyLevel} from '../../shared/types/game.types';

export type RootStackParamList = {
  Home: undefined;
  TangoGame: {difficulty: DifficultyLevel};
  QueensGame: {difficulty: DifficultyLevel};
  SudokuGame: {difficulty: DifficultyLevel};
  ConnectGame: {difficulty: DifficultyLevel};
  Leaderboard: {gameType: string};
};
