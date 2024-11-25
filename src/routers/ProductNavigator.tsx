import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProductScreen } from '../screens';
import TabNavigator from './TabNavigator';
import ProductsByCategories from '../screens/products/ProductsByCategories';

const ProductNavigator = () => {
    const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name='ProductsScreen' component={ProductScreen} />
        <Stack.Screen name='ProductsByCategories' component={ProductsByCategories} />
    </Stack.Navigator>
  )
}

export default ProductNavigator