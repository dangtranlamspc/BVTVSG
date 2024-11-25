import { View, Text, useWindowDimensions, Image, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BSCTModel } from '../../../models/BSCTModel';
import { useNavigation } from '@react-navigation/native';
import { bsctRef } from '../../../firebase/firebaseConfig';
import { Card, Col, Tabbar } from '@bsdaoquang/rncomponent';
import { fontFamilies } from '../../../contants/fontFamilies';
import { colors } from '../../../contants/colors';
import { TextComponents } from '../../../components';
import RenderHTML from 'react-native-render-html';
import WebView from 'react-native-webview';

const ArrivalsHDKT = () => {
    const [bscts, setBscts] = useState<BSCTModel[]>([]);

  const navigation: any = useNavigation();

  const {width} = useWindowDimensions();
  
  useEffect(() => {
    bsctRef
      .orderBy('createdAt','desc')
      .limit(2)
      .onSnapshot(snap => {
        if (snap.empty) {
          console.log(`Không tìm thấy dữ liệu!`);
        } else {
          const items: BSCTModel[] = [];
          snap.forEach((item: any) =>
            items.push({
              id: item.id,
              ...item.data(),
            }),
          );

          setBscts(items);
        }
      });
  }, []);
  return (
<View style={{flex: 1}}>
      <Tabbar
        title="HƯỚNG DẪN KỸ THUẬT"
        tabbarStylesProps={{paddingHorizontal: 16}}
        titleStyleProps={{fontFamily: fontFamilies.poppinsBold, fontSize: 20, color: colors.blue}}
        renderSeemore={<TextComponents text="" color={colors.blue400} />}
        onSeeMore={() => navigation.navigate('BSCTScreen')}
      />

      {bscts.length > 0 &&
        bscts.map(item => (
          <Card
            styles={{
              borderRadius : 8,
              // backgroundColor: colors.danger
              shadowColor : '#000',
                            shadowOffset : {
                              width : 0,
                              height : 10,
                            },
                            shadowOpacity : .3,
                            shadowRadius: 10
            }}
            key={item.id}
            onPress={() => navigation.navigate('BSCTDetail', {id: item.id})}
          >
            <Col>
              <Image
                source={{uri : item.imageUrl}}
                style={{
                  width: width - 60,
                  height: width-200,
                  borderRadius: 8,
                }}
              />
              <View style={{paddingTop:5}}>
                <TextComponents
                  text={item.title}
                  font={fontFamilies.poppinsBold}
                  size={20}
                  color={colors.blue}
                />
              </View>
              <View style={{paddingTop : 5}}>
                  <RenderHTML
                      WebView={WebView}   
                      contentWidth={Dimensions.get('window').width}
                      source={{html : item.shortDesc}}
                      tagsStyles={{
                        p: { textAlign: 'justify', margin: 0, marginBottom: 10 },
                        strong: { fontWeight: 'bold',color: 'rgb(68,114,196)' },
                        table: { borderWidth: 1, borderColor: '#ddd', marginBottom: 10, marginVertical: 10 },
                        td: { padding: 5, borderWidth: 1, borderColor: '#ddd' },
                        th: { borderWidth: 1, borderColor: '#000000', padding: 8, backgroundColor: '#f2f2f2' },
                        figure: { margin: 0, padding: 0 },
                        img: { width: '100%', height: 'auto' },
                        span: { backgroundColor: 'transparent' },
                      }}
                    />
                </View>
            </Col>
          </Card>
        ))}
    </View>
  )
}

export default ArrivalsHDKT