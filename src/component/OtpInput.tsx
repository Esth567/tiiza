import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  Dimensions,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Image,
  keyboard,
} from 'react-native';

import { COLORS } from '../constant/theme';

const OTPInput = ({setPinReady, code, setCode, maxLength}) => {

  const textInputRef = useRef(null);

  const codeDigitsArray = new Array(maxLength).fill(0);
  const [inputIsFocused, setInputIsFocused] = useState(false);

  const handleOnPress = () => {
    setInputIsFocused(true);
    textInputRef?.current?.focus();
  };

    const handleOnBlur = () => {
      setInputIsFocused(false);
    };


  const toCodeDigitInput = (_value, index) => {
    const emptyInputChar = '';
    const digit = code[index] || emptyInputChar;

    //formatting
    const isCurrentDigit = index === code.length;
    const isLastDigit = index === maxLength - 1;
    const isCodeFull = code.length === maxLength;

    const isDigitFocused = isCurrentDigit || (isLastDigit && isCodeFull);

    const StyleOtpInput = () => {
      inputIsFocused && isDigitFocused ? OTPInputFocused : OTPInput;
    }


    return (
      <View style={style.otpInput} key={index}>
        <Text style={style.otpInputText}>{digit}</Text>
      </View>
    );
  }
  
  return (
    <View style={style.container}>
      <Vi style={style.otpInputContainer} onPress={handleOnPress}>
        {codeDigitsArray.map(toCodeDigitInput)}
        <TextInput
          value={code}
          onChangeText={setCode}
          maxLength={maxLength}
          keyboardType="number-pad"
          returnKeyType="done"
          textContentType="oneTimeCode"
        />
      </Vi>
    </View>
  );
};


const style = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,
  },
  HiddenTextInput: {
    borderColor: COLORS.secondary,
    borderWidth: 20,
    borderRadius: 20,
    padding: 20,
    marginTop: 15,
    color: COLORS.white,
  },
  otpInputContainer: {
    width: '80%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  otpInput: {
    borderColor: COLORS.secondary,
    width: '15%',
    borderWidth: 1,
    borderRadius: 10,
    padding: 12
  },
   otpInputText: {
    color: COLORS.white,
    padding: 12,
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',

  },
});

export default OTPInput;
