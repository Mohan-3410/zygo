import React, {useEffect} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../app/navigation/types';
import {GameHeader} from '../../../shared/components/GameHeader';
import {GameControls} from '../../../shared/components/GameControls';
import {TangoGrid} from '../components/TangoGrid';
import {useTangoGame} from '../hooks/useTangoGame';
import {useGameTimer} from '../../../shared/hooks/useGameTimer';
import {useHaptics} from '../../../shared/hooks/useHaptics';
import {colors} from '../../../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'TangoGame'>;

export const TangoGameScreen: React.FC<Props> = ({navigation, route}) => {
  const {difficulty} = route.params;
  const {gameState, start, handleMove, handleUndo, handleHint, handlePause, handleReset} =
    useTangoGame();
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
          {
            text: 'Back to Home',
            onPress: () => navigation.navigate('Home'),
          },
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
  }, [
    gameState.isComplete,
    gameState.moves,
    seconds,
    pauseTimer,
    navigation,
    resetTimer,
    handleReset,
    start,
    difficulty,
    startTimer,
  ]);

  const handleCellPress = (row: number, col: number, type: 'sun' | 'moon') => {
    trigger('light');
    handleMove(row, col, type);
  };

  const onBack = () => {
    navigation.goBack();
  };

  const onPause = () => {
    handlePause();
    pauseTimer();
  };

  const onUndo = () => {
    trigger('light');
    handleUndo();
  };

  const onHint = () => {
    trigger('medium');
    handleHint();
  };

  const onReset = () => {
    Alert.alert('Reset Game', 'Are you sure you want to reset the game?', [
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
  };

  return (
    <SafeAreaView style={styles.container}>
      <GameHeader
        title="Tango (Sun & Moon)"
        time={seconds}
        moves={gameState.moves}
        onBack={onBack}
        onPause={onPause}
      />
      <View style={styles.content}>
        <TangoGrid
          cells={gameState.grid.cells}
          size={gameState.grid.size}
          onCellPress={handleCellPress}
        />
      </View>
      <GameControls
        onUndo={onUndo}
        onHint={onHint}
        onReset={onReset}
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
});
