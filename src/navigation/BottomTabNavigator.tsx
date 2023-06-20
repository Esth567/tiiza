import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Image, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS } from '../constant/theme';
import SubscriptionScreen from '../screens/SubscriptionScreen';
import HomeNavigator from './HomeNavigator';
import {  HelpScreen, ReportLostItems } from '../screens';


const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        style: {
          borderTopWidth: 0,
          elevation: 0,
          height: 55,
        },
        ShowLabel: false,
        activeTintColor: COLORS.primary,
      }}
    >
      <Tab.Screen
        name="HomeNavigator"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => <Icon name="home" color={color} size={28} />,
        }}
      />
      <Tab.Screen
        name="LostReport"
        component={ReportLostItems}
        options={{
          tabBarIcon: ({ color }) => <Icon name="person-circle" color={color} size={20} />,
        }}
      />
      <Tab.Screen
        name="Help"
        component={HelpScreen}
        options={{
          tabBarIcon: ({ color }) => <Icon name="handshake-angle" color={color} size={25} />,
        }}
      />
      <Tab.Screen
        name="Subscription"
        component={SubscriptionScreen}
        options={{
          tabBarIcon: ({ color }) => <Icon name="rectangle-list" color={color} size={25} />,
        }}
      />
    </Tab.Navigator>
  );
};

const style = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.primary,
  },
});

export default BottomTabNavigator;
