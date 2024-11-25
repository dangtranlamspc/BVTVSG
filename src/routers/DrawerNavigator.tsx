import { View, Text } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import DrawerCustom from '../components/DrawerCustom';
import TabNavigator from './TabNavigator';
import { ProductScreen, ProductsNongNghiepDoThiScreen } from '../screens';
import { colors } from '../contants/colors';

const DrawerNavigator = () => {
    const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
        screenOptions={{
            headerShown : false,
            drawerPosition  : 'left',
        }}
        drawerContent={props => <DrawerCustom {...props} />}
    >
        <Drawer.Screen name='TRANG CHỦ' component={TabNavigator}/>
        <Drawer.Screen name='SẢN PHẨM NÔNG NGHIỆP' component={ProductsNongNghiepDoThiScreen}/>
    </Drawer.Navigator>
  )
}

export default DrawerNavigator