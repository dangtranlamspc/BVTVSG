import { View, Text, useWindowDimensions, StyleSheet, ActivityIndicator } from 'react-native'
import React from 'react'
import { colors } from '../contants/colors';

const LoaderCompoents = ({visible = false}) => {
    const {width, height} = useWindowDimensions();
  return (
    visible && (
        <View style={[style.container, {height, width}]}>
          <View style={style.loader}>
            <ActivityIndicator size="large" color={colors.blue} />
            <Text style={{marginLeft: 10, fontSize: 16}}>Đang tải</Text>
          </View>
        </View>
      )
  )
}

export default LoaderCompoents

const style = StyleSheet.create({
    loader: {
      height: 70,
      backgroundColor: colors.white,
      marginHorizontal: 50,
      borderRadius: 5,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 20,
    },
    container: {
      position: 'absolute',
      zIndex: 10,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'center',
    },
  });