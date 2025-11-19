import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {GridContainer, GridCell} from '../../../shared/components/Grid';
import {QueensCell} from '../../../shared/types/game.types';


interface QueensGridProps {
  cells: QueensCell[][];
  size: number;
  onCellPress: (row: number, col: number) => void;
}

const REGION_COLORS = [
  '#FFE5E5',
  '#E5F5FF',
  '#E5FFE5',
  '#FFF5E5',
  '#F5E5FF',
  '#FFE5F5',
];

export const QueensGrid: React.FC<QueensGridProps> = ({cells, size, onCellPress}) => {
  const renderCell = (cell: QueensCell, row: number, col: number) => {
    let content = '';
    if (cell.state === 'queen') {
      content = '👑';
    } else if (cell.state === 'marked') {
      content = '✕';
    }

    const backgroundColor = REGION_COLORS[cell.colorRegion % REGION_COLORS.length];

    return (
      <GridCell
        key={`${row}-${col}`}
        locked={cell.locked}
        backgroundColor={backgroundColor}
        onPress={() => onCellPress(row, col)}>
        <Text style={styles.emoji}>{content}</Text>
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
  emoji: {
    fontSize: 24,
  },
});
