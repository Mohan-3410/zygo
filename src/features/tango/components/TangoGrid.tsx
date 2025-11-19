import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {GridContainer, GridCell} from '../../../shared/components/Grid';
import {TangoCell} from '../../../shared/types/game.types';
import {colors} from '../../../theme';

interface TangoGridProps {
  cells: TangoCell[][];
  size: number;
  onCellPress: (row: number, col: number, type: 'sun' | 'moon') => void;
}

export const TangoGrid: React.FC<TangoGridProps> = ({cells, size, onCellPress}) => {
  const renderCell = (cell: TangoCell, row: number, col: number) => {
    let content = '';
    let backgroundColor = colors.light.cellBackground;

    if (cell.type === 'sun') {
      content = '☀️';
      backgroundColor = colors.light.sun + '20';
    } else if (cell.type === 'moon') {
      content = '🌙';
      backgroundColor = colors.light.moon + '20';
    }

    return (
      <GridCell
        key={`${row}-${col}`}
        locked={cell.locked}
        backgroundColor={backgroundColor}
        onPress={() => {
          if (cell.type === 'empty') {
            onCellPress(row, col, 'sun');
          } else if (cell.type === 'sun') {
            onCellPress(row, col, 'moon');
          } else {
            onCellPress(row, col, 'sun');
          }
        }}>
        <Text style={styles.emoji}>{content}</Text>
        {cell.hasXMarker && <Text style={styles.marker}>X</Text>}
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
  marker: {
    position: 'absolute',
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.light.error,
  },
});
