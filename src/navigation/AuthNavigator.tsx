import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RegisterScreen, LoginScreen, Verification } from '../screens';
const AuthNavigator = () => {
  const AuthStack = createNativeStackNavigator();
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Intro">
      <AuthStack.Screen name="Register" component={RegisterScreen} />
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Verification" component={Verification} />
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;