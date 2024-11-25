import { View, Text, Dimensions, StyleSheet, Platform } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { colors } from '../contants/colors';
import HomeNavigator from './HomeNavigator';
import { Bag2, Global, Home2, Profile } from 'iconsax-react-native';
import ProductNavigator from './ProductNavigator';
import NotificationNavigator from './NotificationNavigator';
import ProfileNavigator from './ProfileNavigator';
import DrawerNavigator from './DrawerNavigator';
import ChatNavigator from './ChatNavigator';
import Material from 'react-native-vector-icons/MaterialCommunityIcons'
import { NavigationContainer } from '@react-navigation/native';
import TabButton from '../components/TabButton';


const Tab = createBottomTabNavigator();
const TabNavigator = () => {
    
    const tabs = [
      {
        id : 1,
        name : 'Product',
        screen : 'Product',
        icon : 'application',
        Component : ProductNavigator,
      },
      {
        id : 2,
        name : 'Chat',
        screen : 'Chat',
        icon : 'message-text',
        Component : ChatNavigator,
      },
      {
        id : 3,
        name : 'Home',
        screen : 'Home',
        icon : 'home',
        Component : HomeNavigator,
      },
      {
        id : 4,
        name : 'Activity',
        screen : 'Notifications',
        icon : 'bell',
        Component : NotificationNavigator,
      },
      {
        id : 5,
        name : 'Settings',
        screen : 'Settings',
        icon : 'cog',
        Component : ProfileNavigator,
      },

    ]
  return (
    // <Tab.Navigator
    //   safeAreaInsets={{
    //     bottom: 0,
    //   }}
    //   screenOptions={({route}) => ({
    //     headerShown : false,
    //     tabBarShowLabel:false,
    //     tabBarStyle: [
    //       styles.tabContainer,
    //       Platform.OS === 'ios' && {
    //         shadowOffset: { height: -2, width: 2 },
    //         shadowOpacity: 0.1,
    //         shadowRadius: 20,
    //       },
    //     ],
    //     tabBarItemStyle: {
    //       marginBottom: 7,
    //     },
    //     tabBarInactiveTintColor: 'gray',
    //     tabBarActiveTintColor: '#0071ff',
    // })}
    // >
    //   <Tab.Screen name="HomeTab" component={HomeNavigator}
    //       options={{
    //       tabBarIcon: ({ focused }) => (
    //         <Home2
    //           variant= {focused ? 'Bold' : 'Outline'}
    //           size={35}
    //           color={focused ? 'white' : colors.gray200}
    //         />
    //       ),
    //     }}
    //   >
    //   </Tab.Screen>
    //   <Tab.Screen name="ProductTab" component={ProductNavigator} 
    //       options={{
    //       tabBarIcon: ({ focused }) => (
    //         <Bag2
    //           variant= {focused ? 'Bold' : 'Outline'}
    //           size={35}
    //           color={focused ? 'white' : colors.gray200}
    //         />
    //       ),
    //     }}/>
    //   <Tab.Screen name="NotificationTab" component={NotificationNavigator} options={{
    //       tabBarIcon: ({ focused }) => (
    //         <Global
    //           variant= {focused ? 'Bold' : 'Outline'}
    //           size={35}
    //           color={focused ? 'white' : colors.gray200}
    //         />
    //       ),
    //     }}/>
    //   <Tab.Screen name="ProfileTab" component={ProfileNavigator} options={{
    //       tabBarIcon: ({ focused }) => (
    //         <Profile
    //           variant= {focused ? 'Bold' : 'Outline'}
    //           size={35}
    //           color={focused ? 'white' : colors.gray200}
    //         />
    //       ),
    //     }}/>

    // </Tab.Navigator>

      <Tab.Navigator
        initialRouteName={'Home'}
        screenOptions={{
          headerShown : false,
          tabBarStyle : styles.tabBar
        }}
      >
        {
          tabs.map((item, index)=> 
            <Tab.Screen 
              key={item.id}
              name={item.screen}
              component={item.Component}
              options={{
                tabBarShowLabel : false,
                tabBarButton : (props) => <TabButton item={item} {...props} />
              }}
            />
          )
        }
      </Tab.Navigator>


  )
}

export default TabNavigator

function getWidth() {
    let width = Dimensions.get("window").width
  
    // Horizontal Padding = 20...
    width = width - 80
  
    // Total five Tabs...
    return width / 5
  }
const styles = StyleSheet.create({
    iconContainer : {
        width : 30,
        height : 30,
        backgroundColor : colors.blue600,
        justifyContent : 'center',
        alignItems : 'center',
        borderRadius : 100
    },
    tabContainer: {
      position: 'absolute',
      width: '90%',
      borderRadius: 12,
      left: '5%',
      bottom: 20,
      backgroundColor: colors.blue600,
      height: 70,
    },
    label: {
      textTransform: 'capitalize',
      fontSize: 12,
    },
    tabBar : {
      backgroundColor : colors.blue600 ,
      height : 70,
      position : 'absolute',
      bottom : 25,
      marginHorizontal : 16,
      borderRadius : 16,
      justifyContent : 'center',
      alignItems : 'center',
      borderWidth : 0.5,
      borderColor : '#dadada',
      shadowColor : '#000',
      shadowOffset : {
        width : 0,
        height : 10,
      },
      shadowOpacity : .3,
      shadowRadius: 10
    }
})