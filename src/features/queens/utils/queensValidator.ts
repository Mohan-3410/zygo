import {QueensGrid} from '../../../shared/types/game.types';

export const validateQueensGrid = (grid: QueensGrid): boolean => {
  const {cells, size} = grid;

  // Check rows - exactly one queen per row
  for (let row = 0; row < size; row++) {
    const queensInRow = cells[row].filter(cell => cell.state === 'queen').length;
    if (queensInRow !== 1) {
      return false;
    }
  }

  // Check columns - exactly one queen per column
  for (let col = 0; col < size; col++) {
    let queensInCol = 0;
    for (let row = 0; row < size; row++) {
      if (cells[row][col].state === 'queen') {
        queensInCol++;
      }
    }
    if (queensInCol !== 1) {
      return false;
    }
  }

  // Check color regions - exactly one queen per region
  const regionQueens = new Map<number, number>();
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (cells[row][col].state === 'queen') {
        const region = cells[row][col].colorRegion;
        regionQueens.set(region, (regionQueens.get(region) || 0) + 1);
      }
    }
  }
  for (const count of regionQueens.values()) {
    if (count !== 1) {
      return false;
    }
  }

  // Check queens don't touch (including diagonally)
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (cells[row][col].state === 'queen') {
        // Check all 8 surrounding cells
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            if (dr === 0 && dc === 0) continue;
            const newRow = row + dr;
            const newCol = col + dc;
            if (
              newRow >= 0 &&
              newRow < size &&
              newCol >= 0 &&
              newCol < size &&
              cells[newRow][newCol].state === 'queen'
            ) {
              return false;
            }
          }
        }
      }
    }
  }

  return true;
};

export const isGridComplete = (grid: QueensGrid): boolean => {
  const {cells, size} = grid;
  let queensCount = 0;
  for (const row of cells) {
    for (const cell of row) {
      if (cell.state === 'queen') {
        queensCount++;
      }
    }
  }
  return queensCount === size && validateQueensGrid(grid);
};

export const generateQueensGrid = (size: number): QueensGrid => {
  // Simple region generation
  const regions: number[][] = Array(size)
    .fill(null)
    .map((_unused, row) =>
      Array(size)
        .fill(null)
        .map(() => Math.floor(row)),
    );

  const cells = Array(size)
    .fill(null)
    .map((_unused2, row) =>
      Array(size)
        .fill(null)
        .map((_unused3, col) => ({
          colorRegion: regions[row][col],
          state: 'empty' as const,
          locked: false,
        })),
    );

  return {size, cells, regions};
};
