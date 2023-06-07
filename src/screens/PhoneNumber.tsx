import React, { useState, useRef } from 'react';
import { SafeAreaView, StyleSheet, View, TouchableOpacity, Text, Dimensions } from 'react-native';
import { COLORS } from '../constant/theme';
import PhoneInput, { isValidNumber } from 'react-native-phone-number-input';

const WIDTH = Dimensions.get('window').width + 80;
const inputWidth = Math.round(WIDTH * 75);

const PhoneNumber = ({ navigation }) => {

 const [value, setValue] = useState('');
 const [formattedValue, setFormattedValue] = useState('');
 const [phoneNumber, setPhoneNumber] = useState('');
  const [valid, setValid] = useState(false);
 const [showMessage, setShowMessage] = useState(false);

  const phoneInput = useRef<PhoneInput>(null);


 return (
   <View style={styles.container}>
       <PhoneInput
       ref={phoneInput}
       defaultValue={phoneNumber}
       defaultCode="NG"
       layout="first"
       onChangeText={(text) => {
         setValue(text);
       }}
       onChangeFormattedText={(text) => {
         const checkValid = phoneInput.current?.isValidNumber(value);
         setShowMessage(true);
         setValid(checkValid ? checkValid : false);
         setFormattedValue(text);
       }}
       autoFocus
       containerStyle={{
         borderRadius: 18,
         borderWidth: 0.5,
         height: 50,
         borderColor: COLORS.gray,
         width: '100%',
       }}
       textInputStyle={{ height: 45 }}
       textContainerStyle={{
         borderBottomRightRadius: 20,
         borderTopRightRadius: 20,
         color: COLORS.gray,
       }}
     />
   </View>
 );
}; 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginBottom: 10
  },
  button: {
    marginTop: 20,
    height: 50,
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#7CDB8A',
    shadowColor: 'rgba(0,0,0,0.4)',
    shadowOffset: {
      width: 1,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },

  buttonText: {
    color: 'white',
    fontSize: 14,
  },

  welcome: {
    padding: 20,
  },

  status: {
    padding: 20,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'flex-start',
    color: 'gray',
  },
inputContainer: {
    height: 45,
    borderWidth: 1,
    borderRadius: 18,
    paddingHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
  },
});

export default PhoneNumber;