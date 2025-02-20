import { View, Text, useWindowDimensions, TouchableOpacity, ScrollView, Image, Dimensions, StyleSheet, Platform, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BSCTModel } from '../../models/BSCTModel';
import { useNavigation } from '@react-navigation/native';
import { bsctRef } from '../../firebase/firebaseConfig';
import { Button, Card, Col, globalStyles, Row, Section, Tabbar } from '@bsdaoquang/rncomponent';
import { colors } from '../../contants/colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { fontFamilies } from '../../contants/fontFamilies';
import { TextComponents } from '../../components';
import RenderHTML from 'react-native-render-html';
import WebView from 'react-native-webview';
import { HambergerMenu } from 'iconsax-react-native';
import { useSelector } from 'react-redux';
import { authSelector } from '../../redux/reducers/authReducer';

const BSCTScreen = () => {
  const [bscts, setBSCTs] = useState<BSCTModel[]>([]);

    const navigation: any = useNavigation();
  
    const {width} = useWindowDimensions();

    const user = useSelector(authSelector);
    
    useEffect(() => {
        bsctRef
          .orderBy('createdAt','desc')
          .onSnapshot(snap => {
            if (snap.empty) {
              console.log(`Không tìm thấy dữ liệu!`);
            } else {
              const items: BSCTModel[] = [];
              snap.forEach((item: any) =>
                items.push({
                  id: item.id,
                  ...item.data(),
                }),
              );
    
              setBSCTs(items);
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
      <ScrollView>
        <View style={{flex: 1,paddingTop:110}}>
          {bscts.length > 0 &&
            bscts.map(item => (
              <Card
                styles={{
                  borderRadius : 8,
                  // backgroundColor: colors.danger
                }}
                key={item.id}
                onPress={() => navigation.navigate('BSCTDetail', {id: item.id})}
              >
                <Col>
                  <Image
                    source={{uri : item.imageUrl}}
                    style={{
                      width: width - 60,
                      height: width-200,
                      borderRadius: 8,
                    }}
                  />
                  <View style={{paddingTop:5}}>
                    <TextComponents
                      text={item.title}
                      font={fontFamilies.poppinsBold}
                      size={20}
                    />
                  </View>
                  <View style={{paddingTop : 5}}>
                      <RenderHTML
                          WebView={WebView}
                          contentWidth={Dimensions.get('window').width}
                          source={{html : item.shortDesc}}
                          tagsStyles={{
                            p: { textAlign: 'justify', margin: 0, marginBottom: 10 },
                            strong: { fontWeight: 'bold',color: 'rgb(68,114,196)' },
                            table: { borderWidth: 1, borderColor: '#ddd', marginBottom: 10, marginVertical: 10 },
                            td: { padding: 5, borderWidth: 1, borderColor: '#ddd' },
                            th: { borderWidth: 1, borderColor: '#000000', padding: 8, backgroundColor: '#f2f2f2' },
                            figure: { margin: 0, padding: 0 },
                            img: { width: '100%', height: 'auto' },
                            span: { backgroundColor: 'transparent' },
                          }}
                        />
                    </View>
                </Col>
              </Card>
            ))}
        </View>
      </ScrollView>
    </>
  )
}

export default BSCTScreen

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