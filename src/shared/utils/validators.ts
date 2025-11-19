// Generic validation utilities

export const isValidGridPosition = (
  row: number,
  col: number,
  size: number,
): boolean => {
  return row >= 0 && row < size && col >= 0 && col < size;
};

export const countAdjacent = <T>(
  grid: T[][],
  row: number,
  col: number,
  predicate: (cell: T) => boolean,
): number => {
  let count = 0;
  const size = grid.length;

  // Check horizontal and vertical neighbors
  const directions = [
    [-1, 0], // up
    [1, 0], // down
    [0, -1], // left
    [0, 1], // right
  ];

  for (const [dr, dc] of directions) {
    const newRow = row + dr;
    const newCol = col + dc;

    if (isValidGridPosition(newRow, newCol, size)) {
      if (predicate(grid[newRow][newCol])) {
        count++;
      }
    }
  }

  return count;
};

export const countInRow = <T>(
  grid: T[][],
  row: number,
  predicate: (cell: T) => boolean,
): number => {
  return grid[row].filter(predicate).length;
};

export const countInColumn = <T>(
  grid: T[][],
  col: number,
  predicate: (cell: T) => boolean,
): number => {
  return grid.filter(row => predicate(row[col])).length;
};

export const getAllInRow = <T>(grid: T[][], row: number): T[] => {
  return grid[row];
};

export const getAllInColumn = <T>(grid: T[][], col: number): T[] => {
  return grid.map(row => row[col]);
};

export const hasConsecutiveInRow = <T>(
  grid: T[][],
  row: number,
  count: number,
  predicate: (cell: T) => boolean,
): boolean => {
  let consecutive = 0;
  for (const cell of grid[row]) {
    if (predicate(cell)) {
      consecutive++;
      if (consecutive >= count) {
        return true;
      }
    } else {
      consecutive = 0;
    }
  }
  return false;
};

export const hasConsecutiveInColumn = <T>(
  grid: T[][],
  col: number,
  count: number,
  predicate: (cell: T) => boolean,
): boolean => {
  let consecutive = 0;
  for (const row of grid) {
    if (predicate(row[col])) {
      consecutive++;
      if (consecutive >= count) {
        return true;
      }
    } else {
      consecutive = 0;
    }
  }
  return false;
};
