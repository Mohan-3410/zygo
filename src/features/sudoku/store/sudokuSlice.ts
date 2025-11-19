import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {SudokuGameState, SudokuGrid, DifficultyLevel} from '../../../shared/types/game.types';

const initialGrid: SudokuGrid = {
  size: 6,
  cells: Array(6)
    .fill(null)
    .map(() =>
      Array(6)
        .fill(null)
        .map(() => ({value: null, locked: false, isValid: true})),
    ),
  blocks: Array(6)
    .fill(null)
    .map(() => Array(6).fill(0)),
};

const initialState: SudokuGameState = {
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
  selectedCell: null,
};

const sudokuSlice = createSlice({
  name: 'sudoku',
  initialState,
  reducers: {
    startGame: (state, action: PayloadAction<{difficulty: DifficultyLevel; grid: SudokuGrid}>) => {
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
      state.selectedCell = null;
    },
    selectCell: (state, action: PayloadAction<{row: number; col: number} | null>) => {
      state.selectedCell = action.payload;
    },
    setValue: (state, action: PayloadAction<{row: number; col: number; value: number | null}>) => {
      const {row, col, value} = action.payload;
      if (!state.grid.cells[row][col].locked) {
        state.grid.cells[row][col].value = value;
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
  selectCell,
  setValue,
  undo,
  useHint: incrementHints,
  pauseGame,
  resumeGame,
  completeGame,
  resetGame,
} = sudokuSlice.actions;

export default sudokuSlice.reducer;
