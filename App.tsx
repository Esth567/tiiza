/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigator from './BottomTabNavigator';
import AuthNavigator from './AuthNavigator';
import { SplashScreen } from '../screens';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    border: 'transparent',
  },
};


const Stack = createNativeStackNavigator();

const App = () => {
 return (
   <NavigationContainer theme={theme}>
     <Stack.Navigator>
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