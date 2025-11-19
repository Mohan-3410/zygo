import {TangoGrid, TangoCell} from '../../../shared/types/game.types';
import {
  countInRow,
  countInColumn,
  hasConsecutiveInRow,
  hasConsecutiveInColumn,
} from '../../../shared/utils/validators';

export const validateTangoGrid = (grid: TangoGrid): boolean => {
  const {cells, size} = grid;

  // Check each row and column
  for (let i = 0; i < size; i++) {
    // Check equal distribution
    const sunsInRow = countInRow(cells, i, (cell: TangoCell) => cell.type === 'sun');
    const moonsInRow = countInRow(cells, i, (cell: TangoCell) => cell.type === 'moon');
    const sunsInCol = countInColumn(cells, i, (cell: TangoCell) => cell.type === 'sun');
    const moonsInCol = countInColumn(cells, i, (cell: TangoCell) => cell.type === 'moon');

    if (sunsInRow !== moonsInRow || sunsInCol !== moonsInCol) {
      return false;
    }

    // Check no more than 2 consecutive
    if (
      hasConsecutiveInRow(cells, i, 3, (cell: TangoCell) => cell.type === 'sun') ||
      hasConsecutiveInRow(cells, i, 3, (cell: TangoCell) => cell.type === 'moon') ||
      hasConsecutiveInColumn(cells, i, 3, (cell: TangoCell) => cell.type === 'sun') ||
      hasConsecutiveInColumn(cells, i, 3, (cell: TangoCell) => cell.type === 'moon')
    ) {
      return false;
    }
  }

  return true;
};

export const isGridComplete = (grid: TangoGrid): boolean => {
  const {cells} = grid;
  // Check if all cells are filled
  for (const row of cells) {
    for (const cell of row) {
      if (cell.type === 'empty') {
        return false;
      }
    }
  }
  return validateTangoGrid(grid);
};

export const generateTangoGrid = (size: number): TangoGrid => {
  // Simple grid generation - alternating pattern with some randomization
  const cells: TangoCell[][] = Array(size)
    .fill(null)
    .map(() =>
      Array(size)
        .fill(null)
        .map(() => ({
          type: 'empty' as const,
          locked: Math.random() < 0.3, // 30% of cells are pre-filled
        })),
    );

  // Create solution with alternating pattern
  const solution: TangoCell[][] = Array(size)
    .fill(null)
    .map((_unused, row) =>
      Array(size)
        .fill(null)
        .map((_unused2, col) => ({
          type: ((row + col) % 2 === 0 ? 'sun' : 'moon') as 'sun' | 'moon',
          locked: false,
        })),
    );

  // Copy locked cells to the grid
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (cells[row][col].locked) {
        cells[row][col].type = solution[row][col].type;
      }
    }
  }

  return {size, cells, solution};
};
