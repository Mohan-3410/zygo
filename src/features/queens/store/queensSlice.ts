import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {QueensGameState, QueensGrid, DifficultyLevel} from '../../../shared/types/game.types';

const initialGrid: QueensGrid = {
  size: 6,
  cells: Array(6)
    .fill(null)
    .map(() =>
      Array(6)
        .fill(null)
        .map(() => ({colorRegion: 0, state: 'empty' as const, locked: false})),
    ),
  regions: Array(6)
    .fill(null)
    .map(() => Array(6).fill(0)),
};

const initialState: QueensGameState = {
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

const queensSlice = createSlice({
  name: 'queens',
  initialState,
  reducers: {
    startGame: (state, action: PayloadAction<{difficulty: DifficultyLevel; grid: QueensGrid}>) => {
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
    makeMove: (state, action: PayloadAction<{row: number; col: number}>) => {
      const {row, col} = action.payload;
      const cell = state.grid.cells[row][col];
      if (!cell.locked) {
        if (cell.state === 'empty') {
          cell.state = 'marked';
        } else if (cell.state === 'marked') {
          cell.state = 'queen';
        } else {
          cell.state = 'empty';
        }
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
} = queensSlice.actions;

export default queensSlice.reducer;
