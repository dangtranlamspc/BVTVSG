import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreens } from '../screens';

const HomeNavigator = () => {
    const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="HomeScreens" component={HomeScreens}/>
    </Stack.Navigator>
  )
}

export default HomeNavigator
