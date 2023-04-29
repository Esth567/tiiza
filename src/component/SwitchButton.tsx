import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, Dimension } from 'react-native';

const {width, height} = Dimension.get('window');

const SwitchButton = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View style={{width: width * 40, height: height * 20 }}></View>
    </View>
  )
}

export default SwitchButton;

