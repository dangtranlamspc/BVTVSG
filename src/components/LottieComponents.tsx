import { View, Text } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native'

const LottieComponents = () => {
  return (
    <View style={{alignItems : 'center',paddingTop : 50}}>
      <LottieView
          source={require('../assets/lottie/Loading.json')}
          autoPlay
          style={{
            width : 100,
            height: 100,
          }}
      />
    </View>
  )
}

export default LottieComponents