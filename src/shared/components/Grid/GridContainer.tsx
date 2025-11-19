import React from 'react';
import {View, StyleSheet, ViewStyle} from 'react-native';
import {gridSpacing} from '../../../theme/spacing';

interface GridContainerProps {
  children: React.ReactNode;
  size: number;
  style?: ViewStyle;
}

export const GridContainer: React.FC<GridContainerProps> = ({
  children,
  size,
  style,
}) => {
  const containerWidth = size * gridSpacing.cellSize + (size - 1) * gridSpacing.cellGap;

  return (
    <View
      style={[
        styles.container,
        {
          width: containerWidth,
          height: containerWidth,
        },
        style,
      ]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignSelf: 'center',
  },
});
