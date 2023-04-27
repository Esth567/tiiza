import React from 'react';
// import CustomBottom from './constant';
import { View, TouchableOpacity, Text } from 'react-native';
import { COLORS } from '../constant/theme';

const CustomButton = ({ title, onPress = () => {} } : any) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={{
        height: 50,
        width: '100%',
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        borderRadius: 12,
        alignItems: 'center',
      }}
    >
      <Text style={{ color: COLORS.white, fontSize: 18, fontWeight: 'bold' }}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
