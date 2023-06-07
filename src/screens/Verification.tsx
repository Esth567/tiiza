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
  Alert,
} from 'react-native';
import { COLORS } from '../constant/theme';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomButton from '../component/CustomButton';
import images from '../constant/images';
import { OTPInput } from 'react-native-verify-otp-inputs';

const Verification = ({ navigation }) => {
  const [counter, setCounter] = useState(59);
   const [message, setMessage] = useState('');
   const [isRegistraionSuccess, setIsRegistraionSuccess] = useState(false);
   const [invalidCode, setInvalidCode] = useState(false);



  useEffect(() => {
    const timer = counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);


  const verifyEmail = async (token) => {
    try {
      const data = JSON.stringify({ token });

      const response = await fetch('http://192.168.43.95:5000/api/v1/validate-otp', {
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
        <Text style={{ textAlign: 'center', marginBottom: 20 }}>
          Please enter the pin sent to your email
        </Text>
        <OTPInput
          onSubmit={(token: string) => {
            verifyEmail(token).then((success) => {
              if (!success) setInvalidCode(true);
              success && navigation.replace('Login');
            });
          }}
          pinCount={6}
          boxSelectedStyle={style.boxSelectedStyle}
          boxStyle={style.boxStyle}
          digitStyle={style.digitStyle}
          variant="underlined"
        />
        {invalidCode && <Text style={{ color: COLORS.red }}>Incorrect code.</Text>}     
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
          <Text style={{ color: COLORS.black, fontSize: 14, marginBottom: 10 }}>Didn't get pin?</Text>
        </View>
        <CustomButton title="Resend pin" />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const { width } = Dimensions.get('window');
const inputWidth = Math.round(width / 9);

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
  successTextStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    padding: 30,
  },
  buttonStyle: {
    backgroundColor: COLORS.primary,
    color: '#FFFFFF',
    height: 45,
    alignItems: 'center',
    borderRadius: 30,
    marginTop: 10,
    width: inputWidth * 9,
  },
  buttonTextStyle: {
    color: COLORS.black,
    fontSize: 14,
    marginLeft: 5,
    fontWeight: 'bold',
  },
});

export default Verification;
