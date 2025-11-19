import React, {useEffect} from 'react';
import {View, StyleSheet, Alert, Text, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../app/navigation/types';
import {GameHeader} from '../../../shared/components/GameHeader';
import {GameControls} from '../../../shared/components/GameControls';
import {SudokuGrid} from '../components/SudokuGrid';
import {useSudokuGame} from '../hooks/useSudokuGame';
import {useGameTimer} from '../../../shared/hooks/useGameTimer';
import {useHaptics} from '../../../shared/hooks/useHaptics';
import {colors, spacing} from '../../../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'SudokuGame'>;

export const SudokuGameScreen: React.FC<Props> = ({navigation, route}) => {
  const {difficulty} = route.params;
  const {
    gameState,
    start,
    handleSelectCell,
    handleSetValue,
    handleUndo,
    handleHint,
    handlePause,
    handleReset,
  } = useSudokuGame();
  const {seconds, start: startTimer, pause: pauseTimer, reset: resetTimer} = useGameTimer();
  const {trigger} = useHaptics();

  useEffect(() => {
    start(difficulty);
    startTimer();
  }, [difficulty, start, startTimer]);

  useEffect(() => {
    if (gameState.isComplete) {
      pauseTimer();
      Alert.alert(
        'Congratulations!',
        `You completed the puzzle in ${seconds} seconds with ${gameState.moves} moves!`,
        [
          {text: 'Back to Home', onPress: () => navigation.navigate('Home')},
          {
            text: 'Play Again',
            onPress: () => {
              resetTimer();
              handleReset();
              start(difficulty);
              startTimer();
            },
          },
        ],
      );
    }
  }, [gameState.isComplete, gameState.moves, seconds, pauseTimer, navigation, resetTimer, handleReset, start, difficulty, startTimer]);

  const handleNumberPress = (num: number) => {
    if (gameState.selectedCell) {
      trigger('light');
      handleSetValue(gameState.selectedCell.row, gameState.selectedCell.col, num);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <GameHeader
        title="Mini Sudoku"
        time={seconds}
        moves={gameState.moves}
        onBack={() => navigation.goBack()}
        onPause={() => {
          handlePause();
          pauseTimer();
        }}
      />
      <View style={styles.content}>
        <SudokuGrid
          cells={gameState.grid.cells}
          size={gameState.grid.size}
          selectedCell={gameState.selectedCell}
          onCellPress={(row, col) => {
            trigger('light');
            handleSelectCell(row, col);
          }}
        />
        <View style={styles.numberPad}>
          {[1, 2, 3, 4, 5, 6].map(num => (
            <TouchableOpacity
              key={num}
              style={styles.numberButton}
              onPress={() => handleNumberPress(num)}>
              <Text style={styles.numberText}>{num}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <GameControls
        onUndo={() => {
          trigger('light');
          handleUndo();
        }}
        onHint={() => {
          trigger('medium');
          handleHint();
        }}
        onReset={() => {
          Alert.alert('Reset Game', 'Are you sure?', [
            {text: 'Cancel', style: 'cancel'},
            {
              text: 'Reset',
              style: 'destructive',
              onPress: () => {
                resetTimer();
                handleReset();
                start(difficulty);
                startTimer();
              },
            },
          ]);
        }}
        canUndo={gameState.history.length > 1}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  numberPad: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: spacing.xl,
    gap: spacing.md,
  },
  numberButton: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.light.primary,
    borderRadius: 8,
  },
  numberText: {
    fontSize: 24,
    fontWeight: '600',
    color: colors.light.background,
  },
});
