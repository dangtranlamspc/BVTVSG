import { View, Text, TouchableOpacity, ScrollView, Image, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { CTGDModel } from '../../models/CTGDModel';
import { CartItem, cartSelector } from '../../redux/reducers/cartReducer';
import { useDispatch, useSelector } from 'react-redux';
import { ctgdRef } from '../../firebase/firebaseConfig';
import { useStatusBar } from '../../utils/useStatusBar';
import { Badge, Col, globalStyles, Row, Section, Space } from '@bsdaoquang/rncomponent';
import { colors } from '../../contants/colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { sizes } from '../../contants/sizes';
import { TextComponents } from '../../components';
import { fontFamilies } from '../../contants/fontFamilies';
import RenderHTML from 'react-native-render-html';
import WebView from 'react-native-webview';
import RatingComponent from '../home/components/RatingComponent';

const ProductsCTGDScreenDetail = ({navigation, route}: any) => {
  const {id} = route.params;

  const [productCTGDDetail, setProductCTGDDetail] = useState<CTGDModel>();

  const cartData: CartItem[] = useSelector(cartSelector);

  const dispatch = useDispatch();

  useStatusBar('dark-content');

  useEffect(() => {
    getProductCTGDDetail();
  }, [id]);

  const getProductCTGDDetail = () => {
    ctgdRef.doc(id).onSnapshot((snap: any) => {
      if (snap.exists) {
        setProductCTGDDetail({
          id,
          ...snap.data(),
        });
      } else {
        setProductCTGDDetail(undefined);
      }
    });
  };
  return (
    <>
        <Section
          styles={{
            zIndex: 5,
            position: 'absolute',
            top: 10,
            right: 0,
            left: 0,
            padding: 20,
            paddingTop: 50
          }}>
          <Row
            styles={{backgroundColor: 'transparent'}}
            justifyContent="space-between">
            <TouchableOpacity
              style={[
                globalStyles.center,
                {
                  backgroundColor: colors.blue600,
                  borderRadius: 100,
                  padding: 0,
                  width: 38,
                  height: 38,
                },
              ]}
              onPress={() => navigation.goBack()}>
              <MaterialIcons
                style={{marginLeft: 8}}
                name="arrow-back-ios"
                size={22}
                color={colors.white}
              />
            </TouchableOpacity>
            <Badge count={cartData.length}>
              <TouchableOpacity
                style={[
                  globalStyles.center,
                  {
                    backgroundColor: colors.blue600,
                    borderRadius: 100,
                    padding: 0,
                    width: 38,
                    height: 38,
                  },
                ]}
                onPress={() => navigation.navigate('CartScreen')}>
                <MaterialCommunityIcons
                  name="shopping"
                  size={22}
                  color={colors.white}
                />
              </TouchableOpacity>
            </Badge>
          </Row>
        </Section>
        <ScrollView
          style={[
            
            globalStyles.container,

            {backgroundColor: 'white', flexGrow: 1, paddingTop: 90},
          ]}>
          <View
            style={[
              globalStyles.container,
              {
                height: sizes.height * 0.5,
              },
            ]}>
            {productCTGDDetail && (
              <View
                style={{
                  width: sizes.width,
                  height: sizes.height * 0.5,
                }}>
                <Image
                  style = {{
                    width: sizes.width,
                    height: sizes.height * 0.5
                  }} 
                  source={{uri : productCTGDDetail.imageUrl}} />
              </View>
            )}
          </View>
          <View
            style={[
              globalStyles.container,
              {
                borderTopRightRadius: 20,
                borderTopLeftRadius: 20,
                // marginTop: -20,
                backgroundColor: 'white',
              },
            ]}>
            {productCTGDDetail && (
              <Section styles={{paddingVertical: 12}}>
                <Row>
                  <Col>
                    <TextComponents
                      text={productCTGDDetail?.title}
                      font={fontFamilies.robotoBold}
                      size={20}
                      color={colors.blue600}
                    />
                    <TextComponents
                      text={productCTGDDetail.type}
                      color={colors.blue500}
                      styles={{paddingVertical: 8}}
                    />
                    <RatingComponent id={id} />
                  </Col>
                </Row>
                <Space height={20} />
                <TextComponents
                  font={fontFamilies.robotoBold}
                  text="Nhãn phụ"
                  color={colors.blue600}
                  size={18}
                />
                <Space height={8} />
                <View>
                  <RenderHTML
                      WebView={WebView}
                      contentWidth={Dimensions.get('window').width}
                      source={{html : productCTGDDetail.description}}
                      tagsStyles={{
                        p: { textAlign: 'justify', margin: 0, marginBottom: 10 , fontSize : 16},
                        strong: { fontWeight: 'bold', color: 'rgb(68,114,196)' , fontSize : 18},
                        table: { borderWidth: 1, borderColor: colors.gray600, marginBottom: 10, marginVertical: 10 },
                        td: { padding: 5, borderWidth: 1, borderColor: colors.gray600 , fontSize : 16},
                        th: { borderWidth: 1, borderColor: '#000000', padding: 8, backgroundColor: '#f2f2f2' },
                        figure: { margin: 0, padding: 0 },
                        img: { width: '100%', height: 'auto' },
                        span: { backgroundColor: 'transparent' },
                      }}
                    />
                </View>

                <View style={{
                  height : 60
                }}>
                </View>
              </Section>
            )}
          </View>
          <View style={{height : 30}}></View>
        </ScrollView>
        {/* <View style={{height : 30}}></View> */}
      </>
  )
}

export default ProductsCTGDScreenDetail