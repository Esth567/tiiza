import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Dashboard, Report, CategoryScreen, DetailsScreen, ItemDetails } from '../screens';
import SeeallScreen from '../screens/SeeallScreen';

const HomeNavigator = () => {
  const HomeStack = createNativeStackNavigator();
  return (
    <HomeStack.Navigator screenOptions={(headerShown = false)} initialRouteName="Dashboard">
      <HomeStack.Screen name="Dashboard" component={Dashboard} />
      <HomeStack.Screen name="Report" component={Report} />
      <HomeStack.Screen name="Category" component={CategoryScreen} />
      <HomeStack.Screen name="Details" component={DetailsScreen} />
      <HomeStack.Screen name="All items" component={SeeallScreen} />
      <HomeStack.Screen name="ItemDetails" component={ItemDetails} />
    </HomeStack.Navigator>
  );
};

export default HomeNavigator;