import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';
import {RootStackParamList} from '../../../app/navigation/types';
import {RootState} from '../../../app/store/store';
import {LeaderboardList} from '../components/LeaderboardList';
import {Button} from '../../../shared/components/Button';
import {colors, spacing, typography} from '../../../theme';
import {GameType} from '../../../shared/types/game.types';

type Props = NativeStackScreenProps<RootStackParamList, 'Leaderboard'>;

export const LeaderboardScreen: React.FC<Props> = ({navigation, route}) => {
  const {gameType} = route.params;
  const entries = useSelector(
    (state: RootState) => state.leaderboard.entries[gameType as GameType] || [],
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Button
          title="← Back"
          onPress={() => navigation.goBack()}
          variant="text"
          size="small"
        />
        <Text style={styles.title}>Leaderboard</Text>
        <View style={styles.placeholder} />
      </View>
      <LeaderboardList entries={entries} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.light.border,
  },
  title: {
    ...typography.h2,
  },
  placeholder: {
    width: 80,
  },
});
