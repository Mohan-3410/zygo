import {GameScore, DifficultyLevel} from '../types/game.types';

const DIFFICULTY_MULTIPLIERS = {
  easy: 1.0,
  medium: 1.5,
  hard: 2.0,
};

const BASE_SCORE = 10000;
const TIME_PENALTY_RATE = 10; // points lost per second
const MOVE_PENALTY_RATE = 5; // points lost per move
const HINT_PENALTY = 200; // points lost per hint

export const calculateScore = (
  timeInSeconds: number,
  moves: number,
  hintsUsed: number,
  difficulty: DifficultyLevel,
): number => {
  const difficultyMultiplier = DIFFICULTY_MULTIPLIERS[difficulty];

  let score = BASE_SCORE;

  // Deduct for time taken
  score -= timeInSeconds * TIME_PENALTY_RATE;

  // Deduct for moves made
  score -= moves * MOVE_PENALTY_RATE;

  // Deduct for hints used
  score -= hintsUsed * HINT_PENALTY;

  // Apply difficulty multiplier
  score *= difficultyMultiplier;

  // Ensure score is non-negative
  return Math.max(Math.round(score), 0);
};

export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export const formatScore = (score: number): string => {
  return score.toLocaleString();
};

export const compareScores = (a: GameScore, b: GameScore): number => {
  // Higher score is better
  if (a.score !== b.score) {
    return b.score - a.score;
  }

  // If scores are equal, faster time is better
  if (a.timeInSeconds !== b.timeInSeconds) {
    return a.timeInSeconds - b.timeInSeconds;
  }

  // If time is equal, fewer moves is better
  return a.moves - b.moves;
};
