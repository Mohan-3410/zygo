import {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../app/store/store';
import {
  startGame,
  startDrawing,
  addToPath,
  endDrawing,
  undo,
  incrementHints,
  pauseGame,
  resumeGame,
  completeGame,
  resetGame,
} from '../store/connectSlice';
import {generateConnectGrid, isGridComplete} from '../utils/connectValidator';
import {DifficultyLevel} from '../../../shared/types/game.types';

export const useConnectGame = () => {
  const dispatch = useDispatch();
  const gameState = useSelector((state: RootState) => state.connect);

  const start = useCallback(
    (difficulty: DifficultyLevel) => {
      const grid = generateConnectGrid(6);
      dispatch(startGame({difficulty, grid}));
    },
    [dispatch],
  );

  const handleStartDrawing = useCallback(
    (row: number, col: number) => {
      dispatch(startDrawing({row, col}));
    },
    [dispatch],
  );

  const handleAddToPath = useCallback(
    (row: number, col: number) => {
      dispatch(addToPath({row, col}));
    },
    [dispatch],
  );

  const handleEndDrawing = useCallback(() => {
    dispatch(endDrawing());
    // Check if game is complete after this move
    setTimeout(() => {
      const state = gameState;
      if (isGridComplete(state.grid)) {
        dispatch(completeGame());
      }
    }, 100);
  }, [dispatch, gameState]);

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
    handleStartDrawing,
    handleAddToPath,
    handleEndDrawing,
    handleUndo,
    handleHint,
    handlePause,
    handleResume,
    handleReset,
  };
};
