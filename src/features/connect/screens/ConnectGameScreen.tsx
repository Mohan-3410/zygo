import React, {useEffect} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../app/navigation/types';
import {GameHeader} from '../../../shared/components/GameHeader';
import {GameControls} from '../../../shared/components/GameControls';
import {ConnectGrid} from '../components/ConnectGrid';
import {useConnectGame} from '../hooks/useConnectGame';
import {useGameTimer} from '../../../shared/hooks/useGameTimer';
import {useHaptics} from '../../../shared/hooks/useHaptics';
import {colors} from '../../../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'ConnectGame'>;

export const ConnectGameScreen: React.FC<Props> = ({navigation, route}) => {
  const {difficulty} = route.params;
  const {gameState, start, handleStartDrawing, handleUndo, handleHint, handlePause, handleReset} =
    useConnectGame();
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

  return (
    <SafeAreaView style={styles.container}>
      <GameHeader
        title="Tango Connect"
        time={seconds}
        moves={gameState.moves}
        onBack={() => navigation.goBack()}
        onPause={() => {
          handlePause();
          pauseTimer();
        }}
      />
      <View style={styles.content}>
        <ConnectGrid
          cells={gameState.grid.cells}
          size={gameState.grid.size}
          onCellPress={(row, col) => {
            trigger('light');
            handleStartDrawing(row, col);
          }}
        />
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
});
