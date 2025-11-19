import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {LeaderboardEntry} from '../../../shared/types/game.types';
import {colors, spacing, typography} from '../../../theme';
import {formatTime} from '../../../shared/utils/scoreCalculator';

interface LeaderboardListProps {
  entries: LeaderboardEntry[];
}

export const LeaderboardList: React.FC<LeaderboardListProps> = ({entries}) => {
  const renderItem = ({item}: {item: LeaderboardEntry}) => (
    <View style={styles.item}>
      <Text style={styles.rank}>#{item.rank}</Text>
      <View style={styles.info}>
        <Text style={styles.username}>{item.username}</Text>
        <Text style={styles.details}>
          Score: {item.score} • Time: {formatTime(item.time)} • Moves: {item.moves}
        </Text>
      </View>
    </View>
  );

  return (
    <FlatList
      data={entries}
      renderItem={renderItem}
      keyExtractor={item => `${item.rank}-${item.userId}`}
      contentContainerStyle={styles.list}
      ListEmptyComponent={
        <View style={styles.empty}>
          <Text style={styles.emptyText}>No scores yet. Be the first to play!</Text>
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
  list: {
    padding: spacing.md,
  },
  item: {
    flexDirection: 'row',
    backgroundColor: colors.light.surface,
    padding: spacing.md,
    borderRadius: 8,
    marginBottom: spacing.sm,
    alignItems: 'center',
  },
  rank: {
    ...typography.h3,
    color: colors.light.primary,
    width: 50,
    textAlign: 'center',
  },
  info: {
    flex: 1,
  },
  username: {
    ...typography.bodyBold,
    marginBottom: spacing.xs,
  },
  details: {
    ...typography.caption,
    color: colors.light.textSecondary,
  },
  empty: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  emptyText: {
    ...typography.body,
    color: colors.light.textSecondary,
    textAlign: 'center',
  },
});
