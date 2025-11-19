import React from 'react';
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';
import {colors, spacing, typography} from '../../../theme';

interface GameCardProps {
  title: string;
  description: string;
  icon: string;
  onPress: () => void;
}

export const GameCard: React.FC<GameCardProps> = ({title, description, icon, onPress}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <Text style={styles.icon}>{icon}</Text>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: colors.light.surface,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.md,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  icon: {
    fontSize: 48,
    marginRight: spacing.md,
  },
  content: {
    flex: 1,
  },
  title: {
    ...typography.h3,
    marginBottom: spacing.xs,
  },
  description: {
    ...typography.body,
    color: colors.light.textSecondary,
  },
});
