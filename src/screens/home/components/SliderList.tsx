import { View, Text, Dimensions, Image, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SlidersModel } from '../../../models/SliderModel';
import { sliderRef } from '../../../firebase/firebaseConfig';
import Carousel from 'react-native-reanimated-carousel';

type Props = {};

const SliderList = (props: Props) => {
    const [sliders, setSliders] = useState<SlidersModel[]>([]);
    const windowWidth = Dimensions.get('window').width;
    const width = Dimensions.get('window').width

    useEffect(() => {
        sliderRef
        .orderBy('createdAt','desc')
        .onSnapshot(snap => {
            if (snap.empty) {
            console.log(`Không tìm thấy dữ liệu!`);
            } else {
            const items: SlidersModel[] = [];
            snap.forEach((item: any) =>
                items.push({
                id: item.id,
                ...item.data(),
                }),
            );

            setSliders(items);
            }
        });
    }, []);
  return (
    <View>
      <Carousel
        loop
        width={width}
        height={width / 2}
        autoPlay={true}
        data={sliders}
        scrollAnimationDuration={1000}
        renderItem={({item}) => (
          <Image source={{ uri: item.imageUrl }}
            style={{
              margin:2,
              height:  Platform.OS === 'ios' ? Dimensions.get('screen').height*0.2 : Dimensions.get('screen').height*0.9 - 700,
              width: Dimensions.get('screen').width*1 - 5,
              borderRadius: 10
             }}
          />
        )}
      />
    </View>
  )
}

export default SliderList