import React from 'react';
import {View, Text, StyleSheet, ScrollView, Alert} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../app/navigation/types';
import {GameCard} from '../components/GameCard';
import {Button} from '../../../shared/components/Button';
import {colors, spacing, typography} from '../../../theme';
import {DifficultyLevel} from '../../../shared/types/game.types';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export const HomeScreen: React.FC<Props> = ({navigation}) => {
  const selectDifficultyAndNavigate = (
    screen: keyof RootStackParamList,
    gameTitle: string,
  ) => {
    Alert.alert('Select Difficulty', `Choose difficulty for ${gameTitle}`, [
      {
        text: 'Easy',
        onPress: () =>
          navigation.navigate(screen as any, {difficulty: 'easy' as DifficultyLevel}),
      },
      {
        text: 'Medium',
        onPress: () =>
          navigation.navigate(screen as any, {difficulty: 'medium' as DifficultyLevel}),
      },
      {
        text: 'Hard',
        onPress: () =>
          navigation.navigate(screen as any, {difficulty: 'hard' as DifficultyLevel}),
      },
      {text: 'Cancel', style: 'cancel'},
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <Text style={styles.title}>Zygo Puzzle Games</Text>
        <Text style={styles.subtitle}>Choose a game to play</Text>

        <View style={styles.gamesContainer}>
          <GameCard
            title="Tango (Sun & Moon)"
            description="Fill the grid with suns and moons following the rules"
            icon="☀️🌙"
            onPress={() => selectDifficultyAndNavigate('TangoGame', 'Tango')}
          />

          <GameCard
            title="Queens Puzzle"
            description="Place queens on the board without them touching"
            icon="👑"
            onPress={() => selectDifficultyAndNavigate('QueensGame', 'Queens')}
          />

          <GameCard
            title="Mini Sudoku"
            description="Fill the 6x6 grid with numbers 1-6"
            icon="🔢"
            onPress={() => selectDifficultyAndNavigate('SudokuGame', 'Sudoku')}
          />

          <GameCard
            title="Tango Connect"
            description="Connect the numbered dots in order"
            icon="🔗"
            onPress={() => selectDifficultyAndNavigate('ConnectGame', 'Connect')}
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title="View Leaderboard"
            onPress={() => navigation.navigate('Leaderboard', {gameType: 'tango'})}
            variant="outline"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light.background,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: spacing.lg,
  },
  title: {
    ...typography.h1,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.body,
    textAlign: 'center',
    color: colors.light.textSecondary,
    marginBottom: spacing.xl,
  },
  gamesContainer: {
    marginBottom: spacing.xl,
  },
  buttonContainer: {
    marginTop: spacing.md,
  },
});
