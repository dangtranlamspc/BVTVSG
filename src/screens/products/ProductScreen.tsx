import { View, Text, TextInput, FlatList, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ProductModel } from '../../models/ProductModel';
import { CategoryModel } from '../../models/CategoryModel';
import { sizes } from '../../contants/sizes';
import { useNavigation } from '@react-navigation/native';
import { categoriesRef, productRef } from '../../firebase/firebaseConfig';
import { Badge, Button, Card, Col, globalStyles, Row, Section, Space, Tabbar } from '@bsdaoquang/rncomponent';
import LottieComponents from '../../components/LottieComponents';
import { fontFamilies } from '../../contants/fontFamilies';
import { colors } from '../../contants/colors';
import { TextComponents } from '../../components';
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { HambergerMenu } from 'iconsax-react-native';
import Avatar from '../../components/Avatar';
import { CartItem, cartSelector } from '../../redux/reducers/cartReducer';
import { useSelector } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

type Props = {};

const ProductScreen = (props : Props) => {
  const [products, setProducts] = useState<ProductModel[]>([]);

  const [categories, setCategories] = useState<CategoryModel[]>([]);

  const [filteredProducts, setFilteredProducts] = useState<ProductModel[]>([]);

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const WIDTH = (sizes.width * 0.6);

  const [searchQuery, setSearchQuery] = useState('');

  const navigation : any = useNavigation();

  const [isLoading, setIsLoading] = useState('')

  const cartData: CartItem[] = useSelector(cartSelector);

  useEffect(() => {
    const filtered = products.filter(product => {
      const matchesCategory = selectedCategory ? product.categories.includes(selectedCategory) : true;
      const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
    setFilteredProducts(filtered);
  }, [selectedCategory, searchQuery, products]);

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
      .orderBy('createdAt', 'desc')
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
  return isLoading ?(
    <Section>
      <LottieComponents/>
    </Section> 
    ) : (
    <View style={{flex: 1, paddingTop : 60}}>
            <Section styles={{
              paddingBottom : 15,
              borderRadius: 10,
            }}>
              <Row justifyContent='space-between'>
                <TouchableOpacity
                  style={[
                    globalStyles.center,
                    {
                      backgroundColor: colors.blue600,
                      borderRadius: 100,
                      padding: 0,
                      width: 48,
                      height: 48,
                    },
                  ]}
                  onPress={() => navigation.openDrawer()}>
                  <FontAwesome
                    name="bars"
                    size={24}
                    color={colors.white}
                  />
                </TouchableOpacity>
                {/* <Button
                  styles = {{
                  width : 48,
                  height : 48
                  }}
                  icon = {<HambergerMenu size={24} color='white'/>}
                  color={colors.blue}
                  onPress={() => navigation.openDrawer()}
                /> */}
                <TextComponents
                  text='SẢN PHẨM'
                  styles={{
                    fontSize : 24,
                    fontWeight : 600,
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
                        width: 48,
                        height: 48,
                        padding : 0,
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
            <View style={{
                  display:'flex',
                  flexDirection:'row',
                  gap:5,
                  alignItems:'center',
                  borderWidth : 2,
                  borderColor:colors.gray700,
                  padding:15,
                  borderRadius: 9,
                  marginBottom : 10,
            }}>
              <Ionicons name="search-outline" size={24} color={colors.blue} />
              <TextInput
                style={{color:colors.blue}}
                placeholder="Tìm kiếm sản phẩm"
                onChangeText={text => setSearchQuery(text)}
                value={searchQuery}
              />
            </View>
            <View style={{marginBottom : 20, paddingTop : 10}}>
              {categories.length > 0 && (
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  horizontal
                  data={categories}
                  renderItem={({item, index}) => (
                    <View
                      key={item.id}
                      style={{
                        marginLeft: 10,
                        marginRight: index === categories.length - 1 ? 16 : 0,
                      }}>
                      <Button
                        title={item.title}
                        onPress={() => setSelectedCategory(prevCategory => 
                          prevCategory === item.id ? null : item.id)}
                        color={colors.blue600}
                        styles={{
                          borderRadius:8,
                          paddingVertical: 4,
                          paddingHorizontal: 20,
                        }}
                        inline
                      />
                    </View>
                  )}
                  keyExtractor={item => item.id}
                />
              )}
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
            {filteredProducts.length > 0 &&
                filteredProducts.map(products => (
                    <Card
                        styles = {{
                            borderRadius : 10,
                            shadowColor : '#000',
                            shadowOffset : {
                              width : 0,
                              height : 10,
                            },
                            shadowOpacity : .3,
                            shadowRadius: 10
                        }}
                        key={products.id}
                        onPress={() => navigation.navigate('ProductDetail', {id: products.id})}>
                        <Col styles = {{alignItems : 'center'}}>
                            <Image
                                source={{uri: products.imageUrl}}
                                style={{
                                width: WIDTH ,
                                height: WIDTH*1.4,
                                borderRadius: 8,
                                }}
                            />
                                <TextComponents
                                  color={colors.blue}
                                  text={products.title}
                                  font={fontFamilies.poppinsBold}
                                  size={17}
                                  styles = {{
                                      paddingBottom : 10
                                  }}
                                />
                            {/* <Col styles={{paddingHorizontal: 0}}>
                                <TextComponents
                                  color={colors.blue}
                                  text={products.title}
                                  font={fontFamilies.poppinsBold}
                                  size={17}
                                  styles = {{
                                      paddingBottom : 10
                                  }}
                                />
                                <TextComponents
                                  text={products.type}
                                  color={colors.blue600}
                                  styles={{paddingVertical: 4, paddingBottom:10}}
                                />
                                <Row styles = {{paddingBottom : 20}} justifyContent="flex-start">
                                  <AntDesign name="star" color={colors.warning} size={18} />
                                  <Space width={8} />
                                  <TextComponents color={colors.blue} text={`${products.rate}`} />
                                </Row>
                            </Col> */}
                        </Col>
                    </Card>
            ))}
            <View style={{height : 80}}></View>
            </ScrollView>

        </View>
  )
}

export default ProductScreen