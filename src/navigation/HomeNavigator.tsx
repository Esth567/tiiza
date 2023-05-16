import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  Dashboard,
  LostReport,
  ItemDetails,
  FoundReport,
  LostDetail,
} from '../screens';
import SeeallScreen from '../screens/SeeallScreen';

const HomeNavigator = () => {
  const HomeStack = createNativeStackNavigator();
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Dashboard">
      <HomeStack.Screen name="Dashboard" component={Dashboard} />
      <HomeStack.Screen name="Lostreport" component={LostReport} />
      <HomeStack.Screen name="LostDetail" component={LostDetail} />
      <HomeStack.Screen name="seeAll" component={SeeallScreen} />
      <HomeStack.Screen name="ItemDetails" component={ItemDetails} />
      <HomeStack.Screen name="FoundReport" component={FoundReport} />
    </HomeStack.Navigator>
  );
};

export default HomeNavigator;