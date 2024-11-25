import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChatScreens from '../screens/chats/ChatScreens';

const ChatNavigator = () => {
    const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name='ChatScreen' component={ChatScreens}/>
    </Stack.Navigator>
  )
}

export default ChatNavigator