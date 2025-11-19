import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {LeaderboardEntry, GameType} from '../../../shared/types/game.types';

interface LeaderboardState {
  entries: Record<GameType, LeaderboardEntry[]>;
  isLoading: boolean;
  error: string | null;
}

const initialState: LeaderboardState = {
  entries: {
    tango: [],
    queens: [],
    sudoku: [],
    connect: [],
  },
  isLoading: false,
  error: null,
};

const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState,
  reducers: {
    addEntry: (
      state,
      action: PayloadAction<{gameType: GameType; entry: LeaderboardEntry}>,
    ) => {
      const {gameType, entry} = action.payload;
      state.entries[gameType].push(entry);
      state.entries[gameType].sort((a, b) => b.score - a.score);
      // Keep only top 100
      state.entries[gameType] = state.entries[gameType].slice(0, 100);
    },
    setEntries: (
      state,
      action: PayloadAction<{gameType: GameType; entries: LeaderboardEntry[]}>,
    ) => {
      const {gameType, entries} = action.payload;
      state.entries[gameType] = entries;
    },
    clearLeaderboard: (state, action: PayloadAction<GameType>) => {
      state.entries[action.payload] = [];
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {addEntry, setEntries, clearLeaderboard, setLoading, setError} =
  leaderboardSlice.actions;

export default leaderboardSlice.reducer;
