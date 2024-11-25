import { View, Text, StyleProp, ViewStyle, TouchableOpacity, Image, Dimensions } from 'react-native'
import React from 'react'
import { BSCTModel } from '../models/BSCTModel';
import { sizes } from '../contants/sizes';
import { useNavigation } from '@react-navigation/native';
import { Space } from '@bsdaoquang/rncomponent';
import TextComponents from './TextComponents';
import { fontFamilies } from '../contants/fontFamilies';
import RenderHTML from 'react-native-render-html';
import WebView from 'react-native-webview';

type Props = {
    bsct: BSCTModel;
    styles?: StyleProp<ViewStyle>;
    index?: number;
  };
  
const BSCTItem = (props: Props) => {
    const {bsct, styles, index} = props;
  
    const WIDTH = (sizes.width - 40) / 2;
    const navigation: any = useNavigation();
  return (
    <TouchableOpacity
        onPress={() => navigation.navigate('BSCTDetail', {id: bsct.id})}
        style={[
          {
            width: (sizes.width + 200) / 2,
            marginLeft: index ? (index % 2 !== 0 ? 16 : 0) : 0,
            marginBottom: 16,
            alignItems : 'center',
            paddingTop:10
          },
          styles,
        ]}>
        <Image
          source={{uri: bsct.imageUrl}}
          style={{
            flex: 1,
            width: WIDTH+170,
            height: WIDTH+50,
            maxWidth: 500,
            maxHeight: 320,
            borderRadius: 12,
            resizeMode: 'cover',
          }}
        />
        <View>
            <Space height={8} />
            <TextComponents
                text={bsct.title}
                size={18}
                numberOfLine={1}
                font={fontFamilies.poppinsBold}
            />
            <Space height={8}/>
            <View>
                  <RenderHTML
                      WebView={WebView}
                      contentWidth={Dimensions.get('window').width}
                      source={{html : bsct.shortDesc}}
                      tagsStyles={{
                        p: { textAlign: 'justify', margin: 0, marginBottom: 10 },
                        strong: { fontWeight: 'bold'},
                        table: { borderWidth: 1, borderColor: '#ddd', marginBottom: 10, marginVertical: 10 },
                        td: { padding: 5, borderWidth: 1, borderColor: '#ddd' },
                        th: { borderWidth: 1, borderColor: '#000000', padding: 8, backgroundColor: '#f2f2f2' },
                        figure: { margin: 0, padding: 0 },
                        img: { width: '100%', height: 'auto' },
                        span: { backgroundColor: 'transparent' },
                      }}
                />
            </View>
        </View>
      </TouchableOpacity>
  )
}

export default BSCTItem