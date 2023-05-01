import React, { useState, useRef, useEffect } from 'react';
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
} from 'react-native';
import { COLORS } from '../constant/theme';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomBottom from '../component/CustomBottom';
import { VerifyEmail } from '../utils/Auth';
import images from '../constant/images';
import OTPInputView from '@twotalltotems/react-native-otp-input'; 



const Verification = () => {

 
 
  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: COLORS.white, paddingTop: 50 }}>
      <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
      <ScrollView
        contentContainerStyle={{
          paddingTop: 50,
          marginHorizontal: 15,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View style={{ marginBottom: 20 }}>
          <Image
            source={images.email2}
            style={{
              height: inputWidth * 3,
              width: inputWidth * 3,
            }}
          />
        </View>
        <Text style={{ textAlign: 'center', marginBottom: 50 }}>
          Please verify your email, Pin has been sent to your email
        </Text>
        <CustomBottom title="Verify" />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const {width} = Dimensions.get('window')
const inputWidth = Math.round(width / 9)

const style = StyleSheet.create({
  inputContainer: {
    height: inputWidth,
    width: inputWidth,
    borderRadius: 2,
    borderColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    textAlign: 'center',
    marginBottom: 30,
  },
  borderStyleHighLighted: {
    borderColor: "#03DAC6",
  },

  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
  },

  underlineStyleHighLighted: {
    borderColor: "#03DAC6",
  },
});

export default Verification;