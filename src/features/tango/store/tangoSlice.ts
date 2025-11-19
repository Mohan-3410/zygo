import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {TangoGameState, TangoGrid, DifficultyLevel} from '../../../shared/types/game.types';

const initialGrid: TangoGrid = {
  size: 6,
  cells: Array(6)
    .fill(null)
    .map(() =>
      Array(6)
        .fill(null)
        .map(() => ({type: 'empty' as const, locked: false})),
    ),
  solution: Array(6)
    .fill(null)
    .map(() =>
      Array(6)
        .fill(null)
        .map(() => ({type: 'empty' as const, locked: false})),
    ),
};

const initialState: TangoGameState = {
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
};

const tangoSlice = createSlice({
  name: 'tango',
  initialState,
  reducers: {
    startGame: (state, action: PayloadAction<{difficulty: DifficultyLevel; grid: TangoGrid}>) => {
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
    },
    makeMove: (state, action: PayloadAction<{row: number; col: number; type: 'sun' | 'moon'}>) => {
      const {row, col, type} = action.payload;
      if (!state.grid.cells[row][col].locked) {
        state.grid.cells[row][col].type = type;
        state.moves += 1;
        state.history.push(JSON.parse(JSON.stringify(state.grid)));
      }
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
  makeMove,
  undo,
  useHint: incrementHints,
  pauseGame,
  resumeGame,
  completeGame,
  resetGame,
} = tangoSlice.actions;

export default tangoSlice.reducer;
