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
import CustomButton from '../component/CustomBotton';
import { verifyEmail } from '../actions/authAction';
import images from '../constant/images';
import { OTPInput } from 'react-native-verify-otp-inputs';
import { useDispatch, useSelector } from 'react-redux';


const Verification = ({ navigation }) => {
  const [counter, setCounter] = useState(59);
  
   const dispatch = useDispatch();

  useEffect(() => {
    const timer = counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

    const handleSubmit = (token: string) => {
  
    if (token) {
      dispatch(verifyEmail(token))
        .then(() => {
          message.setMessage('Registration successful, please check your email for verification');
          navigation.navigate('Login');
        })
        .catch(() => {
          setSubmitting(false);
        });
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
          pinCount={6}
          boxSelectedStyle={style.boxSelectedStyle}
          boxStyle={style.boxStyle}
          digitStyle={style.digitStyle}
          variant="underlined"
        />
        <CustomButton onPress={handleSubmit} title="Verify" />
        <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 20}}>
          <Text style={{ color: COLORS.black, fontSize: 14}}>Didn't get pin?</Text>
          <TouchableOpacity activeOpacity={0.5}>
            <Text style={style.buttonTextStyle}>Resend pin</Text>
          </TouchableOpacity>
        </View>
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
    fontWeight: 'bold'
  },
});

export default Verification;
