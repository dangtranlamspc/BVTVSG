import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  Image,
  StyleSheet,
  StatusBar,
} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Container, TextComponents} from '../../components';
import {
  Badge,
  Button,
  globalStyles,
  Row,
  Section,
} from '@bsdaoquang/rncomponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {localDataNames} from '../../contants/localDataNames';
import {authSelector, removeAuth} from '../../redux/reducers/authReducer';
import auth from '@react-native-firebase/auth';
import {colors} from '../../contants/colors';
import {useNavigation} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {fontFamilies} from '../../contants/fontFamilies';
import {CartItem, cartSelector} from '../../redux/reducers/cartReducer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {HambergerMenu} from 'iconsax-react-native';

const ProfilesScreen = () => {
  const cartData: CartItem[] = useSelector(cartSelector);
  const navigation: any = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector(authSelector);
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
          paddingTop: Platform.OS === 'ios' ? 50 : 30,
        }}>
        {/* <Row
                  styles={{backgroundColor: 'transparent'}}
                  justifyContent="space-between">
                  <TouchableOpacity
                    style={[
                      globalStyles.center,
                      {
                        backgroundColor: colors.gray800,
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
                    <Tabbar
                      title="HƯỚNG DẪN KỸ THUẬT"
                      tabbarStylesProps={{paddingHorizontal: 16}}
                      titleStyleProps={{fontFamily: fontFamilies.poppinsBold, fontSize: 20}}
                      renderSeemore={<TextComponents text="" color={colors.gray800} />}
                      onSeeMore={() => navigation.navigate('BSCTScreen')}
                    />
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
            text="TÀI KHOẢN"
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
      <View style={{flex: 1, paddingTop: 120, width: 200}}>
        <Button
          title="LogOut"
          onPress={async () => {
            await auth().signOut();
            await AsyncStorage.removeItem(localDataNames.auth);
            dispatch(removeAuth({}));
          }}
        />
      </View>
    </>
  );
};

export default ProfilesScreen;

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
