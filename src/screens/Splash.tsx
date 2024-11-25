import { View, Text, ImageBackground } from 'react-native'
import React from 'react'
import Lottieview from 'lottie-react-native'
import { globalStyles } from '../styles/globalStyles'

const Splash = () => {
  return (
    <ImageBackground 
        style={[globalStyles.container, globalStyles.center]}
        source={require('../assets/images/background.png')}
        imageStyle = {{
            flex : 1,
            resizeMode : 'cover'
        }}
    >
        <Lottieview 
            source={require('../assets/lottie/loading1.json')}
            autoPlay
            style={{
                width : 450,
                height : 450
            }}
        />
        <Lottieview
            source={require('../assets/lottie/plash.json')}
            autoPlay
            style={{
                width : 200,
                height : 200
            }}
        />
    </ImageBackground>
  )
}

export default Splash