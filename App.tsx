/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import AppNav from './src/navigation/AppNav';
import store from './src/store';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as StoreProvider } from 'react-redux';



const App = () => {
  return (
    <StoreProvider store={store}>
      <SafeAreaProvider style={{ flex: 1 }}>
        <AppNav />
      </SafeAreaProvider>
    </StoreProvider>
  );
};

export default App;