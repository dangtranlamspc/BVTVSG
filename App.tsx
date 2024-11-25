import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { Provider } from 'react-redux'
import store from './src/redux/store'
import Routers from './src/routers/Routers'

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar translucent backgroundColor={'transparent'} barStyle={'dark-content'}/>
      <Provider store={store}>
        <Routers/>
      </Provider>
    </NavigationContainer>
  )
}

export default App