import { View, Text, StyleProp, ViewStyle, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { ProductModel } from '../../../models/ProductModel';
import { sizes } from '../../../contants/sizes';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../../contants/colors';

type Props = {
    product: ProductModel;
    styles?: StyleProp<ViewStyle>;
    index?: number;
  };
  
const ProductNewItem = (props: Props) => {
    const {product, styles, index} = props;
  
    const WIDTH = (sizes.width - 10) / 2;
    const navigation: any = useNavigation();
  return (
    <View style ={{width : '100%' , padding : 10}}>
        <View style={{flexDirection : 'row' , justifyContent: 'space-between', alignItems : 'center', gap : 10}}>
          <TouchableOpacity
            onPress={() => navigation.navigate('ProductDetail', {id: product.id})} 
            style = {{
              width: '80%', shadowColor : '#000',
              shadowOffset : {
                width : 0,
                height : 10,
              },
              shadowOpacity : .3,
              shadowRadius: 10
            }}
          >
            <View style={{width : '100%', backgroundColor: '#fff', borderRadius : 20, overflow : 'hidden'}}>
              <Image style={{width : '100%', height: WIDTH * 1.5}} source={{uri : product.imageUrl}} />
              <Text style = {{fontWeight : 600, textAlign : 'center' , paddingVertical : 15, fontSize : 18, color: colors.blue600}}>{product.title}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
  )
}

export default ProductNewItem