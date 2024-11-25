import { View, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ProductModel, SubProduct } from '../../models/ProductModel';
import { useDispatch, useSelector } from 'react-redux';
import { addcart, CartItem, cartSelector } from '../../redux/reducers/cartReducer';
import { useStatusBar } from '../../utils/useStatusBar';
import { productRef } from '../../firebase/firebaseConfig';
import firestore from '@react-native-firebase/firestore';
import { Badge, Button, Col, globalStyles, Row, Section, Space } from '@bsdaoquang/rncomponent';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { colors } from '../../contants/colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { sizes } from '../../contants/sizes';
import ImageSwiper from '../../components/ImageSwiper';
import { TextComponents } from '../../components';
import { fontFamilies } from '../../contants/fontFamilies';
import RatingComponent from '../home/components/RatingComponent';
import { Add, Minus } from 'iconsax-react-native';
import RenderHTML from 'react-native-render-html';
import WebView from 'react-native-webview';
const ProductDetail = ({navigation, route}: any) => {
    const {id} = route.params;
    // console.log(id)
  
    const [productDetail, setProductDetail] = useState<ProductModel>();
    const [subProducts, setSubProducts] = useState<SubProduct[]>([]);
    const [subProductSelected, setSubProductSelected] = useState<SubProduct>();
    const [count, setCount] = useState(1);
    const [sizeSelected, setSizeSelected] = useState('');


    const cartData: CartItem[] = useSelector(cartSelector);
    const dispatch = useDispatch();
  
    useStatusBar('dark-content');
  
    useEffect(() => {
      getProductDetail();
      getSubProducts();
    }, [id]);
  
    useEffect(() => {
      setCount(1);
      setSizeSelected('');
    }, [subProductSelected]);
  
    useEffect(() => {
      if (subProductSelected) {
        const item = cartData.find(
          element => element.id === subProductSelected.id,
        );
  
        if (item) {
          setCount(item.quantity);
        }
      }
    }, [cartData, subProductSelected]);
  
    const getProductDetail = () => {
      productRef.doc(id).onSnapshot((snap: any) => {
        if (snap.exists) {
          setProductDetail({
            id,
            ...snap.data(),
          });
        } else {
          setProductDetail(undefined);
        }
      });
    };
  
    const getSubProducts = async () => {
      try {
        const snap = await firestore()
          .collection('subProducts')
          .where('productId', '==', id)
          .get();
  
        if (snap.empty) {
          setSubProducts([]);
          setSubProductSelected(undefined);
        } else {
          const items: SubProduct[] = [];
  
          snap.forEach((item: any) => {
            items.push({
              id: item.id,
              ...item.data(),
            });
          });
  
          setSubProducts(items);
          setSubProductSelected(items[0]);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const handleAddToCard = (item: SubProduct) => {
      const data = {
        id: item.id,
        title: productDetail?.title,
        size: sizeSelected,
        quantity: count,
        description: productDetail?.description,
        color: item.color,
        price: item.price,
        imageUrl: item.imageUrl,
      };
  
      const sub: any = {...subProductSelected};
      sub.quantity = subProductSelected
        ? subProductSelected?.quantity - count
        : 0;
  
      dispatch(addcart(data));
  
      setSubProductSelected(sub);
    };
  
    const renderCartButton = () => {
      return (
        subProductSelected && (
          <Button
            disable={subProductSelected.quantity === 0}
            icon={<FontAwesome6 name="bag-shopping" size={18} color={'white'} />}
            inline
            onPress={() => handleAddToCard(subProductSelected)
            }
            color={colors.blue600}
            title={'THÊM'}
          />
        )
      );
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
            {subProductSelected && (
              <View
                style={{
                  width: sizes.width,
                  height: sizes.height * 0.5,
                }}>
                <ImageSwiper files={subProductSelected.files} />
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
            {productDetail && subProductSelected && (
              <Section styles={{paddingVertical: 12}}>
                <Row>
                  <Col>
                    <TextComponents
                      text={productDetail?.title}
                      font={fontFamilies.robotoBold}
                      size={20}
                      color={colors.blue600}
                    />
                    <TextComponents
                      text={productDetail.type}
                      color={colors.blue500}
                      styles={{paddingVertical: 8}}
                    />
                    <RatingComponent id={id} />
                  </Col>
                  <View>
                    <Row justifyContent="flex-end">
                      <Row
                        styles={{
                          backgroundColor: colors.blue600,
                          padding: 6,
                          borderRadius: 100,
                        }}>
                        <TouchableOpacity
                          disabled={subProductSelected.quantity === 0}
                          style={{paddingRight: 12}}
                          onPress={() => setCount(count + 1)}>
                          <Add size={24} color={colors.white} />
                        </TouchableOpacity>
                        <TextComponents text={count.toString()} size={16} color={colors.white} />
                        <TouchableOpacity
                          style={{paddingLeft: 12}}
                          disabled={count === 1}
                          onPress={() => setCount(count - 1)}>
                          <Minus
                            size={24}
                            color={count === 1 ? colors.white : colors.white}
                          />
                        </TouchableOpacity>
                      </Row>
                    </Row>
                    <Space height={12} />
                    <TextComponents
                      text={`${
                        subProductSelected.quantity > 0
                          ? 'Còn hàng'
                          : 'Không còn hàng'
                      } trong kho`}
                      font={fontFamilies.robotoMedium}
                      color={colors.blue500}
                    />
                  </View>
                </Row>
                <Space height={20} />
                {/* Sẽ cập nhật sau */}
                    {/* <Row wrap="wrap" justifyContent="flex-start">
                    <View
                        style={[
                          globalStyles.shadow,
                          {
                            marginHorizontal: 12,
                            padding: 12,
                            borderRadius: 100,
                            backgroundColor: 'white',
                          },
                        ]}>
                        {subProducts.length > 0 &&
                          subProducts.map((item, index )=> (
                            <TouchableOpacity
                              onPress={() => setSubProductSelected(item)}
                              key={item.id}
                              style={[
                                globalStyles.center,
                                {
                                  width: 24,
                                  height: 24,
                                  borderRadius: 100,
                                  backgroundColor: item.color,
                                  marginVertical: 4,
                                  borderWidth: 1,
                                  borderColor: '#e0e0e0',
                                },
                              ]}>
                              {item.color === subProductSelected.color && (
                                <MaterialCommunityIcons
                                  name="check"
                                  size={18}
                                  color="white"
                                />
                              )}
                            </TouchableOpacity>
                          ))}
                    </View>
                  </Row> */}
                <Space height={20} />
                <TextComponents
                  font={fontFamilies.robotoBold}
                  text="Nhãn phụ"
                  color={colors.blue600}
                  size={18}
                />
                <Space height={8} />
                <View 
                >
                  <RenderHTML
                      WebView={WebView}
                      contentWidth={Dimensions.get('window').width}
                      source={{html : productDetail.description}}
                      tagsStyles={{
                        p: { textAlign: 'justify', margin: 0, marginBottom: 10 , fontSize : 16},
                        strong: { fontWeight: 'bold',color: 'rgb(68,114,196)' , fontSize : 18},
                        table: { borderWidth: 1, borderColor: colors.gray600, marginBottom: 10, marginVertical: 10 },
                        td: { padding: 5, borderWidth: 1, borderColor: colors.gray600 , fontSize : 16, textAlign:'center'},
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
        </ScrollView>
        <Section styles={{backgroundColor: 'white', paddingTop: 12}}>
          <Row>
            <Col>
              {subProductSelected && count && (
                <>
                  <TextComponents
                    text="Tổng giá: "
                    size={12}
                    color={colors.blue400}
                  />
                  <TextComponents
                    text={`${count * parseFloat(subProductSelected.price)} đ`}
                    size={24}
                    font={fontFamilies.poppinsBold}
                    color={colors.blue600}
                  />
                </>
              )}
            </Col>
            <Col>{renderCartButton()}</Col>
          </Row>
        </Section>
      </>
  )
}

export default ProductDetail