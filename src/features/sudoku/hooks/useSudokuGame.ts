import {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../app/store/store';
import {
  startGame,
  selectCell,
  setValue,
  undo,
  incrementHints,
  pauseGame,
  resumeGame,
  completeGame,
  resetGame,
} from '../store/sudokuSlice';
import {generateSudokuGrid, isGridComplete} from '../utils/sudokuGenerator';
import {DifficultyLevel} from '../../../shared/types/game.types';

export const useSudokuGame = () => {
  const dispatch = useDispatch();
  const gameState = useSelector((state: RootState) => state.sudoku);

  const start = useCallback(
    (difficulty: DifficultyLevel) => {
      const grid = generateSudokuGrid();
      dispatch(startGame({difficulty, grid}));
    },
    [dispatch],
  );

  const handleSelectCell = useCallback(
    (row: number, col: number) => {
      dispatch(selectCell({row, col}));
    },
    [dispatch],
  );

  const handleSetValue = useCallback(
    (row: number, col: number, value: number | null) => {
      dispatch(setValue({row, col, value}));
      // Check if game is complete after this move
      setTimeout(() => {
        const state = gameState;
        if (isGridComplete(state.grid)) {
          dispatch(completeGame());
        }
      }, 100);
    },
    [dispatch, gameState],
  );

  const handleUndo = useCallback(() => {
    dispatch(undo());
  }, [dispatch]);

  const handleHint = useCallback(() => {
    dispatch(incrementHints());
    // TODO: Reveal a hint to the user
  }, [dispatch]);

  const handlePause = useCallback(() => {
    dispatch(pauseGame());
  }, [dispatch]);

  const handleResume = useCallback(() => {
    dispatch(resumeGame());
  }, [dispatch]);

  const handleReset = useCallback(() => {
    dispatch(resetGame());
  }, [dispatch]);

  return {
    gameState,
    start,
    handleSelectCell,
    handleSetValue,
    handleUndo,
    handleHint,
    handlePause,
    handleResume,
    handleReset,
  };
};
