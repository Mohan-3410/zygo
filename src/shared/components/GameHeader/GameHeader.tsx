import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {colors} from '../../../theme/colors';
import {spacing} from '../../../theme/spacing';
import {typography} from '../../../theme/typography';
import {formatTime} from '../../utils/scoreCalculator';

interface GameHeaderProps {
  title: string;
  time: number;
  moves: number;
  onBack?: () => void;
  onPause?: () => void;
}

export const GameHeader: React.FC<GameHeaderProps> = ({
  title,
  time,
  moves,
  onBack,
  onPause,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        {onBack && (
          <TouchableOpacity onPress={onBack} style={styles.button}>
            <Text style={styles.buttonText}>← Back</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.centerSection}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.stats}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Time</Text>
            <Text style={styles.statValue}>{formatTime(time)}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Moves</Text>
            <Text style={styles.statValue}>{moves}</Text>
          </View>
        </View>
      </View>

      <View style={styles.rightSection}>
        {onPause && (
          <TouchableOpacity onPress={onPause} style={styles.button}>
            <Text style={styles.buttonText}>⏸</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    backgroundColor: colors.light.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.light.border,
  },
  leftSection: {
    flex: 1,
    alignItems: 'flex-start',
  },
  centerSection: {
    flex: 2,
    alignItems: 'center',
  },
  rightSection: {
    flex: 1,
    alignItems: 'flex-end',
  },
  button: {
    padding: spacing.sm,
  },
  buttonText: {
    ...typography.body,
    color: colors.light.primary,
    fontWeight: '600',
  },
  title: {
    ...typography.h3,
    marginBottom: spacing.xs,
  },
  stats: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    ...typography.caption,
    color: colors.light.textSecondary,
  },
  statValue: {
    ...typography.bodyBold,
    color: colors.light.text,
  },
});
