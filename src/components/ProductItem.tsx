import { View, Text, StyleProp, ViewStyle, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { ProductModel } from '../models/ProductModel';
import { sizes } from '../contants/sizes';
import { useNavigation } from '@react-navigation/native';
import { globalStyles, Space } from '@bsdaoquang/rncomponent';
import TextComponents from './TextComponents';
import { fontFamilies } from '../contants/fontFamilies';

type Props = {
    product: ProductModel;
    styles?: StyleProp<ViewStyle>;
    index?: number;
  };
  
const ProductItem = (props: Props) => {
    const {product, styles, index} = props;
  
    const WIDTH = (sizes.width - 48) / 2;
    const navigation: any = useNavigation();
  return (
    <TouchableOpacity
        onPress={() => navigation.navigate('ProductDetail', {id: product.id})}
        style={[
          {
            width: (sizes.width - 48) / 2,
            marginLeft: index ? (index % 2 !== 0 ? 16 : 0) : 0,
            marginBottom: 16,
          },
          styles,
        ]}>
        <Image
          source={{uri: product.imageUrl}}
          style={{
            flex: 1,
            width: WIDTH,
            height: WIDTH + 15,
            maxWidth: 220,  
            maxHeight: 220,
            borderRadius: 12,
            resizeMode: 'cover',
          }}
        />
        <View style={[globalStyles.center]}>
          <Space height={8} />
          <TextComponents
            text={product.title}
            size={18}
            numberOfLine={1}
            font={fontFamilies.poppinsBold}
            color="#0063c7"
          />
          {/* <TextComponent
            text={product.type}
            color={colors.gray2}
            numberOfLine={1}
          /> */}
          {/* <TextComponent
            text={`${(product.price).toLocaleString()}đ`}
            size={20}
            font={fontFamilies.poppinsSemiBold}
          /> */}
        </View>
      </TouchableOpacity>
  )
}

export default ProductItem