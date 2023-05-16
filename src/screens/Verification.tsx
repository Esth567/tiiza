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
import CustomBottom from '../component/CustomBottom';
import { VerifyEmail } from '../utils/Auth';
import images from '../constant/images';
import { OTPInput } from 'react-native-verify-otp-inputs';
import { validateOtp } from '../actions/auth';
import { useDispatch, useSelector } from "react-redux";


const Verification = ({navigation}) => {

  const [loading, setLoading] = useState(false);

  const [isRegistraionSuccess, setIsRegistraionSuccess] = useState(false);
  const [errortext, setErrortext] = useState('');


   const dispatch = useDispatch(); 

  const handleToken = () => {
     try {
      if (token) {
        dispatch(validateOtp(token));
        isRegistraionSuccess(true);
        // if confirmed successfully navigate to "Login"
        navigation.navigate('Login');
        Alert.alert('Success', 'You can now login');
      } else {
        setErrortext();
      }   
     } catch (e) {
       Alert.alert('Error', e.message || 'Authentication failed');
     }
  }

   if (isRegistraionSuccess) {
     return (
       <View
         style={{
           flex: 1,
           backgroundColor: '#307ecc',
           justifyContent: 'center',
         }}
       >
         <Image
           source={images.success}
           style={{
             height: 150,
             resizeMode: 'contain',
             alignSelf: 'center',
           }}
         />
         <Text style={style.successTextStyle}>Registration Successful</Text>
         <CustomBottom title="Verify" onPress={() => navigation.navigate('LoginScreen')} />
       </View>
     );
   }

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
            handleToken(token);
          }}
          pinCount={6}
          boxSelectedStyle={style.boxSelectedStyle}
          boxStyle={style.boxStyle}
          digitStyle={style.digitStyle}
          variant="underlined"
        />
        <View>
          <Text style={{textAlign: 'center', marginTop: 20}}>Didn't get pin</Text>   
        <TouchableOpacity style={style.buttonStyle} activeOpacity={0.5}>
          <Text style={style.buttonTextStyle}>Resend pin</Text>
        </TouchableOpacity>
        </View>
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
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
});

export default Verification;