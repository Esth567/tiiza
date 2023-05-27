import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import Input from '../component/Input';
import CustomButton from '../component/CustomBotton';
import { COLORS } from '../constant/theme';
import images from '../constant/images';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Verification from './Verification';
import { register } from '../actions/authAction';
import { useDispatch, useSelector } from 'react-redux';
import PhoneNumber from './PhoneNumber';
import Loader from '../component/Loader';


const RegisterScreen = ({ navigation }) => {

    
   const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState('');
   const [phone, setPhone] = useState('');
   const [password, setPassword] = useState("");
   const [confirmPassword, setConfirmPassword] = useState('');
   const [successful, setSuccessful] = useState(false);

     const [errors, setErrors] = React.useState({});
     const [Loading, setLoading] = React.useState(false);
      const [message, setMessage] = useState('');

   const dispatch = useDispatch();

   const validate = () => {
         Keyboard.dismiss();
         let valid = true;
         if (!email) {
           handleError('Please enter email', 'email');
           valid = false;
         } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
           handleError('Please input valid email', 'email');
           valid = false;
         }
         if (!fullName) {
            handleError('Please input Full Name', 'fullName');
            valid = false;
         }
         if (!phone) {
           handleError('Please input Phone Number', 'phone');
           valid = false;
         }
         if (!password) {
           handleError('Please input password', 'password');
           valid = false;
         } else if (inputs.password.length < 8) {
           handleError('Min password length of 8', 'password');
           valid = false;
         }
         if (!confirmPassword) {
           handleError('Please confirm password', 'confirmPassword');
           valid = false;
         } else if (!inputs['password'] != inputs['confirmPassword']) {
           valid = false;
           errors['confirmPassword'] = "Passwords don't match.";
         }
            if (!location) {
              handleError('Please enter location', 'location');
              valid = false;
            }

         if (valid) {
           signUp();
         }
   }; 

     const signUp = () => {
       setLoading(true);
       setTimeout(() => {
         setLoading(false);
    if (fullName && email && phone && password && confirmPassword && location) {
      dispatch(register(fullName, email, phone, password, confirmPassword, location))
        .then(() => {
          console.log();
          setSuccessful(true);
          navigation.replace('Verification');
        })
        .catch(() => {
          setSuccessful(false);
        });
    }
    }, 3000);
  };

     
  const handleOnChange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const handleError = (errorMessage, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
  };



  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <StatusBar backgroundColor={COLORS.primary} barStyle="white-content" />
      <Loader visible={Loading} />
      <View style={styles.header}>
        <Text
          style={{
            color: COLORS.white,
            marginTop: 80,
            marginHorizontal: 15,
            FONTwEIGHT: 'bold',
            fontSize: 25,
          }}
        >
          Register
        </Text>
        <Text
          style={{
            fontSize: 14,
            fontWeight: '500',
            marginBottom: 50,
            color: COLORS.white,
            marginHorizontal: 15,
          }}
        >
          Register to get started
        </Text>
      </View>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          justifyContent: 'center',
          alignContent: 'center',
          marginHorizontal: 15,
          marginTop: 30,
        }}
      >
        <KeyboardAvoidingView enabled>
          <View style={{ marginBottom: 15 }}>
            <Input
              underlineColorAndroid="#f000"
              placeholder="Enter Email"
              autoCapitalize="none"
              iconName="envelope-o"
              placeholderTextColor="#8b9cb5"
              keyboardType="email-address"
              error={errors.email}
              onFocus={() => {
                handleError(null, 'email');
              }}
              onChangeText={(text) => handleOnChange(text, 'email')}
            />
            <Input
              iconName="user-o"
              underlineColorAndroid="#f000"
              placeholder="Full Name"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              error={errors.fullName}
              onFocus={() => {
                handleError(null, 'fullName');
              }}
              onChangeText={(text) => handleOnChange(text, 'fullName')}
            />
            <PhoneNumber
              error={errors.phone}
              onFocus={() => {
                handleError(null, 'phone');
              }}
              onChangeText={(text) => handleOnChange(text, 'phone')}
            />
            <Input
              underlineColorAndroid="#f000"
              placeholder="Password"
              iconName="lock"
              password
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              error={errors.password}
              onFocus={() => {
                handleError(null, 'password');
              }}
              onChangeText={(text) => handleOnChange(text, 'password')}
            />
            <Input
              underlineColorAndroid="#f000"
              placeholder="Confirm password"
              iconName="lock"
              password
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              error={errors.confirmPassword}
              onFocus={() => {
                handleError(null, 'confirmPassword');
              }}
              onChangeText={(text) => handleOnChange(text, 'confirmPassword')}
            />
            <Input
              underlineColorAndroid="#f000"
              placeholder="State"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              error={errors.location}
              onFocus={() => {
                handleError(null, 'location');
              }}
              onChangeText={(text) => handleOnChange(text, 'location')}
            />
          </View>
          <CustomButton title="Register" onPress={validate} />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 80,
            }}
          >
            <Text style={{ fontSize: 14, marginTop: 20 }}>Already register?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text
                style={{
                  color: COLORS.primary,
                  fontSizs: 14,
                  marginTop: 20,
                  fontWeight: 'bold',
                  marginLeft: 5,
                }}
              >
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

const { width, height } = Dimensions.get('window');
export default RegisterScreen;

const styles = StyleSheet.create({
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: '#7DE24E',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: 'white',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#dadae8',
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  successTextStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    padding: 30,
  },
    header: {
    backgroundColor: COLORS.primary,
    marginBotom: 25,
    borderBottomRightRadius: 100,
    borderBottomLeftRadius: 50
  },
});
