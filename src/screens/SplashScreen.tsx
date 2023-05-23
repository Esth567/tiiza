import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image, StatusBar } from 'react-native';
import { COLORS } from '../constant/theme';

import AsyncStorage from '@react-native-async-storage/async-storage';
import images from '../constant/images';

const SplashScreen = ({ navigation }) => {
  //State for ActivityIndicator animation
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      //Check if user_id is set or not
      //If not then send for Authentication
      //else send to Home Screen
      AsyncStorage.getItem('user_id').then((value) =>
        navigation.replace(value === null ? 'AuthNavigator' : 'BottomTabNavigator')
      );
    }, 5000);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
      <Image source={images.tiizLogo} style={{ width: '30%', resizeMode: 'contain' }} />
      <ActivityIndicator
        animating={animating}
        color="#FFFFFF"
        size="large"
        style={styles.activityIndicator}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
});

export default SplashScreen;
