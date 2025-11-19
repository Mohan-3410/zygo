import {ConnectGrid} from '../../../shared/types/game.types';

export const validateConnectPath = (grid: ConnectGrid): boolean => {
  const {cells} = grid;

  // Check if all cells are connected
  for (const row of cells) {
    for (const cell of row) {
      if (!cell.isConnected && cell.number === null) {
        return false;
      }
    }
  }

  return true;
};

export const isGridComplete = (grid: ConnectGrid): boolean => {
  const {cells} = grid;
  
  // Check if all cells are connected
  for (const row of cells) {
    for (const cell of row) {
      if (!cell.isConnected) {
        return false;
      }
    }
  }
  
  return validateConnectPath(grid);
};

export const generateConnectGrid = (size: number): ConnectGrid => {
  const cells = Array(size)
    .fill(null)
    .map(() =>
      Array(size)
        .fill(null)
        .map(() => ({
          number: null,
          isConnected: false,
          isLocked: false,
        })),
    );

  // Place numbered dots
  const maxNumber = Math.floor(size * size / 4);
  let placed = 0;
  while (placed < maxNumber) {
    const row = Math.floor(Math.random() * size);
    const col = Math.floor(Math.random() * size);
    if (cells[row][col].number === null) {
      (cells[row][col] as {number: number | null; isConnected: boolean; isLocked: boolean}).number = placed + 1;
      cells[row][col].isLocked = true;
      placed++;
    }
  }

  return {
    size,
    cells,
    maxNumber,
    currentPath: [],
  };
};
