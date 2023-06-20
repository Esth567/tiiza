import React, { useContext, useState, useEffect, useRef } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  ActivityIndicator,
  Button,
  Keyboard,
  Alert,
} from 'react-native';
import { COLORS, images } from '../constant/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import Input from '../component/Input';
import CustomButton from '../component/CustomButton';
import Loader from '../component/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons';
import axios from 'axios';
import PhoneInput, { isValidNumber } from 'react-native-phone-number-input';


const LoginScreen = ({ navigation }) => {
  const [inputs, setInputs] = React.useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = React.useState({});
  const [value, setValue] = useState('');
  const [Loading, setLoading] = React.useState(false);
  const [registerStatus, setRegisterStatus] = React.useState('');
  const [message, setMessage] = useState('');
  const phoneInput = useRef<PhoneInput>(null);
  const [errortext, setErrortext] = useState('');
  const [isRegistraionSuccess, setIsRegistraionSuccess] = useState(false);

  const validate = () => {
    setMessage('');
    Keyboard.dismiss();
    let valid = true;
    if (!inputs.email) {
      handleError('Please enter email', 'email');
      valid = false;
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      handleError('Please input valid email', 'email');
      valid = false;
    }
    if (!inputs.password) {
      handleError('Please input password', 'password');
      valid = false;
    } else if (inputs.password.length < 8) {
      handleError('Min password length of 8', 'password');
      valid = false;
    }
    if (valid) {
      login();
    }
  };

  const login = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);

      fetch('http://192.168.43.95:5000/api/v1/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inputs),
      })
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson); 
             navigation.navigate('BottomTabNavigator');    
        })
        .catch((error) => {
          console.log('Error');
        });
    }, 3000);
  };

  const handleOnChange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const handleError = (errorMessage, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
  };

  return (
    <View style={{ backgroundColor: COLORS.white, flex: 1, paddingTop: 3 }}>
      <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
      <Loader visible={Loading} />
      <ScrollView
        contentContainerStyle={{
          paddingTop: 30,
          paddingHorizontal: 20,
        }}
      >
        <Text style={{ paddingTop: 20, color: COLORS.black, fontSize: 18, fontWeight: 'bold' }}>
          Login
        </Text>
        <Text style={{ paddingTop: 5, color: COLORS.black, fontSize: 15 }}>
          Login and get started
        </Text>
        <View style={{ marginVertical: 20, paddingTop: 10 }}>
          <Input
            placeholder="Enter email"
            iconName="envelope-o"
            autoCapitalize="none"
            error={errors.email}
            onFocus={() => {
              handleError(null, 'email');
            }}
            onChangeText={(text) => handleOnChange(text, 'email')}
          />
          <Input
            placeholder="Password"
            iconName="lock"
            password
            error={errors.password}
            onFocus={() => {
              handleError(null, 'password');
            }}
            onChangeText={(text) => handleOnChange(text, 'password')}
          />
        </View>
        {errortext != '' ? <Text style={styles.errorTextStyle}>{errortext}</Text> : null}
        <View style={{ flexDirection: 'row', marginBottom: 20 }}>
          <Text style={{ color: COLORS.black, fontSize: 14, marginTop: 0.2 }}>
            Forgot password?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
            <Text
              style={{ color: COLORS.primary, fontSize: 14, paddingLeft: 3, fontWeight: 'bold' }}
            >
              Reset
            </Text>
          </TouchableOpacity>
        </View>
        <CustomButton title="Login" onPress={validate} />
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
          <Text style={{ color: COLORS.black, fontSize: 14, paddingLeft: 50 }}>
            Don't have account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text
              style={{ color: COLORS.primary, fontSize: 14, marginLeft: 5, fontWeight: 'bold' }}
            >
              Register
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
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
  successTextStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    padding: 30,
  },
});

export default LoginScreen;
