import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RegisterScreen, LoginScreen, Verification, PhoneNumber, SmsOtp, ForgotPassword } from '../screens';
const AuthNavigator = () => {
  const AuthStack = createNativeStackNavigator();
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Register" component={RegisterScreen} />
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="PhoneNumber" component={PhoneNumber} />
      <AuthStack.Screen name="Verification" component={Verification} />
      <AuthStack.Screen name="SmsOtp" component={SmsOtp} />
      <AuthStack.Screen name="ForgotPassword" component={ForgotPassword} />
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;