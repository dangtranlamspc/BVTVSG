import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ProductModel } from '../../../models/ProductModel';
import { useNavigation } from '@react-navigation/native';
import { productRef } from '../../../firebase/firebaseConfig';
import { Tabbar } from '@bsdaoquang/rncomponent';
import { fontFamilies } from '../../../contants/fontFamilies';
import { colors } from '../../../contants/colors';
import { TextComponents } from '../../../components';
import ProductItem from '../../../components/ProductItem';


type Props = {};

const ArrivalsProduct = (props: Props) => {
    const [products, setProducts] = useState<ProductModel[]>([]);

    const navigation: any = useNavigation();
  
    useEffect(() => {
      productRef
        .orderBy('createdAt','desc')
        .limit(2)
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
    <View style={{flex: 1}}>
      <Tabbar
        title="SẢN PHẨM MỚI"
        tabbarStylesProps={{paddingHorizontal: 16}}
        titleStyleProps={{fontFamily: fontFamilies.poppinsBold, fontSize: 20, color: colors.blue}}
        renderSeemore={<TextComponents text="Tất cả" color={colors.blue400} />}
        onSeeMore={() => navigation.navigate('ProductsNew')}
      />

      {products.length > 0 && (
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          data={products}
          renderItem={({item, index}) => (
            <View
              key={item.id}
              style={{
                marginLeft: 16,
                marginRight: index === products.length - 1 ? 16 : 0,
                shadowColor : '#000',
                            shadowOffset : {
                              width : 0,
                              height : 10,
                            },
                            shadowOpacity : .3,
                            shadowRadius: 10
              }}>
              <ProductItem product={item} />
            </View>
          )}
          keyExtractor={item => item.id}
        />
      )}
    </View>
  )
}

export default ArrivalsProduct