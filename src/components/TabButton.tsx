import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native'
import React, { useEffect, useRef } from 'react'
import Material from 'react-native-vector-icons/MaterialCommunityIcons'
import { opacity } from 'react-native-reanimated/lib/typescript/Colors'

const TabButton = ({item,accessibilityState, onPress} : any) => {
  const animatedValues = {
    translate : useRef(new Animated.Value(0)).current,
    scale : useRef(new Animated.Value(0)).current,
  }

  const {translate,scale} = animatedValues

  useEffect(() => {
    handleAnimated()
  }, [accessibilityState.selected])

  const handleAnimated = () => {
    Animated.parallel([
      Animated.timing(translate , {
        toValue : accessibilityState.selected ? 1 : 0,
        duration : 400,
        useNativeDriver : false
      }),
      Animated.timing(scale, {
        toValue : accessibilityState.selected ? 1 : 0 ,
        duration : 250,
        useNativeDriver: false
      })
    ]).start()
  }

  const translateStyles = {
    transform : [
      {
        translateY : translate.interpolate({
          inputRange : [0 , 1],
          outputRange : [0, -30],
          extrapolate : 'clamp'
        })
      }
    ]
  }
  
  const scaleStyles = {
    opacity : scale.interpolate({
      inputRange : [.5, 1],
      outputRange : [.5 , 1],
      extrapolate : 'clamp'
    }),
    transform : [
      {
        scale: scale
      }
    ]
  }

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
       <Animated.View style={[styles.button, translateStyles]}>
          <Animated.View 
            style={[{
              width : 50, 
              height : 50 , 
              borderRadius : 100, 
              position : 'absolute',
              backgroundColor : '#0d6efd'
            }, scaleStyles]} 
          />
          <Material name={item.icon} color={accessibilityState.selected ? '#fff' : '#fff'} size={30} />
       </Animated.View>
    </TouchableOpacity>
  )
}

export default TabButton
const styles = StyleSheet.create({
    container : {
        flex : 1,
        justifyContent : 'center',
        alignItems :'center',
        height : 70,
        alignSelf: 'stretch',
    },
    button : {
        width : 50,
        height : 50,
        borderRadius : 25,
        borderWidth : 4,
        borderColor : '#0a58ca',
        justifyContent : 'center',
        alignItems: 'center',
        overflow : 'hidden'
    }
})