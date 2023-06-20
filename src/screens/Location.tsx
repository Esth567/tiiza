import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MapView from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { COLORS } from '../constant/theme';

const Location = () => {
 return (
    <View style={{flex: 1, backgroundColor: COLORS. white}}>
      <Text>Location</Text>
    </View>
  )
};

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
}); 

export default Location;
