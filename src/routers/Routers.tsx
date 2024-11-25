import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addAuth, authSelector } from '../redux/reducers/authReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { localDataNames } from '../contants/localDataNames';
import { syncLocalStorage } from '../redux/reducers/cartReducer';
import Splash from '../screens/Splash';
import MainNavigator from './MainNavigator';
import AuthNavigator from './AuthNavigator';

const Routers = () => {
    const [isWelcome , setIsWelcome] = useState(true);
    const dispatch = useDispatch();
    const user = useSelector(authSelector);
    useEffect(()=>{
        getInitData();
    }, []);
    const getInitData = async() => {
        await getAuthData()
        await getCartData();
        setIsWelcome(false)
    }
    const getAuthData = async () => {
        const res = await AsyncStorage.getItem(localDataNames.auth)
        if (res) {
        dispatch(addAuth(JSON.parse(res)))
        }
    }

  const getCartData = async () => {
    const res = await AsyncStorage.getItem(localDataNames.cart);
    if (res) {
      dispatch(syncLocalStorage(JSON.parse(res)));
    }
  };
  return (
    isWelcome  ? (
        <Splash/>
      ) : user.uid ? (
        <MainNavigator />
      ) : (
      <AuthNavigator/>
    )

    // isWelcome  ? (
    //   <Splash/>
    // ) : (
    //   <MainNavigator />
    // ) 
  )
}

export default Routers