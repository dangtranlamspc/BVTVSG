import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, TextComponents } from '../../components'
import { Badge, Button, globalStyles, Row, Section } from '@bsdaoquang/rncomponent'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { localDataNames } from '../../contants/localDataNames'
import { removeAuth } from '../../redux/reducers/authReducer'
import auth from '@react-native-firebase/auth'
import { colors } from '../../contants/colors'
import { useNavigation } from '@react-navigation/native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { fontFamilies } from '../../contants/fontFamilies'
import { CartItem, cartSelector } from '../../redux/reducers/cartReducer'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const ProfilesScreen = () => {
  const cartData: CartItem[] = useSelector(cartSelector);
  const navigation : any = useNavigation();
  const dispatch = useDispatch()
  return (
    <View style={{flex : 1, paddingTop : 60 }}>
      <Section styles={{
              paddingBottom : 5,
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
                  onPress={() => navigation.navigate('HomeScreen')}>
                  <MaterialIcons
                    style={{marginLeft : 8}}
                    name="arrow-back-ios"
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
                  text='TÀI KHOẢN'
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
      <Button title='LogOut' onPress={async() => {
        await auth().signOut()
        await AsyncStorage.removeItem(localDataNames.auth)
        dispatch(removeAuth({}));
      }} 
      />
    </View>
  )
}

export default ProfilesScreen