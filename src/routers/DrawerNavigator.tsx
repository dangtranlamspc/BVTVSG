import { View, Text } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import DrawerCustom from '../components/DrawerCustom';
import TabNavigator from './TabNavigator';
import { BSCTScreen, HomeScreens, ProductConTrungGiaDungScreen, ProductScreen, ProductsNongNghiepDoThiScreen, ProfilesScreen } from '../screens';
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
        <Drawer.Screen name='HomeScreens' component={TabNavigator}/>
        <Drawer.Screen name='ProductsNongNghiepDoThiScreen' component={ProductsNongNghiepDoThiScreen}/>
        <Drawer.Screen name='ProductConTrungGiaDungScreen' component={ProductConTrungGiaDungScreen}/>
        <Drawer.Screen name='BSCTScreen' component={BSCTScreen}/>
        <Drawer.Screen name='ProfilesScreen' component={ProfilesScreen} />
    </Drawer.Navigator>
  )
}

export default DrawerNavigator