import {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../app/store/store';
import {
  startGame,
  makeMove,
  undo,
  incrementHints,
  pauseGame,
  resumeGame,
  completeGame,
  resetGame,
} from '../store/tangoSlice';
import {generateTangoGrid, isGridComplete} from '../utils/tangoValidator';
import {DifficultyLevel} from '../../../shared/types/game.types';

export const useTangoGame = () => {
  const dispatch = useDispatch();
  const gameState = useSelector((state: RootState) => state.tango);

  const start = useCallback(
    (difficulty: DifficultyLevel) => {
      const grid = generateTangoGrid(6);
      dispatch(startGame({difficulty, grid}));
    },
    [dispatch],
  );

  const handleMove = useCallback(
    (row: number, col: number, type: 'sun' | 'moon') => {
      dispatch(makeMove({row, col, type}));
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
    handleMove,
    handleUndo,
    handleHint,
    handlePause,
    handleResume,
    handleReset,
  };
};
