import React, {useState, createRef} from 'react';
import {
  View,
  Text,
  ScrollView,
  StatusBar,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  ActivityIndicator,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import Input from '../component/Input';
import Loader from '../component/Loader';
import CustomBottom from '../component/CustomBottom';
import { COLORS } from '../constant/theme';
import images from '../constant/images';
import axios from 'axios';

const LoginScreen = ({navigation}) => {

 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const [message, SetMessage] = useState();
   const [messageType, SetMessageType] = useState();
  const [isRegistraionSuccess,setIsRegistraionSuccess] = useState(false);


   const handleSubmitButton = (credentials) => {
     setErrortext('');

     if (!email) {
       alert('Please fill Email');
       return;
     }
     if (!password) {
       alert('Please fill Password');
       return;
     }
  
     //Show Loader
     setLoading(true);
     let dataToSend = { email, password };
      let formBody = [];
      for (let key in dataToSend) {
        let encodedKey = encodeURIComponent(key);
        let encodedValue = encodeURIComponent(dataToSend[key]);
        formBody.push(encodedKey + '=' + encodedValue);
      }
      formBody = formBody.join('&');

     fetch('http://localhost:3000/api/user/login', {
      method: 'POST',
      body: formBody,
      headers: {
        //Header Defination
        'Content-Type':
        'application/x-www-form-urlencoded;charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        //Hide Loader
        setLoading(false);
        console.log(responseJson);
        // If server response message same as Data Matched
        if (responseJson.status === 'success') {
          AsyncStorage.setItem('user_id', responseJson.data.email);
          console.log(responseJson.data.email);
          navigation.replace('BottomTabNavigator');
        } else {
          setErrortext(responseJson.msg);
          console.log('Please check your email id or password');
        }
      })
      .catch((error) => {
        //Hide Loader
        setLoading(false);
        console.error(error);
      });
   };


  return (
    <View style={{ flex: 1, backgroundColor: COLORS.primary }}>
      <StatusBar backgroundColor={'#012454'} barStyle="white-content" />
      <Loader loading={loading} />
      <View style={{ marginTop: 20, justifyContent: 'center', alignItems: 'center' }}>
        <Image source={images.lost15} />
      </View>
      <View style={style.inputContainer}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            paddingTop: 15,
            marginHorizontal: 15,
          }}
        >
          <KeyboardAvoidingView enabled>
            <Text
              style={{ fontSize: 15, fontWeight: '600', textAlign: 'center', marginBottom: 20 }}
            >
              Login to get started
            </Text>
            <View style={{ marginBottom: 15 }}>
              <Input
                onChangeText={(email) => setEmail(email)}
                placeholder="Email"
                iconName="envelope-o"
                autoCapitalize="none"
                underlineColorAndroid="#f000"
                placeholderTextColor="#8b9cb5"
                keyboardType="email-address"
                returnKeyType="next"
              />
              <Input
                onChangeText={(password) => setPassword(password)}
                placeholder="Password"
                iconName="lock"
                password
                underlineColorAndroid="#f000"
                placeholderTextColor="#8b9cb5"
                returnKeyType="next"
                secureTextEntry={true}
              />
            </View>
            {errortext != '' ? <Text style={style.errorTextStyle}>{errorText}</Text> : null}
            <TouchableOpacity>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 13,
                  color: COLORS.primary,
                  fontWeight: '500',
                  marginBottom: 10,
                }}
              >
                Forgot password
              </Text>
            </TouchableOpacity>
            <CustomBottom title="Login" onPress={handleSubmitButton} />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 10,
              }}
            >
              <Text style={{ textAlign: 'center', fontSize: 12 }}>Dont have an account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 12,
                    color: COLORS.primary,
                    fontWeight: '500',
                  }}
                >
                  Register
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  inputContainer: {
    height: 800,
    width: '100%',
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 90,
    marginTop: 20,
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
});
export default LoginScreen; 