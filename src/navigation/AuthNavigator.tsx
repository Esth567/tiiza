import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RegisterScreen, LoginScreen, SplashScreen } from '../screens';
const AuthNavigator = () => {
  const AuthStack = createNativeStackNavigator();
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }} initialRouteName="SplashScreen">
      <AuthStack.Screen name="Register" component={RegisterScreen} />
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="SplashScreen" component={SplashScreen} />
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;