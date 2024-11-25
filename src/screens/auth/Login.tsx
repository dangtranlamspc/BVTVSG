import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useDispatch} from 'react-redux'
import auth from '@react-native-firebase/auth'
import { addAuth } from '../../redux/reducers/authReducer'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { localDataNames } from '../../contants/localDataNames'
import { Auth } from '../../utils/handleAuthen'
import LoaderCompoents from '../../components/LoaderCompoents'
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated'
import { Button, Input } from '@bsdaoquang/rncomponent'
import { colors } from '../../contants/colors'
import { TickCircle } from 'iconsax-react-native'
import { fontFamilies } from '../../contants/fontFamilies'

const Login = ({navigation}: any) => {
    
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const [isDisable, setIsDisable] = useState(true);

  const [errorText, setErrorText] = useState('')

  const dispatch = useDispatch();

  const handleLogin = async () => {
    if(email && password) {
      setIsLoading(true)
      try {
        const userCredential = await auth().signInWithEmailAndPassword(email, password);
        const user = userCredential.user
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
          await Auth.UpdateProfile(user);
        }
        setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
        setErrorText('Email hoặc mật khẩu không đúng')
      }
    }else{

      setErrorText('Email hoặc mật khẩu không đúng')
    }
  }
  return (
<View className="bg-white h-full w-full">
        <LoaderCompoents visible={isLoading}/>
        <Image className='h-full w-full absolute' source={require('../../assets/images/background.png')} />

        <View className='flex-row justify-around w-full absolute'>
            <Animated.Image
              entering={FadeInUp.delay(200).duration(1000).springify().damping(3)}
              className="h-[225] w-[90]" 
              source={require('../../assets/images/light.png')}
            />
            <Animated.Image 
              entering={FadeInUp.delay(400).duration(1000).springify().damping(3)}
              className="h-[160] w-[65]" source={require('../../assets/images/light.png')} 
            />
        </View>
        
          <View className="h-full w-full flex justify-around">
              <View className='flex items-center pt-60'>
                <Animated.Text entering={FadeInUp.duration(1000).springify()} className='text-white font-bold tracking-wider text-5xl'>
                    Đăng nhập
                </Animated.Text>
              </View>
              <View className='flex item-center mx-2 space-y-6 pt-10'>
                  <Animated.View entering={FadeInDown.duration(1000).springify()} className='p-3 rounded-2xl w-full'>
                    <Input
                      required
                      helpText='Vui lòng nhập địa chỉ email'
                      value={email}
                      radius={0}
                      color='transparent'
                      bordered={false}
                      labelStyleProps={{
                        marginBottom: 0,
                      }}
                      styles={{
                        borderBottomColor: colors.dark, 
                        borderBottomWidth : 1,
                        paddingHorizontal: 0
                      }}
                      onChange={val => setEmail(val)}
                      placeholder='Vui lòng điền địa chỉ Email'
                      label='Địa chỉ Email'
                      clear
                      affix={
                        email && email.includes('@') && email.includes('.') ? (
                          <TickCircle variant='Bold' size={20} color={colors.blue600}/>
                        ) : null
                      }
                    />
                    <Input
                      required
                      helpText='Vui lòng nhập mật khẩu'
                      value={password} 
                      radius={0}
                      color='transparent'
                      password
                      labelStyleProps={{
                        marginBottom: 0,
                      }}
                      bordered={false}
                      styles={{
                        borderBottomColor: colors.dark,
                        borderBottomWidth : 1, 
                        paddingHorizontal: 0
                      }}
                      onChange={val => setPassword(val)}
                      placeholder='Vui lòng điền mật khẩu'
                      label='Mật khẩu'
                      clear
                    />
                    <Button
                        inline
                        textStyleProps={{fontFamily: fontFamilies.poppinsBold}}
                        title='Đăng nhập'
                        color={colors.blue600}
                        onPress={handleLogin}
                        loading={isLoading}
                      />
                  </Animated.View>
                  {errorText && <Text style={{color:'red'}} className='text-gray-700 mb-2'>{errorText}</Text>}
                  <Animated.View entering={FadeInDown.delay(600).duration(1000).springify()} className='flex-row justify-center'>
                    <Text>Bạn không có tài khoản bấm </Text>
                    <TouchableOpacity onPress={() =>
                              navigation.push('SignUp')
                          }>
                      <Text className='text-sky-600'>Đăng kí</Text>
                    </TouchableOpacity>
                  </Animated.View>
                  <Text className='text-xl text-gray-700 font-bold text-center'>
                    Hoặc
                  </Text>
                  <Animated.View entering={FadeInDown.delay(800).duration(1000).springify()} className='flex-row justify-center space-x-7'>
                    <TouchableOpacity 
                      className='p-2 bg-gray-100 rounded-2xl'
                      onPress={handleLogin}
                    >
                      <Image 
                        source={require('../../assets/gg.webp')}
                        className='w-10 h-10'
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      className='p-2 bg-gray-100 rounded-2xl'
                      onPress={handleLogin}
                    >
                      <Image 
                        source={require('../../assets/apple.png')}
                        className='w-10 h-10'
                      />
                    </TouchableOpacity>
                    <TouchableOpacity 
                      className='p-2 bg-gray-100 rounded-2xl'
                      onPress={handleLogin}
                    >
                      <Image 
                        source={require('../../assets/fb.jpg')}
                        className='w-10 h-10'
                      />
                    </TouchableOpacity>
                  </Animated.View>
              </View>
          </View>
    </View>
  )
}

export default Login