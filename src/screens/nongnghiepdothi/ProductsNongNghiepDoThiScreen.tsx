import {
  View,
  Text,
  useWindowDimensions,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  FlatList,
  TextInput,
  StyleSheet,
  Platform,
  StatusBar,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NNDTModel} from '../../models/NNDTModel';
import {useNavigation} from '@react-navigation/native';
import {
  categoriesnndtRef,
  categoriesRef,
  nndtRef,
} from '../../firebase/firebaseConfig';
import {
  Badge,
  Button,
  Card,
  Col,
  globalStyles,
  Row,
  Section,
  Space,
  Tabbar,
} from '@bsdaoquang/rncomponent';
import {fontFamilies} from '../../contants/fontFamilies';
import {colors} from '../../contants/colors';
import {TextComponents} from '../../components';
import RenderHTML from 'react-native-render-html';
import WebView from 'react-native-webview';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {HambergerMenu} from 'iconsax-react-native';
import ProductsNNDTItem from '../../components/ProductsNNDTItem';
import {CartItem, cartSelector} from '../../redux/reducers/cartReducer';
import {useSelector} from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {CategoryNNDTModel} from '../../models/CategoryNNDTModel';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {sizes} from '../../contants/sizes';
import {authSelector} from '../../redux/reducers/authReducer';

