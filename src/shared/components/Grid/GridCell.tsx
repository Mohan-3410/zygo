import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
  Text,
} from 'react-native';
import {gridSpacing} from '../../../theme/spacing';
import {colors} from '../../../theme';

interface GridCellProps {
  children?: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
  locked?: boolean;
  selected?: boolean;
  error?: boolean;
  backgroundColor?: string;
}

export const GridCell: React.FC<GridCellProps> = ({
  children,
  onPress,
  style,
  textStyle,
  disabled = false,
  locked = false,
  selected = false,
  error = false,
  backgroundColor,
}) => {
  const cellStyle: ViewStyle = {
    ...styles.cell,
    backgroundColor:
      backgroundColor ||
      (locked
        ? colors.light.cellLocked
        : selected
        ? colors.light.cellSelected
        : error
        ? colors.light.cellError
        : colors.light.cellBackground),
    opacity: disabled ? 0.5 : 1,
    ...style,
  };

  return (
    <TouchableOpacity
      style={cellStyle}
      onPress={onPress}
      disabled={disabled || locked || !onPress}
      activeOpacity={0.7}>
      {typeof children === 'string' || typeof children === 'number' ? (
        <Text style={[styles.text, textStyle]}>{children}</Text>
      ) : (
        children
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cell: {
    width: gridSpacing.cellSize,
    height: gridSpacing.cellSize,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.light.border,
    borderRadius: 4,
    marginRight: gridSpacing.cellGap,
    marginBottom: gridSpacing.cellGap,
  },
  text: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.light.text,
  },
});
