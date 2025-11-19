import {useState, useCallback} from 'react';
import {DifficultyLevel} from '../types/game.types';

export interface UseGameStateResult {
  isPlaying: boolean;
  isPaused: boolean;
  isComplete: boolean;
  moves: number;
  hintsUsed: number;
  difficulty: DifficultyLevel;
  startGame: (difficulty: DifficultyLevel) => void;
  pauseGame: () => void;
  resumeGame: () => void;
  completeGame: () => void;
  incrementMoves: () => void;
  incrementHints: () => void;
  resetGame: () => void;
}

export const useGameState = (): UseGameStateResult => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [moves, setMoves] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('medium');

  const startGame = useCallback((newDifficulty: DifficultyLevel) => {
    setIsPlaying(true);
    setIsPaused(false);
    setIsComplete(false);
    setMoves(0);
    setHintsUsed(0);
    setDifficulty(newDifficulty);
  }, []);

  const pauseGame = useCallback(() => {
    setIsPaused(true);
  }, []);

  const resumeGame = useCallback(() => {
    setIsPaused(false);
  }, []);

  const completeGame = useCallback(() => {
    setIsComplete(true);
    setIsPlaying(false);
  }, []);

  const incrementMoves = useCallback(() => {
    setMoves(prev => prev + 1);
  }, []);

  const incrementHints = useCallback(() => {
    setHintsUsed(prev => prev + 1);
  }, []);

  const resetGame = useCallback(() => {
    setIsPlaying(false);
    setIsPaused(false);
    setIsComplete(false);
    setMoves(0);
    setHintsUsed(0);
  }, []);

  return {
    isPlaying,
    isPaused,
    isComplete,
    moves,
    hintsUsed,
    difficulty,
    startGame,
    pauseGame,
    resumeGame,
    completeGame,
    incrementMoves,
    incrementHints,
    resetGame,
  };
};
