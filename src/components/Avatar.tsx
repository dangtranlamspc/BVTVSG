import { View, Text, Image } from 'react-native'
import React from 'react'
import { globalStyles } from '../styles/globalStyles'

type Props = {
    uid ?: string
}
const Avatar = (props: Props) => {
  return (
    <View>
      <Image source={{
        uri: 'https://wibu.com.vn/wp-content/uploads/2024/04/Monkey-D-Luffy.png'
      }}
      style = {[
        globalStyles.avatar
      ]}
      />
    </View>
  )
}

export default Avatar