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
} from 'react-native';
import Input from '../component/Input';
import Loader from '../component/Loader';
import CustomBottom from '../component/CustomBottom';

const RegisterScreen = () => {

  const [userFullname, setUserFullname] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhoneNumber, setUserPhoneNumber] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [isRegistraionSuccess,setIsRegistraionSuccess] = useState(false);

  const fullnameInputRef = createRef();
  const emailInputRef = createRef();
  const phonenumberInputRef = createRef();
  const passwordInputRef = createRef();

  return (
    <View style={{ flex: 1, backgroundColor: '#012454' }}>
      <StatusBar backgroundColor={'#012454'} barStyle="dark-content" />
      <View style={style.inputContainer}>
       <Loader loading={loading} />
      <ScrollView 
          contentContainerStyle={{
          paddingTop: 30,
          marginHorizontal: 10,
        }}>
          <Text style={{fontSize: 17, fontWeight: '600'}}>Create an account to get started</Text>
        <View style={{paddingTop: 20}}>
        <Input
           onChangeText={(UserFullname) => setUserFullname(UserFullname)}
           placeholder="Fullname"
           underlineColorAndroid="#f000"
           placeholderTextColor="#8b9cb5"
           autoCapitalize="sentences"
           returnKeyType="next"
           onSubmitEditing={() =>
                emailInputRef.current && emailInputRef.current.focus()
              }
              blurOnSubmit={false}
          />
          <Input
           onChangeText={(UserEmail) => setUserEmail(UserEmail)}
           placeholder="Email"
           underlineColorAndroid="#f000"
           placeholderTextColor="#8b9cb5"
           keyboardType="email-address"
           ref={emailInputRef}
           returnKeyType="next"
           onSubmitEditing={() =>
                passwordInputRef.current &&
                passwordInputRef.current.focus()
              }
              blurOnSubmit={false}
          />
          <Input 
           onChangeText={(UserPhonenumber) => setUserPhoneNumber(UserPhonenumber)}
           placeholder="PhoneNumber"
           underlineColorAndroid="#f000"
           placeholderTextColor="#8b9cb5"
           ref={phonenumberInputRef}
           returnKeyType="next"
           onSubmitEditing={() =>
                passwordInputRef.current &&
                passwordInputRef.current.focus()
              }
              blurOnSubmit={false}
          />
          <Input 
           onChangeText={(UserPassword) => setUserPassword(UserPassword)}
           placeholder="Password"
           underlineColorAndroid="#f000"
           placeholderTextColor="#8b9cb5"
           ref={passwordInputRef}
           returnKeyType="next"
           secureTextEntry={true}
           onSubmitEditing={Keyboard.dismiss}
            blurOnSubmit={false}
          />
        </View> 
        <CustomBottom title='Register' /> 
       <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{textAlign: 'center', fontSize: 12}}>Already have account?</Text>
       </View>
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
    borderWidth: 1,
    marginTop: 80,
  },
});
export default RegisterScreen; 