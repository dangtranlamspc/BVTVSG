import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet, Platform, StatusBar } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { Button, Input, Row, Section, Space } from '@bsdaoquang/rncomponent';
import { HambergerMenu, SearchNormal, Setting4 } from 'iconsax-react-native';
import { colors } from '../../contants/colors';
import Avatar from '../../components/Avatar';
import { TextComponents } from '../../components';
import SliderList from './components/SliderList';
import CategoriesList from './components/CategoriesList';
import ArrivalsProduct from './components/ArrivalsProduct';
import PopularProduct from './components/PopularProduct';
import ArrivalsHDKT from './components/ArrivalsHDKT';
import { useSelector } from 'react-redux';
import { authSelector } from '../../redux/reducers/authReducer';
import { fontFamilies } from '../../contants/fontFamilies';

const HomeScreens = ({navigation} : any) => {
  const user = useSelector(authSelector);
  // const navigation: any = useNavigation();
  return (
    <>
      <Section styles={{
        paddingTop: 60,
        paddingBottom : 5,
        borderRadius: 10,
      }}>
        <Row justifyContent='space-between'>
          <Button
            styles = {{
            width : 48,
            height : 48
            }}
            icon = {<HambergerMenu size={24} color='white'/>}
            color={colors.blue600}
            onPress={() => navigation.openDrawer()}
          />
          {/* <Avatar/> */}
          <TouchableOpacity
            onPress={() => {
              navigation.closeDrawer();
              navigation.navigate('ProfilesScreen', {
                screen: 'ProfilesScreen',
              });
            }}>
            {user.photoUrl ? (
              <Image source={{uri: user.photoUrl}} style={[localStyles.avatar]} />
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
                          [user.displayName.split(' ').length - 1].substring(0, 1)
                      : ''
                  }
                />
              </View>
            )}
          </TouchableOpacity>
        </Row>
      </Section>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Section>
          <TextComponents type='title' text='Xin chào,' size={24} color={colors.blue}/>
          <TextComponents text='Chào mừng đến với ứng dụng' size={18} color={colors.blue} />
        </Section>
        <Section>
          <Row>
            <View style={{flex :1}}>
              <Input
                disable
                placeholder='Tìm kiếm'
                placeholderColor={colors.blue}
                prefix={<SearchNormal size={20} color={colors.blue} />}
                value=''
                onChange={() => {}}
              />
            </View>
            <Space width={12} />
            <Button 
              styles={{width:48, height: 48}}
              icon={<Setting4 variant='TwoTone' size={24} color='white' />}
              color={colors.blue}
              onPress={() => navigation.navigate('FilterScreen')}
            />
          </Row>
        </Section>
        {/* <OffersList/> */}
        <SliderList/>
        <Space height={20} />
        <CategoriesList />
        <Space height={20} />
        <ArrivalsProduct />
        <Space height={20} />
        <PopularProduct />
        <Space height={20} />
        <ArrivalsHDKT/>
        <View style={{height : 80}}></View>
      </ScrollView>
    </>
  )
}

export default HomeScreens

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