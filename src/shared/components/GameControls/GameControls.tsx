import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Button} from '../Button';
import {spacing} from '../../../theme/spacing';

interface GameControlsProps {
  onUndo?: () => void;
  onHint?: () => void;
  onReset?: () => void;
  canUndo?: boolean;
  canHint?: boolean;
}

export const GameControls: React.FC<GameControlsProps> = ({
  onUndo,
  onHint,
  onReset,
  canUndo = true,
  canHint = true,
}) => {
  return (
    <View style={styles.container}>
      {onUndo && (
        <Button
          title="Undo"
          onPress={onUndo}
          variant="outline"
          size="medium"
          disabled={!canUndo}
          style={styles.button}
        />
      )}
      {onHint && (
        <Button
          title="Hint"
          onPress={onHint}
          variant="secondary"
          size="medium"
          disabled={!canHint}
          style={styles.button}
        />
      )}
      {onReset && (
        <Button
          title="Reset"
          onPress={onReset}
          variant="text"
          size="medium"
          style={styles.button}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.lg,
    gap: spacing.md,
  },
  button: {
    flex: 1,
    maxWidth: 120,
  },
});
