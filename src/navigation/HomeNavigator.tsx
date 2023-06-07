import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  Dashboard,
  LostReport,
  ItemDetails,
  FoundReport,
  LostDetail,
  LostItems,
  Found,
  Location,
} from '../screens';


const HomeNavigator = () => {
  const HomeStack = createNativeStackNavigator();
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Dashboard">
      <HomeStack.Screen name="Dashboard" component={Dashboard} />
      <HomeStack.Screen name="Lostreport" component={LostReport} />
      <HomeStack.Screen name="LostDetail" component={LostDetail} />
      <HomeStack.Screen name="LostItems" component={LostItems} />
      <HomeStack.Screen name="ItemDetails" component={ItemDetails} />
      <HomeStack.Screen name="FoundReport" component={FoundReport} />
      <HomeStack.Screen name="Found" component={Found} />
      <HomeStack.Screen name="Location" component={Location} />
    </HomeStack.Navigator>
  );
};

export default HomeNavigator;