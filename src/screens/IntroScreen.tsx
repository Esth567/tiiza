import React, { useState, useEffect } from 'react';
import { ActivityIndicator, View, StyleSheet, Image, Text, StatusBar, TouchableOpacity, SafeAreaView  } from 'react-native';
import { COLORS } from '../constant/theme';
import Swiper from 'react-native-swipe-image';

import AsyncStorage from '@react-native-async-storage/async-storage';
import images from '../constant/images';

const IntroScreen = ({ navigation }) => {

    
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'#012454'} barStyle="white-content" />
      <Image
        source={images.lost12}
        style={{ width: '90%', resizeMode: 'contain', marginTop: 30 }}
      />
      <Text style={{ color: COLORS.primary, fontSize: 18, fontWeight: 'bold', marginTop: 30 }}>
        Looking for your
      </Text>
      <Text style={{ color: COLORS.primary, fontSize: 18, fontWeight: 'bold', marginBottom: 20 }}>
        lost item?
      </Text>
      <Text style={{ color: COLORS.primary, fontSize: 13, marginBottom: 50 }}>
        Trust us with the finding of your lost item
      </Text>
      <TouchableOpacity
        style={styles.skipeContainer}
        onPress={() => navigation.navigate('Register')}
      >
        <Text style={{ color: COLORS.white, fontSize: 13, fontWeight: 'bold', marginTop: 15, textAlign: 'center' , justifyContent: 'center'}}>
          Skipe
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => navigation.navigate('Login')}
        style={{
          height: 45,
          width: '85%',
          backgroundColor: COLORS.primary,
          justifyContent: 'center',
          borderRadius: 12,
          alignItems: 'center',
          marginTop: 50,
        }}
      >
        <Text style={{ color: COLORS.white, fontSize: 15, fontWeight: 'bold' }}>Continue</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default IntroScreen;

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
  skipeContainer: {
    height: 35,
    width: '20%',
    backgroundColor: COLORS.primary,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    justifyContent: 'center',
  },
});
