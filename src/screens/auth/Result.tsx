import { View } from 'react-native'
import React, { useEffect } from 'react'
import auth from '@react-native-firebase/auth'
import { useDispatch } from 'react-redux';
import { addAuth } from '../../redux/reducers/authReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { localDataNames } from '../../contants/localDataNames';
import { Container } from '../../components';
import { Button, Section, Space, Text } from '@bsdaoquang/rncomponent';
import { globalStyles } from '../../styles/globalStyles';
import { fontFamilies } from '../../contants/fontFamilies';
import LottieView from 'lottie-react-native';
import { colors } from '../../contants/colors';

const Result = ({navigation, route} : any) => {
    const user = auth().currentUser;
  const dispatch = useDispatch() 
  useEffect(() => {
    const timeout = setTimeout(() => {
      handleSaveUser()
    }, 1000)
    return () => clearTimeout(timeout)
  },[])
  const handleSaveUser = async () => {
    if (user) {
      const data = {
          uid : user.uid,
          email : user.email ?? '',
          displayName : user.displayName ?? '',
          emailVerified : user.emailVerified,
          photoUrl : user.photoURL,
          creationTime : user.metadata.creationTime,
          lastSignInTime : user.metadata.lastSignInTime,
      }
      dispatch(
        addAuth(data)
      );
      await AsyncStorage.setItem(localDataNames.auth, JSON.stringify(data));
    }
  }
  return (
    <Container isScroll={false}>
        <Section styles={[globalStyles.center, {flex:1}]}>
            {/* <TickCircle color={colors.success} size ={80} /> */}
            <Space height={16}/>
            <Text
                text="ĐĂNG KÍ THÀNH CÔNG"
                font={fontFamilies.poppinsBold} 
                weight={'700'}
                size={20}
            />
            <LottieView
            source={require('../../assets/lottie/sucess.json')}
            autoPlay
            style={{
                width : 80,
                height : 80
            }}
            />
            
            <Text 
            textAlign='center'
            size={14}
            font={fontFamilies.poppinsRegular}
            numberOfLine={2}
            color = {colors.gray2}
            text='Lorem ipsum dolor sit amet consecterur adipisicing elit. Quansi vitae realksalo koasdjoad'
            />
        </Section>
        <Section>
            <Button
            onPress={handleSaveUser} 
            title='BẮT ĐẦU' 
            color={colors.dark} 
            textStyleProps={{
                fontWeight : '700',
                fontFamily : fontFamilies.poppinsBold,
            }}
            />
        </Section>
    </Container>
  )
}

export default Result