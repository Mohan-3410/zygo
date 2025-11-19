import {SudokuGrid} from '../../../shared/types/game.types';

export const validateSudokuGrid = (grid: SudokuGrid): boolean => {
  const {cells, size} = grid;

  // Check rows
  for (let row = 0; row < size; row++) {
    const values = cells[row]
      .map(cell => cell.value)
      .filter(v => v !== null) as number[];
    if (new Set(values).size !== values.length) {
      return false;
    }
  }

  // Check columns
  for (let col = 0; col < size; col++) {
    const values = cells
      .map(row => row[col].value)
      .filter(v => v !== null) as number[];
    if (new Set(values).size !== values.length) {
      return false;
    }
  }

  // Check 2x3 blocks
  for (let blockRow = 0; blockRow < 3; blockRow++) {
    for (let blockCol = 0; blockCol < 2; blockCol++) {
      const values: number[] = [];
      for (let r = blockRow * 2; r < blockRow * 2 + 2; r++) {
        for (let c = blockCol * 3; c < blockCol * 3 + 3; c++) {
          if (cells[r][c].value !== null) {
            values.push(cells[r][c].value!);
          }
        }
      }
      if (new Set(values).size !== values.length) {
        return false;
      }
    }
  }

  return true;
};

export const isGridComplete = (grid: SudokuGrid): boolean => {
  const {cells} = grid;
  // Check if all cells are filled
  for (const row of cells) {
    for (const cell of row) {
      if (cell.value === null) {
        return false;
      }
    }
  }
  return validateSudokuGrid(grid);
};

export const generateSudokuGrid = (): SudokuGrid => {
  const size = 6;
  
  // Create a simple valid solution
  const solution = [
    [1, 2, 3, 4, 5, 6],
    [4, 5, 6, 1, 2, 3],
    [2, 3, 1, 5, 6, 4],
    [5, 6, 4, 2, 3, 1],
    [3, 1, 2, 6, 4, 5],
    [6, 4, 5, 3, 1, 2],
  ];

  const cells = solution.map(row =>
    row.map(value => ({
      value: Math.random() < 0.4 ? value : null, // 40% filled
      locked: Math.random() < 0.4,
      isValid: true,
    })),
  );

  // Lock filled cells
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (cells[row][col].value !== null) {
        cells[row][col].locked = true;
      }
    }
  }

  const blocks = Array(size)
    .fill(null)
    .map((_unused, row) =>
      Array(size)
        .fill(null)
        .map((_unused2, col) => Math.floor(row / 2) * 2 + Math.floor(col / 3)),
    );

  return {size, cells, blocks};
};
