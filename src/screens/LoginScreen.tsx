import React, { useState, createRef } from 'react';
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
  Alert,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import Input from '../component/Input';
import Loader from '../component/Loader';
import CustomBottom from '../component/CustomBotton';
import { COLORS } from '../constant/theme';
import images from '../constant/images';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {

  const API_URL = 'http://192.168.43.95:5000/api/v1/';

  const [isLoggedIn, setIsLogged] = useState();
 
  const dispatch = useDispatch();

      const SignupSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Please enter your email address'),
        password: Yup.string()
          .min(8)
          .required('Please enter your password')
          .matches(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
            'Password must contain minimum of 8 characters, at least one uppercase letter and one special character'
          ),
      });

    const handleSubmit = (values, { setSubmitting }) => {
          const { email, password } = values;
          if (values) {
            dispatch(login(values))
              .then(() => {
                Alert.alert('Check mail for verification');
                 navigation.navigate('SmsOtp', { phoneNumber: formattedValue });

              })
              .catch((error) => {
                setSubmitting(false);
              });
          }
    }

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={SignupSchema}
      onSubmit={handleSubmit}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        setFieldTouched,
        isSubmitting,
        handleSubmit,
        isValid,
      }) => (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
          <StatusBar backgroundColor={'#ffffff'} barStyle="dark-content" />
          <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{
              paddingTop: 60,
              marginHorizontal: 15,
            }}
          >
            <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 30 }}>
              <Image source={images.foundItem} style={{ height: 180, width: 130 }} />
            </View>
            <KeyboardAvoidingView enabled>
              <Text style={{ fontSize: 15, fontWeight: '600', marginBottom: 10 }}>
                Login to get started
              </Text>
              <View style={{ marginTop: 15 }}>
                <Input
                  underlineColorAndroid="#f000"
                  placeholder="Enter Email"
                  autoCapitalize="none"
                  iconName="envelope-o"
                  placeholderTextColor="#8b9cb5"
                  keyboardType="email-address"
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={() => setFieldTouched('email')}
                />
                {touched.email && errors.email && (
                  <Text style={{ color: COLORS.red, fontSize: 12, marginBottom: 10 }}>
                    {errors.email}
                  </Text>
                )}
                <Input
                  underlineColorAndroid="#f000"
                  placeholder="Password"
                  iconName="lock"
                  password
                  placeholderTextColor="#8b9cb5"
                  autoCapitalize="sentences"
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={() => setFieldTouched('password')}
                />
                {touched.password && errors.password && (
                  <Text style={{ color: COLORS.red, fontSize: 12, marginBottom: 10 }}>
                    {errors.password}
                  </Text>
                )}
              </View>
              <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                <Text
                  style={{
                    fontSize: 13,
                    color: COLORS.primary,
                  }}
                >
                  Forgot password?
                </Text>
                <TouchableOpacity>
                  <Text
                    style={{
                      fontSize: 13,
                      color: COLORS.primary,
                      fontWeight: '500',
                      marginLeft: 3,
                    }}
                  >
                    Reset
                  </Text>
                </TouchableOpacity>
              </View>
              <CustomBottom
                title="Login"
                disabled={isSubmitting}
                onPress={handleSubmit}
              />
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 10,
                }}
              >
                <Text style={{ textAlign: 'center', fontSize: 14, marginTop: 15 }}>
                  Dont have an account?
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: 14,
                      color: COLORS.primary,
                      fontWeight: '500',
                      marginTop: 15,
                    }}
                  >
                    Register
                  </Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
        </SafeAreaView>
      )}
    </Formik>
  );
};

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
