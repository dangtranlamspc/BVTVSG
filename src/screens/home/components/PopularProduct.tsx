import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ProductModel } from '../../../models/ProductModel';
import { useNavigation } from '@react-navigation/native';
import { productRef } from '../../../firebase/firebaseConfig';
import { Card, Col, Row, Space, Tabbar } from '@bsdaoquang/rncomponent';
import { fontFamilies } from '../../../contants/fontFamilies';
import { colors } from '../../../contants/colors';
import { TextComponents } from '../../../components';
import AntDesign from 'react-native-vector-icons/AntDesign';

type Props = {};

const PopularProduct = (props: Props) => {
    const [products, setProducts] = useState<ProductModel[]>([]);

  const navigation: any = useNavigation();

  useEffect(() => {
    productRef
      .orderBy('selled','desc')
      .limit(3)
      .onSnapshot(snap => {
        if (snap.empty) {
          console.log(`Không tìm thấy sản phẩm!`);
        } else {
          const items: ProductModel[] = [];
          snap.forEach((item: any) =>
            items.push({
              id: item.id,
              ...item.data(),
            }),
          );

          setProducts(items);
        }
      });
  }, []);

  return (
<View style={{flex: 1}}>
      <Tabbar
        title="SẢN PHẨM PHỔ BIẾN"
        tabbarStylesProps={{paddingHorizontal: 16}}
        titleStyleProps={{fontFamily: fontFamilies.poppinsBold, fontSize: 20, color:colors.blue}}
        renderSeemore={<TextComponents text="Tất cả" color={colors.blue400} />}
        onSeeMore={() => {}}
      />

      {products.length > 0 &&
        products.map(item => (
          <Card
            styles={{
              shadowColor : '#000',
                            shadowOffset : {
                              width : 0,
                              height : 10,
                            },
                            shadowOpacity : .3,
                            shadowRadius: 10
            }}
            key={item.id}
            onPress={() => navigation.navigate('ProductDetail', {id: item.id})}>
            <Row>
              <Image
                source={{uri: item.imageUrl}}
                style={{
                  width: 100,
                  height: 120,
                  borderRadius: 8,
                }}
              />
              <Col styles={{paddingHorizontal: 12}}>
                <TextComponents
                  text={item.title}
                  font={fontFamilies.poppinsBold}
                  size={16}
                  color={colors.blue}
                />
                <TextComponents
                  text={item.type}
                  color={colors.blue500}
                  styles={{paddingVertical: 4}}
                />
                <Row justifyContent="flex-start">
                  <AntDesign name="star" color={colors.warning} size={18} />
                  <Space width={8} />
                  <TextComponents color={colors.blue500} text={`${item.rate}`} />
                </Row>
              </Col>
              {/* <TextComponents
                text={`${item.price}đ`}
                font={fontFamilies.poppinsSemiBold}
                size={18}
                color={colors.blue500}
              /> */}
            </Row>
          </Card>
        ))}
    </View>
  )
}

export default PopularProduct