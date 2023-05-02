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

const RegisterScreen = ({navigation} :any) => {

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phonenumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const [isRegistraionSuccess,setIsRegistraionSuccess] = useState(false);


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
     if (!phonenumber) {
       alert('Please fill Phonenumber');
       return;
     }
     if (!password) {
       alert('Please fill Password');
       return;
     }
      if (!confirmPassword) {
        alert('Please fill Confirm Password');
        return;
      }
      if (!location) {
        alert('Please fill Location');
        return;
      }
     //Show Loader
     setLoading(true);
     const dataToSend = {
       fullName,
       email,
       phonenumber,
       password,
       confirmPassword,
       location
     };
   
     fetch('http://localhost:5000/api/v1/register', {
       method: 'POST',
       body: JSON.stringify(dataToSend),
       headers: {
         //Header Defination
         'Content-Type': 'application/json',
       },
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
         <Text style={style.successTextStyle}>Registration Successful</Text>
         <TouchableOpacity
           style={style.buttonStyle}
           activeOpacity={0.5}
           onPress={() => props.navigation.navigate('Login')}
         >
           <Text style={style.buttonTextStyle}>Login Now</Text>
         </TouchableOpacity>
       </View>
     );
   }


  return (
    <View style={{ flex: 1, backgroundColor: COLORS.primary }}>
      <StatusBar backgroundColor={'#012454'} barStyle="white-content" />
      <Loader loading={loading} />
      <View style={{ marginTop: 20, justifyContent: 'center', alignItems: 'center' }}>
        <Image source={images.lost15} style={{backgroundColor: COLORS.transparent}} />
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
              Create an account to get started
            </Text>
            <View style={{ marginBottom: 15 }}>
              <Input
                onChangeText={(fullName) => setFullName(fullName)}
                placeholder="Fullname"
                iconName="user-o"
                underlineColorAndroid="#f000"
                placeholderTextColor="#8b9cb5"
                autoCapitalize="sentences"
                returnKeyType="next"
              />
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
                onChangeText={(phonenumber) => setPhoneNumber(phonenumber)}
                placeholder="PhoneNumber"
                keyboardType="numeric"
                iconName="mobile"
                underlineColorAndroid="#f000"
                placeholderTextColor="#8b9cb5"
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
              <Input
                onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}
                placeholder="Confirm password"
                iconName="lock"
                password
                underlineColorAndroid="#f000"
                placeholderTextColor="#8b9cb5"
                returnKeyType="next"
                secureTextEntry={true}
              />
              <Input
                onChangeText={(location) => setLocation(location)}
                placeholder="Fullname"
                iconName="user-o"
                underlineColorAndroid="#f000"
                placeholderTextColor="#8b9cb5"
                autoCapitalize="sentences"
                // returnKeyType="next"eeeeee
              />
            </View>
            {errortext != '' ? <Text style={style.errorTextStyle}>{errortext}</Text> : null} 
            <CustomBottom title="Register" onPress={handleSubmitButton} />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 10,
              }}
            >
              <Text style={{ textAlign: 'center', fontSize: 12 }}>Already have account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 12,
                    color: COLORS.primary,
                    fontWeight: '500',
                  }}
                >
                  Login
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
    marginTop: 20
  },
});
export default RegisterScreen; 