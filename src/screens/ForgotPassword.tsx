import React from 'react';
import { View, Text } from 'react-native';
import Input from '../component/Input';
import CustomButton from '../component/CustomBottom';

const ForgotPassword = () => {
  return (
    <View>
      <Input placeHolder='example@email.com' />
      <CustomButton title='Send Link' />
    </View>
  );
}

export default ForgotPassword;