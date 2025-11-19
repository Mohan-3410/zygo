// Common game types

export type GameType = 'tango' | 'queens' | 'sudoku' | 'connect';

export type DifficultyLevel = 'easy' | 'medium' | 'hard';

export interface GameStats {
  gamesPlayed: number;
  gamesWon: number;
  averageTime: number;
  bestTime: number;
  totalHintsUsed: number;
  winRate: number;
}

export interface GameScore {
  gameType: GameType;
  difficulty: DifficultyLevel;
  timeInSeconds: number;
  moves: number;
  hintsUsed: number;
  score: number;
  completedAt: Date;
  userId: string;
}

export interface GameState {
  isPlaying: boolean;
  isPaused: boolean;
  isComplete: boolean;
  startTime: number | null;
  endTime: number | null;
  moves: number;
  hintsUsed: number;
  difficulty: DifficultyLevel;
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  username: string;
  score: number;
  time: number;
  moves: number;
  difficulty: DifficultyLevel;
  completedAt: Date;
}

export interface LeaderboardFilter {
  gameType: GameType;
  difficulty: DifficultyLevel;
  timeframe: 'daily' | 'weekly' | 'all-time';
}

// Tango (Sun/Moon) types
export interface TangoCell {
  type: 'sun' | 'moon' | 'empty';
  locked: boolean;
  hasXMarker?: boolean;
}

export interface TangoGrid {
  size: number;
  cells: TangoCell[][];
  solution: TangoCell[][];
}

export interface TangoGameState extends GameState {
  grid: TangoGrid;
  history: TangoGrid[];
}

// Queens Puzzle types
export interface QueensCell {
  colorRegion: number;
  state: 'empty' | 'queen' | 'marked';
  locked: boolean;
}

export interface QueensGrid {
  size: number;
  cells: QueensCell[][];
  regions: number[][];
}

export interface QueensGameState extends GameState {
  grid: QueensGrid;
  history: QueensGrid[];
}

// Mini Sudoku types
export interface SudokuCell {
  value: number | null;
  locked: boolean;
  isValid: boolean;
  notes?: number[];
}

export interface SudokuGrid {
  size: 6;
  cells: SudokuCell[][];
  blocks: number[][];
}

export interface SudokuGameState extends GameState {
  grid: SudokuGrid;
  history: SudokuGrid[];
  selectedCell: {row: number; col: number} | null;
}

// Tango Connect types
export interface ConnectCell {
  number: number | null;
  isConnected: boolean;
  isLocked: boolean;
  pathDirection?: 'horizontal' | 'vertical' | 'none';
}

export interface ConnectGrid {
  size: number;
  cells: ConnectCell[][];
  maxNumber: number;
  currentPath: {row: number; col: number}[];
}

export interface ConnectGameState extends GameState {
  grid: ConnectGrid;
  history: ConnectGrid[];
  isDrawing: boolean;
}
