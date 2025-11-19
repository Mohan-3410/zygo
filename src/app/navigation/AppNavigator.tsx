import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from './types';
import {HomeScreen} from '../../features/home/screens/HomeScreen';
import {TangoGameScreen} from '../../features/tango/screens/TangoGameScreen';
import {QueensGameScreen} from '../../features/queens/screens/QueensGameScreen';
import {SudokuGameScreen} from '../../features/sudoku/screens/SudokuGameScreen';
import {ConnectGameScreen} from '../../features/connect/screens/ConnectGameScreen';
import {LeaderboardScreen} from '../../features/leaderboard/screens/LeaderboardScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="TangoGame" component={TangoGameScreen} />
        <Stack.Screen name="QueensGame" component={QueensGameScreen} />
        <Stack.Screen name="SudokuGame" component={SudokuGameScreen} />
        <Stack.Screen name="ConnectGame" component={ConnectGameScreen} />
        <Stack.Screen name="Leaderboard" component={LeaderboardScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
