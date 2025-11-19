import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ConnectGameState, ConnectGrid, DifficultyLevel} from '../../../shared/types/game.types';

const initialGrid: ConnectGrid = {
  size: 6,
  cells: Array(6)
    .fill(null)
    .map(() =>
      Array(6)
        .fill(null)
        .map(() => ({number: null, isConnected: false, isLocked: false})),
    ),
  maxNumber: 0,
  currentPath: [],
};

const initialState: ConnectGameState = {
  isPlaying: false,
  isPaused: false,
  isComplete: false,
  startTime: null,
  endTime: null,
  moves: 0,
  hintsUsed: 0,
  difficulty: 'medium',
  grid: initialGrid,
  history: [],
  isDrawing: false,
};

const connectSlice = createSlice({
  name: 'connect',
  initialState,
  reducers: {
    startGame: (state, action: PayloadAction<{difficulty: DifficultyLevel; grid: ConnectGrid}>) => {
      state.isPlaying = true;
      state.isPaused = false;
      state.isComplete = false;
      state.startTime = Date.now();
      state.endTime = null;
      state.moves = 0;
      state.hintsUsed = 0;
      state.difficulty = action.payload.difficulty;
      state.grid = action.payload.grid;
      state.history = [action.payload.grid];
      state.isDrawing = false;
    },
    startDrawing: (state, action: PayloadAction<{row: number; col: number}>) => {
      state.isDrawing = true;
      state.grid.currentPath = [action.payload];
    },
    addToPath: (state, action: PayloadAction<{row: number; col: number}>) => {
      state.grid.currentPath.push(action.payload);
    },
    endDrawing: state => {
      state.isDrawing = false;
      state.moves += 1;
      state.history.push(JSON.parse(JSON.stringify(state.grid)));
    },
    undo: state => {
      if (state.history.length > 1) {
        state.history.pop();
        state.grid = state.history[state.history.length - 1];
        if (state.moves > 0) {
          state.moves -= 1;
        }
      }
    },
    useHint: _state => {
      _state.hintsUsed += 1;
    },
    pauseGame: state => {
      state.isPaused = true;
    },
    resumeGame: state => {
      state.isPaused = false;
    },
    completeGame: state => {
      state.isComplete = true;
      state.isPlaying = false;
      state.endTime = Date.now();
    },
    resetGame: () => {
      return initialState;
    },
  },
});

export const {
  startGame,
  startDrawing,
  addToPath,
  endDrawing,
  undo,
  useHint: incrementHints,
  pauseGame,
  resumeGame,
  completeGame,
  resetGame,
} = connectSlice.actions;

export default connectSlice.reducer;
