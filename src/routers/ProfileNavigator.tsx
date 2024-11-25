import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProfilesScreen } from '../screens';

const ProfileNavigator = () => {
    const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name='ProfilesScreen' component={ProfilesScreen}/>
    </Stack.Navigator>
  )
}

export default ProfileNavigator