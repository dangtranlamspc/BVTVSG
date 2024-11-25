import { View, Text, useWindowDimensions, TouchableOpacity, ScrollView, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BSCTModel } from '../../models/BSCTModel';
import { useStatusBar } from '../../utils/useStatusBar';
import { bsctRef } from '../../firebase/firebaseConfig';
import { Col, globalStyles, Row, Section, Space } from '@bsdaoquang/rncomponent';
import { colors } from '../../contants/colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { TextComponents } from '../../components';
import { fontFamilies } from '../../contants/fontFamilies';
import RenderHTML from 'react-native-render-html';
import WebView from 'react-native-webview';

const BSCTDetail = ({navigation, route}: any) => {
    const {id} = route.params;

  const [bsctDetail, setBSCTDetail] = useState<BSCTModel>();

  useStatusBar('dark-content');

  const width = useWindowDimensions();

  useEffect(() => {
    getBSCTDetail();
  }, [id]);

  const getBSCTDetail = () => {
    bsctRef.doc(id).onSnapshot((snap: any) => {
      if (snap.exists) {
        setBSCTDetail({
          id,
          ...snap.data(),
        });
      } else {
        setBSCTDetail(undefined);
      }
    });
  };
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
            paddingTop: 40
          }}>
          <Row
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
          </Row>
        </Section>
        <ScrollView
          style={[
            
            globalStyles.container,

            {backgroundColor: 'white', flexGrow: 1, paddingTop: 80},
          ]}>
          <View
            style={[
              globalStyles.container,
              {
                borderTopRightRadius: 20,
                borderTopLeftRadius: 20,
                // marginTop: -20,
                backgroundColor: 'white',
              },
            ]}>
            {bsctDetail && (
              <Section styles={{paddingVertical: 12}}>
                <Row styles={{paddingTop : 5}}>
                  <Col styles={{justifyContent: 'center'}}>
                    <TextComponents
                      text={bsctDetail?.title}
                      font={fontFamilies.robotoBold}
                      size={22}
                    />
                  </Col>
                </Row>
                <Space height={20} />
                <TextComponents
                  font={fontFamilies.robotoBold}
                  text="Nội dung"
                  size={18}
                />
                <Space height={8} />
                <View>
                  <RenderHTML
                      WebView={WebView}
                      contentWidth={Dimensions.get('window').width}
                      source={{html : bsctDetail.description}}
                      tagsStyles={{
                        p: { textAlign: 'justify', margin: 0, marginBottom: 10, fontSize : 16 },
                        strong: { fontWeight: 'bold', fontSize : 18},
                        table: { borderWidth: 1, borderColor: '#ddd', marginBottom: 10, marginVertical: 10 },
                        td: { padding: 5, borderWidth: 1, borderColor: '#ddd' , textAlign:'center'},
                        th: { borderWidth: 1, borderColor: '#000000', padding: 8, backgroundColor: '#f2f2f2' },
                        figure: { margin: 0, padding: 0 },
                        img: { width: '100%', height: 'auto' },
                        span: { backgroundColor: 'transparent' },
                      }}
                    />
                </View>

                <View style={{
                  height : 100
                }}>
                </View>
              </Section>
            )}
          </View>
        </ScrollView>
    </>
  )
}

export default BSCTDetail