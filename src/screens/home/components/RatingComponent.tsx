import { View, Text } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { Row, Space } from '@bsdaoquang/rncomponent';
import { Rating } from "react-native-ratings";

type Props = {
    id: string;
  };
const RatingComponent = (props: Props) => {
    const navigation: any = useNavigation();
  
  return (
    <Row
        justifyContent="flex-start"
        onPress={() => navigation.navigate('RatingScreen')}>
            <Rating
            startingValue={5}
            readonly
            ratingCount={5}
            ratingBackgroundColor="coral"
            imageSize={18}
            />
        <Space width={12} />
        {/* <TextComponents text={`(320 Người xem)`} size={14} /> */}
  </Row>
  )
}

export default RatingComponent