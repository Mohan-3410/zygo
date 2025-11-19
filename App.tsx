/**
 * Zygo - Mobile Gaming Application
 * Enterprise-level puzzle games with comprehensive leaderboard system
 */

import React from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {store, persistor} from './src/app/store/store';
import {AppNavigator} from './src/app/navigation/AppNavigator';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  const containerStyle = {flex: 1};
  
  return (
    <GestureHandlerRootView style={containerStyle}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SafeAreaProvider>
            <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
            <AppNavigator />
          </SafeAreaProvider>
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
}

export default App;
