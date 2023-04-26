import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen, CreateReport, CategoryScreen, DetailsScreen } from '../screens';
import SeeallScreen from '../screens/SeeallScreen';

const HomeNavigator = () => {
  const HomeStack = createNativeStackNavigator();
  return (
    <HomeStack.Navigator initialRouteName="Home">
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Create Ad" component={CreateReport} />
      <HomeStack.Screen name="Category" component={CategoryScreen} />
      <HomeStack.Screen name="Details" component={DetailsScreen} />
      <HomeStack.Screen name="All items" component={SeeallScreen} />
    </HomeStack.Navigator>
  );
};

export default HomeNavigator;