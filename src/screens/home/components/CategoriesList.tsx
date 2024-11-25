import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { CategoryModel } from '../../../models/CategoryModel';
import { ProductModel } from '../../../models/ProductModel';
import { categoriesRef, productRef } from '../../../firebase/firebaseConfig';
import { Button, Tabbar } from '@bsdaoquang/rncomponent';
import { fontFamilies } from '../../../contants/fontFamilies';
import { TextComponents } from '../../../components';
import { colors } from '../../../contants/colors';

const CategoriesList = ({navigation} : any) => {
    const [categories, setCategories] = useState<CategoryModel[]>([]);

    const [products, setProducts] = useState<ProductModel[]>([]);

    const [filteredProducts, setFilteredProducts] = useState<ProductModel[]>([]);

    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    useEffect(()=>{
      const filtered = products.filter(product => {
        const matchesCategory = selectedCategory ? product.categories.includes(selectedCategory) : true;
      })
      setFilteredProducts(filtered);
    },[selectedCategory, products])

    useEffect(() => {
      categoriesRef
        .orderBy('updatedAt','desc')
        .onSnapshot(snap => {
          if (snap.empty) {
            console.log(`Products not found!`);
          } else {
            const items: CategoryModel[] = [];
            snap.forEach((item: any) =>
              items.push({
                id: item.id,
                ...item.data(),
              }),
            );
            setCategories(items);
          }
      });
    }, []);

    useEffect(() => {
      productRef
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
          title="DANH MỤC"
          tabbarStylesProps={{paddingHorizontal: 16}}
          titleStyleProps={{fontFamily: fontFamilies.poppinsBold, fontSize: 20, color: colors.blue}}
          renderSeemore={<TextComponents text="" color={colors.blue200} />}
          onSeeMore={() => {}}
        />
  
        {categories.length > 0 && (
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            data={categories}
            renderItem={({item, index}) => (
              <View
                key={item.id}
                style={{
                  marginLeft: 16,
                  marginRight: index === categories.length - 1 ? 16 : 0,
                }}>
                <Button
                  title={item.title}
                  onPress={() => {}}
                  color={colors.blue600}
                  styles={{
                    paddingVertical: 4,
                    paddingHorizontal: 20,
                    borderRadius:10
                  }}
                  inline
                />
              </View>
            )}
            keyExtractor={item => item.id}
          />
        )}
      </View>
  )
}

export default CategoriesList