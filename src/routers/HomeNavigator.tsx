import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreens } from '../screens';
import FilterScreen from '../screens/home/FilterScreen';
import ResultScreen from '../screens/home/ResultScreen';

const HomeNavigator = () => {
    const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name='HomeScreens' component={HomeScreens}/>
    </Stack.Navigator>
  )
}

export default HomeNavigator