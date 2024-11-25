import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ProductModel } from '../../models/ProductModel';
import { useNavigation } from '@react-navigation/native';
import { productRef } from '../../firebase/firebaseConfig';
import { Badge, globalStyles, Row, Section, Tabbar } from '@bsdaoquang/rncomponent';
import { colors } from '../../contants/colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { fontFamilies } from '../../contants/fontFamilies';
import { TextComponents } from '../../components';
import ProductNewItem from './components/ProductNewItem';
import { CartItem, cartSelector } from '../../redux/reducers/cartReducer';
import { useSelector } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ProductsNewScreen = () => {
  const [products, setProducts] = useState<ProductModel[]>([]);

  const navigation: any = useNavigation();

  const cartData: CartItem[] = useSelector(cartSelector);

  useEffect(() => {
    productRef
      .orderBy('createdAt','desc')
      .limit(3)
      .onSnapshot(snap => {
        if (snap.empty) {
          console.log(`Không tìm thấy sản phẩm!`);
        } else {
          const items: ProductModel[] = [];
          snap.forEach((item: any) =>
            items.unshift({
              id: item.id,
              ...item.data(),
            }),
          );

          setProducts(items);
        }
      });
  }, []);
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
            paddingTop: 50,
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
            <TextComponents
              text='SẢN PHẨM'
              styles={{
                fontSize : 24,
                fontFamily : fontFamilies.poppinsSemiBold,
                color : colors.blue600
              }}
            />
            <Badge count={cartData.length}>
                  <TouchableOpacity
                    style={[
                      globalStyles.center,
                      {
                        backgroundColor: colors.blue600,
                        borderRadius: 100,
                        width: 42,
                        height: 42,
                        padding : 0
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
        <View style={{flex: 1,paddingTop : 70, paddingLeft : 50}}>
            {products.length > 0 && (
                <FlatList
                    showsVerticalScrollIndicator = {false}
                    data={products}
                    renderItem={({item, index}) => (
                        <View
                          key={item.id}
                          style={{
                              paddingTop : 30,
                              marginLeft: 16,
                              marginRight: index === products.length - 1 ? 16 : 0,
                          }}>
                            <ProductNewItem product={item} />
                        </View>
                    )}
                    keyExtractor={item => item.id}
                />
            )}
        </View>
    </>
  )
}

export default ProductsNewScreen