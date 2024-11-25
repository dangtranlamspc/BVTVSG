import { View,  StyleProp, ViewStyle, TouchableOpacity, Image, Text } from 'react-native'
import React from 'react'
import { NNDTModel } from '../models/NNDTModel';
import { sizes } from '../contants/sizes';
import { useNavigation } from '@react-navigation/native';
import { globalStyles, Space } from '@bsdaoquang/rncomponent';
import TextComponents from './TextComponents';
import { fontFamilies } from '../contants/fontFamilies';
import { colors } from '../contants/colors';

type Props = {
    nndt: NNDTModel;
    styles?: StyleProp<ViewStyle>;
    index?: number;
  };

const ProductsNNDTItem = (props: Props) => {
    const {nndt, styles, index} = props;
    const WIDTH = (sizes.width - 48) / 2;
    const navigation: any = useNavigation();
  return (
    <View style ={{width : '100%' , padding : 10}}>
        <View style={{flexDirection : 'row' , justifyContent: 'space-between', alignItems : 'center', gap : 10}}>
          <TouchableOpacity
            onPress={() => navigation.navigate('ProductsNongNghiepDoThiDetailScreen', {id: nndt.id})} 
            style = {{
              width: '80%', 
              shadowColor : '#000',
              shadowOffset : {
                width : 0,
                height : 10,
              },
              shadowOpacity : .3,
              shadowRadius: 10
            }}
          >
            <View style={{width : '100%', backgroundColor: '#fff', borderRadius : 20, overflow : 'hidden'}}>
              <Image style={{width : '100%', height: WIDTH * 1.5}} source={{uri : nndt.imageUrl}} />
              <Text style = {{fontWeight : 600, textAlign : 'center' , paddingVertical : 15, fontSize : 18, color: colors.blue600}}>{nndt.title}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
  )
}

export default ProductsNNDTItem