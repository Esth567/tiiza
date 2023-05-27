import React, { useContext, useState, useEffect } from 'react';
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
  TextInput,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  ActivityIndicator,
  Button,
  Keyboard,
  Alert,
} from 'react-native';
import { COLORS } from '../constant/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import Input from '../component/Input'
import CustomBotton from '../component/CustomBotton';
import Loader from '../component/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons';
import axios from 'axios';

const SignUp = ({ navigation }) => {
  const [inputs, setInputs] = React.useState({
    email: '',
    fullName: '',
    phone: '',
    password: '',
    confirmPassword: '',
    location: '',
  });

  const [errors, setErrors] = React.useState({});
  const [Loading, setLoading] = React.useState(false);
  const [registerStatus, setRegisterStatus] = React.useState('');
  const [message, setMessage] = useState('');

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
    if (!inputs.fullName) {
      handleError('Please input First Name', 'fullName');
      valid = false;
    }
    if (!inputs.phone) {
      handleError('Please input phone number', 'phone');
      valid = false;
    }
    if (!inputs.password) {
      handleError('Please input password', 'password');
      valid = false;
    } else if (inputs.password.length < 8) {
      handleError('Min password length of 8', 'password');
      valid = false;
    }
       if (!inputs.confirmPassword) {
         handleError('Please confirm password', 'confirmPassword');
         valid = false;
       }
          if (!inputs.location) {
            handleError('Please enter your location', 'location');
            valid = false;
          }

    if (valid) {
      register();
    }
  };

  const register = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);

      fetch('http://192.168.43.95:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inputs),
      })
        .then(async (res) => {
          console.log(res);
          try {
            const jsonRes = await res.json();
            if (res.status !== 200) {
              setErrors(true);
              setMessage(jsonRes.message);
            } else {
              setErrors(false);
              setMessage(jsonRes.message);
            }
            navigation.navigate('Login');
          } catch (err) {
            console.log(err);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }, 3000);
  };

  const getMessage = () => {
    const status = error ? `Error: ` : `Success: `;
    return status + message;
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
        <Text style={{ paddingTop: 20, color: COLORS.black, ...FONTS.h1, fontWeight: 'bold' }}>
          Sign Up
        </Text>
        <Text style={{ paddingTop: 5, color: COLORS.black, ...FONTS.body4 }}>
          Signup and get started
        </Text>
        <View style={{ marginVertical: 20, paddingTop: 10 }}>
          <Input
            placeholder="Enter email"
            iconName="email"
            autoCapitalize="none"
            error={errors.email}
            onFocus={() => {
              handleError(null, 'email');
            }}
            onChangeText={(text) => handleOnChange(text, 'email')}
          />
          <Input
            placeholder="FullName"
            iconName="person-outline"
            error={errors.fullName}
            onFocus={() => {
              handleError(null, 'fullName');
            }}
            onChangeText={(text) => handleOnChange(text, 'fullName')}
          />
          <Input
            keyboardType="numeric"
            placeholder="PhoneNumber"
            iconName="phone"
            error={errors.phone}
            onFocus={() => {
              handleError(null, 'phone');
            }}
            onChangeText={(text) => handleOnChange(text, 'phone')}
          />
          <Input
            placeholder="Password"
            iconName="lock-outline"
            password
            error={errors.password}
            onFocus={() => {
              handleError(null, 'password');
            }}
            onChangeText={(text) => handleOnChange(text, 'password')}
          />
          <Input
            placeholder="Confirm Password"
            iconName="lock-outline"
            password
            error={errors.confirmPassword}
            onFocus={() => {
              handleError(null, 'confirmPassword');
            }}
            onChangeText={(text) => handleOnChange(text, 'confirmPassword')}
          />
          <Input
            placeholder="State"
            iconName="lock-outline"
            password
            error={errors.location}
            onFocus={() => {
              handleError(null, 'location');
            }}
            onChangeText={(text) => handleOnChange(text, 'location')}
          />
        </View>
        <View style={{ flexDirection: 'row', paddingTop: 2 }}>
          <TouchableOpacity
            style={{
              height: 18,
              width: 19,
              backgroundColor: COLORS.white,
              borderRadius: SIZES.radius / 10,
              borderWidth: 1,
              marginTop: 0.2,
              marginRight: 7,
              borderColor: COLORS.primary,
            }}
          ></TouchableOpacity>
          <Text style={{ color: COLORS.black, ...FONTS.body4, marginTop: 0.2 }}>
            By signing you accept the
          </Text>
          <Text style={{ color: COLORS.red, ...FONTS.body4, paddingLeft: 3, marginTop: 0.2 }}>
            Terms of service
          </Text>
          <Text style={{ color: COLORS.black, ...FONTS.body4, paddingLeft: 3, marginTop: 0.2 }}>
            and
          </Text>
        </View>
        <Text style={{ color: COLORS.red, ...FONTS.body4, paddingLeft: 27 }}>Private Policy</Text>
        <CustomButton title="Sign Up" onPress={validate} />
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
          <Text style={{ color: COLORS.black, ...FONTS.body4, paddingLeft: 50 }}>
            Already have an account?
          </Text>
          <TouchableOpacity>
            <Text
              onPress={() => navigation.navigate('Login')}
              style={{ color: COLORS.primary, ...FONTS.body4 }}
            >
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default SignUp;
