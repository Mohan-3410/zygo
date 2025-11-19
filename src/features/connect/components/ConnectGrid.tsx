import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {GridContainer, GridCell} from '../../../shared/components/Grid';
import {ConnectCell} from '../../../shared/types/game.types';
import {colors} from '../../../theme';

interface ConnectGridProps {
  cells: ConnectCell[][];
  size: number;
  onCellPress: (row: number, col: number) => void;
}

export const ConnectGrid: React.FC<ConnectGridProps> = ({cells, size, onCellPress}) => {
  const renderCell = (cell: ConnectCell, row: number, col: number) => {
    const content = cell.number?.toString() || '';
    const backgroundColor = cell.isConnected ? colors.light.primary + '30' : colors.light.cellBackground;

    return (
      <GridCell
        key={`${row}-${col}`}
        locked={cell.isLocked}
        backgroundColor={backgroundColor}
        onPress={() => onCellPress(row, col)}>
        {content ? (
          <View style={styles.numberCircle}>
            <Text style={styles.numberText}>{content}</Text>
          </View>
        ) : null}
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
  numberCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.light.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  numberText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.light.background,
  },
});
