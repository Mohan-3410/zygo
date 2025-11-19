import AsyncStorage from '@react-native-async-storage/async-storage';
import {GameScore, GameStats, GameType} from '../types/game.types';

const STORAGE_KEYS = {
  GAME_STATS: (gameType: GameType) => `@game_stats_${gameType}`,
  GAME_SCORES: (gameType: GameType) => `@game_scores_${gameType}`,
  GAME_STATE: (gameType: GameType) => `@game_state_${gameType}`,
  USER_SETTINGS: '@user_settings',
  LEADERBOARD: (gameType: GameType) => `@leaderboard_${gameType}`,
};

export const saveGameStats = async (
  gameType: GameType,
  stats: GameStats,
): Promise<void> => {
  try {
    const key = STORAGE_KEYS.GAME_STATS(gameType);
    await AsyncStorage.setItem(key, JSON.stringify(stats));
  } catch (error) {
    console.error('Error saving game stats:', error);
  }
};

export const loadGameStats = async (
  gameType: GameType,
): Promise<GameStats | null> => {
  try {
    const key = STORAGE_KEYS.GAME_STATS(gameType);
    const data = await AsyncStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error loading game stats:', error);
    return null;
  }
};

export const saveGameScore = async (
  gameType: GameType,
  score: GameScore,
): Promise<void> => {
  try {
    const key = STORAGE_KEYS.GAME_SCORES(gameType);
    const existingData = await AsyncStorage.getItem(key);
    const scores: GameScore[] = existingData ? JSON.parse(existingData) : [];
    scores.push(score);
    // Keep only the last 100 scores
    const trimmedScores = scores.slice(-100);
    await AsyncStorage.setItem(key, JSON.stringify(trimmedScores));
  } catch (error) {
    console.error('Error saving game score:', error);
  }
};

export const loadGameScores = async (
  gameType: GameType,
): Promise<GameScore[]> => {
  try {
    const key = STORAGE_KEYS.GAME_SCORES(gameType);
    const data = await AsyncStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading game scores:', error);
    return [];
  }
};

export const saveGameState = async (
  gameType: GameType,
  state: any,
): Promise<void> => {
  try {
    const key = STORAGE_KEYS.GAME_STATE(gameType);
    await AsyncStorage.setItem(key, JSON.stringify(state));
  } catch (error) {
    console.error('Error saving game state:', error);
  }
};

export const loadGameState = async (gameType: GameType): Promise<any> => {
  try {
    const key = STORAGE_KEYS.GAME_STATE(gameType);
    const data = await AsyncStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error loading game state:', error);
    return null;
  }
};

export const clearGameState = async (gameType: GameType): Promise<void> => {
  try {
    const key = STORAGE_KEYS.GAME_STATE(gameType);
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error('Error clearing game state:', error);
  }
};
