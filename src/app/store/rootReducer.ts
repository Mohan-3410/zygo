import {combineReducers} from '@reduxjs/toolkit';
import tangoReducer from '../../features/tango/store/tangoSlice';
import queensReducer from '../../features/queens/store/queensSlice';
import sudokuReducer from '../../features/sudoku/store/sudokuSlice';
import connectReducer from '../../features/connect/store/connectSlice';
import leaderboardReducer from '../../features/leaderboard/store/leaderboardSlice';

export const rootReducer = combineReducers({
  tango: tangoReducer,
  queens: queensReducer,
  sudoku: sudokuReducer,
  connect: connectReducer,
  leaderboard: leaderboardReducer,
});
