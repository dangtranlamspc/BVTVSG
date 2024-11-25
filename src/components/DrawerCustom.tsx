import { View, Text, StyleSheet, Platform, StatusBar, TouchableOpacity, Image, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import RowConponents from './RowConponents'
import ButtonComponent from './ButtonComponent'
import TextComponents from './TextComponents'
import { globalStyles } from '../styles/globalStyles'
import auth from '@react-native-firebase/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { localDataNames } from '../contants/localDataNames'
import { authSelector, removeAuth } from '../redux/reducers/authReducer'
import { useDispatch, useSelector } from 'react-redux'
import { colors } from '../contants/colors'
import { userRef } from '../firebase/firebaseConfig'
import { UserModel } from '../models/UserModel'
import { fontFamilies } from '../contants/fontFamilies'
import { Bookmark2, Calendar, Logout, Message2, MessageQuestion, Setting2, Sms, User } from 'iconsax-react-native'

const DrawerCustom = ({navigation} : any) => {
  const user = useSelector(authSelector);
  const size = 20;
  const color = colors.gray;
  const dispatch = useDispatch()
  const handleSignOut = async () => {
    // await GoogleSignin.signOut();
    // await LoginManager.logOut();
    await auth().signOut()
    await AsyncStorage.removeItem(localDataNames.auth)
    dispatch(removeAuth({}));
  };
  const profileMenu = [
    {
      key: 'HomeScreens',
      title: 'TRANG CHỦ',
      icon: <User size={size} color={color} />,
    },
    // {
    //   key: 'ProductsScreen',
    //   title: 'SẢN PHẨM',
    //   icon: <Message2 size={size} color={color} />,
    // },
    {
      key: 'ProductsNongNghiepDoThiScreen',
      title: 'NÔNG NGHIỆP ĐÔ THỊ',
      icon: <Calendar size={size} color={color} />,
    },
    {
      key: 'ProductConTrungGiaDungScreen',
      title: 'CÔN TRÙNG GIA DỤNG',
      icon: <Bookmark2 size={size} color={color} />,
    },
    {
      key: 'ContactUs',
      title: 'TIN TỨC',
      icon: <Sms size={size} color={color} />,
    },
    {
      key: 'Settings',
      title: 'TIN NÔNG NGHIỆP',
      icon: <Setting2 size={size} color={color} />,
    },
    {
      key: 'bsct',
      title: 'BÁC SĨ CÂY TRỒNG',
      icon: <MessageQuestion size={size} color={color} />,
    },
    {
      key: 'media',
      title: 'MEDIA',
      icon: <MessageQuestion size={size} color={color} />,
    },
    {
      key: 'SignOut',
      title: 'ĐĂNG XUẤT',
      icon: <Logout size={size} color={color} />,
    },
  ];
  return (
    <View style = {[
      localStyles.container
    ]}>
      <TouchableOpacity
        onPress={() => {
          navigation.closeDrawer();
          navigation.navigate('ProfilesScreen', {
            screen: 'ProfilesScreen',
          });
        }}>
        {user.photoUrl ? (
          <Image source={{uri: user.photoUrl}} style={[localStyles.avatar]} />
        ) : (
          <View
            style={[localStyles.avatar, {backgroundColor: colors.blue600}]}>
            <TextComponents
              size={22}
              color={colors.white}
              text={
                user.displayName
                  ? user.displayName
                      .split(' ')
                      [user.displayName.split(' ').length - 1].substring(0, 1)
                  : ''
              }
            />
          </View>
        )}
        <TextComponents              
          styles= {{
            fontFamily : fontFamilies.robotoBold,
          }} 
          text={user.displayName} 
          size={26} 
        />
      </TouchableOpacity>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={profileMenu}
        style={{flex: 1, marginVertical: 20}}
        renderItem={({item, index}) => (
          <RowConponents
            styles={[localStyles.listItem]}
            onPress={
              item.key === 'SignOut'
                ? () => handleSignOut()
                : () => {
                    navigation.navigate(item.key)
                  }
            }>
            {item.icon}
            <TextComponents
              text={item.title}
              styles={localStyles.listItemText}
            />
          </RowConponents>
        )}
      />
      {/* <RowConponents>
        <TouchableOpacity
            onPress={async() => {
              await auth().signOut()
              await AsyncStorage.removeItem(localDataNames.auth)
              dispatch(removeAuth({}));
            }} 
          style={[globalStyles.button, {backgroundColor: '#00F8FF33', height : 'auto'}]}>
            <TextComponents color='#00F8FF' text='ĐĂNG XUẤT'/>
        </TouchableOpacity>
      </RowConponents> */}
    </View>
  )
}

export default DrawerCustom

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingVertical: Platform.OS === 'android' ? StatusBar.currentHeight : 48,
  },

  avatar: {
    width: 52,
    height: 52,
    borderRadius: 100,
    marginBottom: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  listItem: {
    paddingVertical: 12,
    justifyContent: 'flex-start',
  },

  listItemText: {
    paddingLeft: 12,
  },
});