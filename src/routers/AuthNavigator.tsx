import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeAuth from '../screens/auth/HomeAuth'
import { Login, Result, SignUp } from '../screens'

const AuthNavigator = () => {
    const Stack = createNativeStackNavigator()
  return (
    <>
        <Stack.Navigator screenOptions={{headerShown : false}}>
            <Stack.Screen name='HomeAuth' component={HomeAuth} />
            <Stack.Screen name='Login' component={Login} />
            <Stack.Screen name='SignUp' component={SignUp} />
            <Stack.Screen name='Result' component={Result} />
        </Stack.Navigator>
    </>
  )
}

export default AuthNavigator