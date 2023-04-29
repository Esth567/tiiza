/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BottomTabNavigator, AuthNavigator } from './src/navigation';
import { SplashScreen } from './src/screens';

const Stack = createNativeStackNavigator();

const App = () => {
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Navigation Bottom tab as a landing page */}
        <Stack.Screen
          name="BottomTabNavigator"
          component={BottomTabNavigator}
          // Hiding header for Bottom tab Navigation
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;