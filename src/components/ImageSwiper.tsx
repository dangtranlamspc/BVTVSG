import { View, Text, Image } from 'react-native'
import React from 'react'
import { FileModel } from '../models/FileModel';
import { globalStyles } from '@bsdaoquang/rncomponent';
import { sizes } from '../contants/sizes';
import Swiper from "react-native-swiper";

type Props = {
    files: FileModel[];
  };
const ImageSwiper = (props: Props) => {
    const {files} = props
  return (
    <Swiper
        style={{zIndex: -1}}
        dotColor="white"
        activeDotColor="white"
        paginationStyle={{
          marginBottom: 20,
        }}
        activeDot={
          <View
            style={[
              globalStyles.center,
              {
                width: 16,
                height: 16,
                borderWidth: 1,
                borderColor: 'white',
                borderRadius: 12,
                marginHorizontal: 4,
              },
            ]}>
            <View
              style={{
                width: 8,
                height: 8,
                backgroundColor: 'white',
                borderRadius: 10,
              }}
            />
          </View>
        }>
        {files.length > 0 &&
          files.map(img => (
            <Image
              key={img.path}
              source={{
                uri: img.downloadUrl,
              }}
              style={{
                flex: 1,
                width: '100%',
                height: sizes.height * 0.5,
                resizeMode: 'cover',
              }}
            />
          ))}
      </Swiper>
  )
}

export default ImageSwiper