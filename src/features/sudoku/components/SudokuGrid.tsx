import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {GridContainer, GridCell} from '../../../shared/components/Grid';
import {SudokuCell} from '../../../shared/types/game.types';
import {colors} from '../../../theme';

interface SudokuGridProps {
  cells: SudokuCell[][];
  size: number;
  selectedCell: {row: number; col: number} | null;
  onCellPress: (row: number, col: number) => void;
}

export const SudokuGrid: React.FC<SudokuGridProps> = ({
  cells,
  size,
  selectedCell,
  onCellPress,
}) => {
  const renderCell = (cell: SudokuCell, row: number, col: number) => {
    const isSelected = selectedCell?.row === row && selectedCell?.col === col;
    const content = cell.value?.toString() || '';

    return (
      <GridCell
        key={`${row}-${col}`}
        locked={cell.locked}
        selected={isSelected}
        error={!cell.isValid}
        onPress={() => onCellPress(row, col)}>
        <Text style={[styles.text, cell.locked && styles.lockedText]}>{content}</Text>
      </GridCell>
    );
  };

  return (
    <GridContainer size={size}>
      {cells.map((row, rowIndex) =>
        row.map((cell, colIndex) => renderCell(cell, rowIndex, colIndex)),
      )}
    </GridContainer>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: '600',
  },
  lockedText: {
    color: colors.light.primary,
    fontWeight: '700',
  },
});