const ProductsNongNghiepDoThiScreen = () => {
  const [nndts, setNNDT] = useState<NNDTModel[]>([]);

  const [filteredProductsNNDT, setFilteredProductsNNDT] = useState<NNDTModel[]>(
    [],
  );

  const [categoriesnndt, setCategoriesNNDT] = useState<CategoryNNDTModel[]>([]);

  const WIDTH = sizes.width * 0.6;

  const [searchQuery, setSearchQuery] = useState('');

  const navigation: any = useNavigation();

  const cartData: CartItem[] = useSelector(cartSelector);

  const [selectedCategoryNNDT, setSelectedCategoryNNDT] = useState<
    string | null
  >(null);

  const {width} = useWindowDimensions();

  const user = useSelector(authSelector);

  useEffect(() => {
    const filtered = nndts.filter(nndt => {
      const matchesCategory = selectedCategoryNNDT
        ? nndt.categoriesnndt.includes(selectedCategoryNNDT)
        : true;
      const matchesSearch = nndt.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
    setFilteredProductsNNDT(filtered);
  }, [selectedCategoryNNDT, searchQuery, nndts]);

  useEffect(() => {
    categoriesnndtRef.orderBy('createdAt').onSnapshot(snap => {
      if (snap.empty) {
        console.log(`Products not found!`);
      } else {
        const items: CategoryNNDTModel[] = [];
        snap.forEach((item: any) =>
          items.push({
            id: item.id,
            ...item.data(),
          }),
        );
        setCategoriesNNDT(items);
      }
    });
  }, []);

  useEffect(() => {
    nndtRef.orderBy('createdAt', 'desc').onSnapshot(snap => {
      if (snap.empty) {
        console.log(`Không tìm thấy dữ liệu!`);
      } else {
        const items: NNDTModel[] = [];
        snap.forEach((item: any) =>
          items.push({
            id: item.id,
            ...item.data(),
          }),
        );

        setNNDT(items);
      }
    });
  }, []);
  return (
    <View style={{flex: 1, paddingTop: Platform.OS === 'ios' ? 60 : 30}}>
      <Section
        styles={{
          // zIndex: 5,
          // position: 'absolute',
          // top: 10,
          // right: 0,
          // left: 0,
          // padding: 20,
          // paddingTop: 50,
          paddingBottom: 15,
          borderRadius: 10,
          paddingTop: 10,
        }}>
        {/* <Row
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
              onPress={() => navigation.goBack()}
              // onPress={() => navigation.navigate('HomeScreens')}
            >
              <MaterialIcons
                style={{marginLeft: 8}}
                name="arrow-back-ios"
                size={22}
                color={colors.white}
              />
            </TouchableOpacity>
            <TextComponents
              text='NÔNG NGHIỆP ĐÔ THỊ'
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
          </Row> */}
        <Row justifyContent="space-between">
          <Button
            styles={{
              width: 48,
              height: 48,
            }}
            icon={<HambergerMenu size={24} color="white" />}
            color={colors.blue600}
            onPress={() => navigation.openDrawer()}
          />
          {/* <Avatar/> */}
          <TextComponents
            text="NÔNG NGHIỆP ĐÔ THỊ"
            font={fontFamilies.poppinsBold}
            size={20}
            color={colors.blue}
          />
          <TouchableOpacity
            onPress={() => {
              navigation.closeDrawer();
              navigation.navigate('ProfilesScreen', {
                screen: 'ProfilesScreen',
              });
            }}>
            {user.photoUrl ? (
              <Image
                source={{uri: user.photoUrl}}
                style={[localStyles.avatar]}
              />
            ) : (
              <View
                style={[localStyles.avatar, {backgroundColor: colors.blue600}]}>
                <TextComponents
                  size={22}
                  color={colors.white}
                  text={
                    user.displayName
                      ? user.displayName
                          .split(' ')
                          [user.displayName.split(' ').length - 1].substring(
                            0,
                            1,
                          )
                      : ''
                  }
                />
              </View>
            )}
          </TouchableOpacity>
        </Row>
      </Section>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: 5,
          alignItems: 'center',
          borderWidth: 2,
          borderColor: colors.gray700,
          padding: 15,
          borderRadius: 9,
          marginBottom: 10,
        }}>
        <Ionicons name="search-outline" size={24} color={colors.blue} />
        <TextInput
          style={{color: colors.blue}}
          placeholder="Tìm kiếm sản phẩm"
          onChangeText={text => setSearchQuery(text)}
          value={searchQuery}
        />
      </View>
      <View style={{marginBottom: 20, paddingTop: 10}}>
        {categoriesnndt.length > 0 && (
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            data={categoriesnndt}
            renderItem={({item, index}) => (
              <View
                key={item.id}
                style={{
                  marginLeft: 10,
                  marginRight: index === categoriesnndt.length - 1 ? 16 : 0,
                }}>
                <Button
                  title={item.title}
                  onPress={() =>
                    setSelectedCategoryNNDT(prevCategory =>
                      prevCategory === item.id ? null : item.id,
                    )
                  }
                  color={colors.blue600}
                  styles={{
                    borderRadius: 8,
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
        {filteredProductsNNDT.length > 0 &&
          filteredProductsNNDT.map(nndt => (
            <Card
              styles={{
                borderRadius: 10,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 10,
                },
                shadowOpacity: 0.3,
                shadowRadius: 20,
                // backgroundColor : colors.blue200
              }}
              key={nndt.id}
              onPress={() =>
                navigation.navigate('ProductsNongNghiepDoThiDetailScreen', {
                  id: nndt.id,
                })
              }>
              <Col styles={{alignItems: 'center'}}>
                <Image
                  source={{uri: nndt.imageUrl}}
                  style={{
                    width: WIDTH,
                    height: WIDTH * 1.4,
                    borderRadius: 8,
                  }}
                />
                <TextComponents
                  color={colors.blue}
                  text={nndt.title}
                  font={fontFamilies.poppinsBold}
                  size={17}
                  styles={{
                    paddingBottom: 10,
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
        <View style={{height: 80}}></View>
      </ScrollView>
    </View>
  );
};

export default ProductsNongNghiepDoThiScreen;

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingVertical: Platform.OS === 'android' ? StatusBar.currentHeight : 48,
  },

  avatar: {
    width: 52,
    height: 52,
    borderRadius: 100,
    marginBottom: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  listItem: {
    paddingVertical: 12,
    justifyContent: 'flex-start',
  },

  listItemText: {
    paddingLeft: 12,
  },
});
