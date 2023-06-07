import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Button, Text } from 'react-native';
import { OTPInput } from 'react-native-verify-otp-inputs';
import { COLORS } from '../constant/theme';


const SmsOtp = ({ route, navigation }) => {

  const [invalidCode, setInvalidCode] = useState(false);

  const verifyOtp = async (token) => {
    try {
      const data = JSON.stringify({ token });

      const response = await fetch('http://192.168.43.95:5000/api/v1/customer/validate-sms-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: data,
      });

      const json = await response.json();
      return json.success;
    } catch (error) {
      console.error(error);
      return false;
    }
  };


  return (
    <SafeAreaView style={style.wrapper}>
      <Text style={style.prompt}>Enter the code we sent you</Text>
        <OTPInput
          onSubmit={(token: string) => {
            verifyOtp(token).then((success) => {
              if (!success) setInvalidCode(true);
              success && navigation.replace('BottomTabNavigator');
            });
          }}
          pinCount={6}
          boxSelectedStyle={style.boxSelectedStyle}
          boxStyle={style.boxStyle}
          digitStyle={style.digitStyle}
          variant="underlined"
        />
      {invalidCode && <Text style={style.error}>Incorrect code.</Text>}
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  borderStyleHighLighted: {
    borderColor: COLORS.gray,
  },
  boxSelectedStyle: {
    backgroundColor: COLORS.primary,
  },
  boxStyle: {
    borderRadius: 8,
  },
  digitStyle: {
    color: 'gray',
  },

  borderStyleBase: {
    width: 30,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: '#03DAC6',
  },

  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
    color: 'black',
    fontSize: 20,
  },

  underlineStyleHighLighted: {
    borderColor: '#03DAC6',
  },

  prompt: {
    fontSize: 20,
    paddingHorizontal: 30,
    paddingBottom: 20,
  },

  message: {
    fontSize: 16,
    paddingHorizontal: 30,
  },

  error: {
    color: 'red',
  },
});

export default SmsOtp;
