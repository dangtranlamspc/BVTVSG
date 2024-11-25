import { View, Text, useWindowDimensions, TouchableOpacity, TextInput, FlatList, ScrollView, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { CTGDModel } from '../../models/CTGDModel';
import { CategoryCTGDModel } from '../../models/CategoryCTGDModel';
import { sizes } from '../../contants/sizes';
import { useNavigation } from '@react-navigation/native';
import { CartItem, cartSelector } from '../../redux/reducers/cartReducer';
import { useSelector } from 'react-redux';
import { categoriesctgdRef, ctgdRef } from '../../firebase/firebaseConfig';
import { Badge, Button, Card, Col, globalStyles, Row, Section } from '@bsdaoquang/rncomponent';
import { colors } from '../../contants/colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { TextComponents } from '../../components';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { fontFamilies } from '../../contants/fontFamilies';

const ProductConTrungGiaDungScreen = () => {
  const [ctgds, setCTGD] = useState<CTGDModel[]>([]);

  const [filteredProductsCTGD, setFilteredProductsCTGD] = useState<CTGDModel[]>([]);

  const [categoriesctgd, setCategoriesCTGD] = useState<CategoryCTGDModel[]>([]);

  const WIDTH = (sizes.width * 0.6);

  const [searchQuery, setSearchQuery] = useState('');

    const navigation: any = useNavigation();
    
    const cartData: CartItem[] = useSelector(cartSelector);

    const [selectedCategoryCTGD, setSelectedCategoryCTGD] = useState<string | null>(null);
  
    const {width} = useWindowDimensions();

    useEffect(() => {
      const filtered = ctgds.filter(ctgd => {
        const matchesCategory = selectedCategoryCTGD ? ctgd.categoriesctgd.includes(selectedCategoryCTGD) : true;
        const matchesSearch = ctgd.title.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
      });
      setFilteredProductsCTGD(filtered);
    }, [selectedCategoryCTGD, searchQuery, ctgds]);

    useEffect(() => {
      categoriesctgdRef
        .orderBy('createdAt')
        .onSnapshot(snap => {
          if (snap.empty) {
            console.log(`Products not found!`);
          } else {
            const items: CategoryCTGDModel[] = [];
            snap.forEach((item: any) =>
              items.push({
                id: item.id,
                ...item.data(),
              }),
            );
            setCategoriesCTGD(items);
          }
        });
    }, []);
    
    useEffect(() => {
        ctgdRef
          .orderBy('createdAt','desc')
          .onSnapshot(snap => {
            if (snap.empty) {
              console.log(`Không tìm thấy dữ liệu!`);
            } else {
              const items: CTGDModel[] = [];
              snap.forEach((item: any) =>
                items.push({
                  id: item.id,
                  ...item.data(),
                }),
              );
    
              setCTGD(items);
            }
          });
      }, []);
  return (
    <View style={{flex : 1, paddingTop : 60}}>
        <Section
          styles={{
            // zIndex: 5,
            // position: 'absolute',
            // top: 10,
            // right: 0,
            // left: 0,
            // padding: 20,
            // paddingTop: 50,
            paddingBottom : 15,
            borderRadius: 10,
            paddingTop: 10,
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
              // onPress={() => navigation.goBack()}
              onPress={() => navigation.navigate('HomeScreen')}
            >
              <MaterialIcons
                style={{marginLeft: 8}}
                name="arrow-back-ios"
                size={22}
                color={colors.white}
              />
            </TouchableOpacity>
            <TextComponents
              text='CÔN TRÙNG GIA DỤNG'
              styles={{
                fontSize : 24,
                // fontFamily : fontFamilies.poppinsSemiBold,
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
              {categoriesctgd.length > 0 && (
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  horizontal
                  data={categoriesctgd}
                  renderItem={({item, index}) => (
                    <View
                      key={item.id}
                      style={{
                        marginLeft: 10,
                        marginRight: index === categoriesctgd.length - 1 ? 16 : 0,
                      }}>
                      <Button
                        title={item.title}
                        onPress={() => setSelectedCategoryCTGD(prevCategory => 
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
            {filteredProductsCTGD.length > 0 &&
                filteredProductsCTGD.map(ctgd => (
                    <Card
                        styles = {{
                            borderRadius : 10,
                            shadowColor : '#000',
                            shadowOffset : {
                              width : 0,
                              height : 10,
                            },
                            shadowOpacity : .3,
                            shadowRadius: 20,
                            // backgroundColor : colors.blue200
                        }}
                        key={ctgd.id}
                        onPress={() => navigation.navigate('ProductsCTGDScreenDetail', {id: ctgd.id})}>
                        <Col styles = {{alignItems : 'center'}}>
                            <Image
                                source={{uri: ctgd.imageUrl}}
                                style={{
                                width: WIDTH,
                                height: WIDTH*1.4,
                                borderRadius: 8,
                                }}
                            />
                            <TextComponents
                                  color={colors.blue}
                                  text={ctgd.title}
                                  font={fontFamilies.poppinsBold}
                                  size={17}
                                  styles = {{
                                      paddingBottom : 10
                                  }}
                                />
                            {/* <Col styles={{paddingHorizontal: 0}}>
                                <TextComponents
                                  color={colors.blue}
                                  text={nndt.title}
                                  font={fontFamilies.poppinsBold}
                                  size={17}
                                  styles = {{
                                      paddingBottom : 10
                                  }}
                                />
                                <TextComponents
                                  text={nndt.type}
                                  color={colors.blue600}
                                  styles={{paddingVertical: 4, paddingBottom:10}}
                                />
                                <Row styles = {{paddingBottom : 20}} justifyContent="flex-start">
                                  <AntDesign name="star" color={colors.warning} size={18} />
                                  <Space width={8} />
                                  <TextComponents color={colors.blue} text={`${nndt.rate}`} />
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

export default ProductConTrungGiaDungScreen