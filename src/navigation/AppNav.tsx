import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigator from './BottomTabNavigator';
import AuthNavigator from './AuthNavigator';
import { SplashScreen, Verification } from '../screens';

const Stack = createNativeStackNavigator();

const AppNav = () => {
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* SplashScreen which will come once for 5 Seconds */}
        <Stack.Screen
          name="BottomTabNavigator"
          component={BottomTabNavigator}
          // Hiding header for Splash Screen
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNav;