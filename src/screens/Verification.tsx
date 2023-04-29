import React, {useState} from 'react';
import { View, Text, KeyboardAvoidingView, TextInput, Dimensions, StyleSheet } from 'react-native';
import { COLORS } from '../constant/theme';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomBottom from '../component/CustomBottom';
import { StackActions } from '@react-navigation/native';
import images from '../constant/images';
import { VerifyEmail } from '../utils/Auth';

const inputs = Array(6).fill('');
let newInputIndex = 0

const isObjValid = (obj) => {
  return Object.values(obj).every(val => val.trim())
}

const Verification = ({route, navigation}) => {
  const {profile} = route.params
  const [OTP, setOTP] = useState({0: '', 1: '', 2: '', 3: '', 4: '', 5: ''})
  const [nextInputIndex, setNextInputIndex] = useState(0);
   const [
    isRegistraionSuccess,
    setIsRegistraionSuccess
  ] = useState(false);

  const handleChangeText = () => {
    const newOTP = {...OTP};
    newOTP[index] = text;
    setOTP(newOTP)

    const lastInputIndex = inputs.length - 1;
    if(!text) newInputIndex = index === 0 ? 0 : index -1;
    else newInputIndex = index === lastInputIndex ? lastInputIndex
    : index + 1;
    setNextInputIndex(newInputIndex);
  };

  useFocusEffect(() => {
    input.current.focus();
  }, [nextInputIndex]);

  const submitOTP = async () => {
    Keyboard.dismiss();

    if(isObjValid(OTP)) {
      let val = '';

      Object.values(OTP).forEach(V => {
        val += v
      })

      const res = await VerifyEmail(val, profile.id);
      if(!res.success) return console.log(res.error)

      navigation.dispatch(
        StackAction.replace('Verification', {profile: res.user }),
      );
    }
  }

  return (
    <KeyboardAvoidingView style={{flex: 1, justifyContent: 'center'}}>
      <Text style={{textAlign: 'center', marginBottom: 50, }}>Please verify your email, Pin has been sent to your email</Text>
      <View style={style.otpContainer}>
        {inputs.map((inp, index) => {
          return (
          <View key={index.toString()} style={style.inputContainer}>
          <TextInput
          value={OTP[index]}
          onChangeText = {() => handleChangeText(text, index)}
          placeholder='0'
          style={{fontSize: 25, paddingHorizontal: 15}}
          keyboardType='numeric'
          maxLength={1}
          ref={nextInputIndex === index ? input : null}
          />
          </View>
          );      
        })}       
      </View>
      <CustomBottom  onPress={SubmitOTP} />
    </KeyboardAvoidingView>
  );
}

const {width} = Dimensions.get('window')
const inputWidth = Math.round(width / 6)

const style = StyleSheet.create({
  inputContainer: {
    height: inputWidth,
    width: inputWidth,
    borderRadius: 2,
    borderColor: COLORS.primary,
    justifyContent:'center', 
    alignItems: 'center'
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: inputWidth / 2
  },
  successTextStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    padding: 30,
  },
});

export default Verification;