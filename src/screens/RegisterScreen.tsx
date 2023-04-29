import React, { useState, createRef } from 'react';
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
import Loader from '../component/Loader';
import Input from '../component/Input';
import client from '../Api/client';
import CustomButton from '../component/CustomBottom';
import { COLORS } from '../constant/theme';
import images from '../constant/images';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Verification from './Verification';

const RegisterScreen = ({props, navigation}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const [isRegistraionSuccess, setIsRegistraionSuccess] = useState(false);
  


  const handleSubmitButton = () => {
    setErrortext('');
    if (!fullName) {
      alert('Please fill Name');
      return;
    }
    if (!email) {
      alert('Please fill Email');
      return;
    }
    if (!phone) {
      alert('Please fill phone');
      return;
    }
    if (!password) {
      alert('Please fill Address');
      return;
    }
    if (!confirmPassword) {
      alert('Please confirm Password');
      return;
    }
     if (!location) {
       alert('Please fill location');
       return;
     }
    //Show Loader
    setLoading(true);
    const payload = {
      fullName,
      email,
      phone,
      password,
      confirmPassword,
      location,
    }; 
      fetch('http://192.168.43.95:5000/api/v1/register', {
        method: 'post',
        headers: {
          //Header Defination
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
        .then((response) => response.json())
        .then((responseJson) => {
          //Hide Loader
          setLoading(false);
          console.log(responseJson);
          // If server response message same as Data Matched
          if (responseJson.status === 'success') {
            setIsRegistraionSuccess(true);
            console.log('Registration Successful. Please Login to proceed');
            navigation.navigate('Verification');
          } else {
            setErrortext(responseJson.msg);
          }
        })
        .catch((error) => {
          //Hide Loader
          setLoading(false);
          console.error(error);
        });
  };
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
        <Text style={styles.successTextStyle}>Registration Successful</Text>
        <TouchableOpacity
          style={styles.buttonStyle}
          activeOpacity={0.5}
          onPress={() => props.navigation.dispatch('LoginScreen')}
        >
          <Text style={styles.buttonTextStyle}>Login Now</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
      <Loader loading={loading} />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          justifyContent: 'center',
          alignContent: 'center',
          marginHorizontal: 15,
          marginTop: 30,
        }}
      >
        <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
          <Image source={images.lost12} />
        </View>

        <KeyboardAvoidingView enabled>
          <View style={{ marginBottom: 15 }}>
            <Text style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 10 }}>
              Register to get started
            </Text>
            <Input
              onChangeText={(fullName) => setFullName(fullName)}
              iconName="user-o"
              underlineColorAndroid="#f000"
              placeholder="Enter full Name"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              returnKeyType="next"
              blurOnSubmit={false}
            />
            <Input
              onChangeText={(email) => setEmail(email)}
              underlineColorAndroid="#f000"
              placeholder="Enter Email"
              autoCapitalize="none"
              iconName="envelope-o"
              placeholderTextColor="#8b9cb5"
              keyboardType="email-address"
              returnKeyType="next"
              blurOnSubmit={false}
            />
            <Input
              onChangeText={(phone) => setPhone(phone)}
              iconName="mobile"
              underlineColorAndroid="#f000"
              placeholder="Enter phonenumber"
              placeholderTextColor="#8b9cb5"
              keyboardType="numeric"
              returnKeyType="next"
              blurOnSubmit={false}
            />
            <Input
              onChangeText={(password) => setPassword(password)}
              underlineColorAndroid="#f000"
              placeholder="Password"
              iconName="lock"
              password
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              returnKeyType="next"
              blurOnSubmit={false}
            />
            <Input
              onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}
              underlineColorAndroid="#f000"
              placeholder="Confirm password"
              iconName="lock"
              password
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              returnKeyType="next"
              blurOnSubmit={false}
            />
            <Input
              onChangeText={(location) => setLocation(location)}
              underlineColorAndroid="#f000"
              placeholder="State"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              returnKeyType="next"
              blurOnSubmit={false}
            />
          </View>
          {errortext != '' ? <Text style={styles.errorTextStyle}>{errortext}</Text> : null}
          <CustomButton title="Register" onPress={handleSubmitButton} />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 80,
            }}
          >
            <Text style={{ fontSize: 12 }}>Already register?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={{ color: COLORS.primary, fontSizs: 12 }}>Login</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

const {width, height} = Dimensions.get('window');
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
});
