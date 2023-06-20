import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  Dashboard,
  ReportLostItems,
  Details,
  FoundReport,
  LostDetail,
  LostItems,
  ItemsFound,
  Location,
  Chat,
  Messaging,
} from '../screens';


const HomeNavigator = () => {
  const HomeStack = createNativeStackNavigator();
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Dashboard">
      <HomeStack.Screen name="Dashboard" component={Dashboard} />
      <HomeStack.Screen name="Report Lost Items" component={ReportLostItems} />
      <HomeStack.Screen name="LostDetail" component={LostDetail} />
      <HomeStack.Screen name="LostItems" component={LostItems} />
      <HomeStack.Screen name="Details" component={Details} />
      <HomeStack.Screen name="FoundReport" component={FoundReport} />
      <HomeStack.Screen name="Items Found" component={ItemsFound} />
      <HomeStack.Screen name="Location" component={Location} />
      <HomeStack.Screen name="Chat" component={Chat} />
      <HomeStack.Screen name="Messaging" component={Messaging} />
    </HomeStack.Navigator>
  );
};

export default HomeNavigator;