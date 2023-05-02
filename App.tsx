/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthNavigator, BottomTabNavigator } from './src/navigation';
import { CreateReport, HomeScreen, IntroScreen } from './src/screens';
import ChatScreen from './src/screens/ChatScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="IntroScreen">
        {/* SplashScreen which will come once for 10 Seconds */}
        <Stack.Screen
          name="Introscreen"
          component={HomeScreen}
          // Hiding header for Splash Screen
          options={{ headerShown: false }}
        />
        {/* Auth Navigator: Include Login and Signup and SplashScreen */}
        <Stack.Screen
          name="AuthNavigator"
          component={AuthNavigator}
          options={{ headerShown: false }}
        />
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