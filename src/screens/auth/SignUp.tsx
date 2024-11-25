import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect,useState } from 'react'
import auth from '@react-native-firebase/auth'
import { Button, Input, Section } from '@bsdaoquang/rncomponent';
import { fontFamilies } from '../../contants/fontFamilies';
import { colors } from '../../contants/colors';
import { Auth } from '../../utils/handleAuthen';
import { LoaderCompoents } from '../../components';
import LottieView from 'lottie-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { TickCircle } from 'iconsax-react-native';

const initState = {
    username: '',
    email: '',
    password: '',
    confirm: '',
  };

const SignUp = ({navigation}: any) => {
    const [registerForm, setRegisterForm] = useState(initState);
  const [isLoading, setIsLoading] = useState(false);
  const [isDisable, setIsDisable] = useState(true);
  const [errorText, setErrorText] = useState('');


  useEffect(() => {
    const {username,email, password, confirm} = registerForm;
    if (username) {
      setErrorText(username === ''  ? 'Hãy nhập họ và tên của bạn' : '')
    }

    if (password && confirm) {
      setErrorText(password !== confirm ? 'Mật khẩu không khớp !!' : '');
    }
    setIsDisable(false);
  }, [registerForm]);

  const handleChangeForm = (val : string, key: string) => {
    const items : any = {...registerForm}
    if (val && key) {
      items[`${key}`] = val
      setRegisterForm(items)
    }else{
      console.log(registerForm)
    }
  }


  const createNewAccount = async () => {
    setIsLoading(true)
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(registerForm.email, registerForm.password)
      const user = userCredential.user
      if(user) {
        if(registerForm.username) {
          await user.updateProfile ({
            displayName : registerForm.username
          });
        }
        await Auth.CreateProfile();
        navigation.navigate('Result')
      }
      setIsLoading(false)
    } catch (error : any) {
      console.log(error);
      // setErrorText(error.message)
      setIsLoading(false)
    }
  }
  const renderButtonRegister = () => {
    return (
      <Button
        loading={isLoading}
        disable={isDisable}
        isShadow={false}
        inline
        textStyleProps={{fontFamily: fontFamilies.poppinsBold}}
        title='Đăng kí' 
        color={colors.blue500}
        onPress={createNewAccount}
      />
    )
  }
  return (
<View className='flex-1 bg-white' style={{backgroundColor: colors.bg}}>
        <LoaderCompoents visible={isLoading} />
      <SafeAreaView className='flex'>
        <View className='flex-row justify-center'>
          <LottieView
            source={require('../../assets/lottie/loading1.json')}
            autoPlay
            style={{
              width : 250,
              height: 260,
            }}
          />
        </View>
      </SafeAreaView>
      <>
      <View 
        className='flex-1 bg-white px-8 pt-5'
        style={{borderTopLeftRadius : 50 , borderTopRightRadius: 50}}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
        <Animated.View entering={FadeInDown.delay(200).duration(400).springify()} className='form space-y-2'>
            <Input
              required
              helpText='Vui lòng nhập tên người dùng'
              value={registerForm.username}
              radius={0}
              color='transparent'
              bordered={false}
              labelStyleProps={{
                marginBottom: 0,

              }}
              styles={{
                borderBottomColor: colors.dark, 
                borderBottomWidth : 1,
                paddingHorizontal: 0,
              }}
              onChange={val => handleChangeForm(val, 'username')} 
              placeholder='Tên người dùng' 
              label='Tên người dùng'
              clear
            />
            <Input
              required
              helpText='Vui lòng nhập địa chỉ email'
              value={registerForm.email}
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
              onChange={val => handleChangeForm(val, 'email')}
              placeholder='Địa chỉ Email' 
              label='Địa chỉ Email'
              clear
              affix={
                registerForm.email && registerForm.email.includes('@') && registerForm.email.includes('.') ? (
                  <TickCircle variant='Bold' size={20} color={colors.dark}/>
                ) : null
              }
            />
            <Input
              required
              helpText='Vui lòng nhập mật khẩu'
              value={registerForm.password} 
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
                paddingHorizontal: 1
              }}
              onChange={val => handleChangeForm(val, 'password')} 
              placeholder='Mật khẩu'
              label='Mật khẩu'
              clear
            />
            <Input
              value={registerForm.confirm}
              radius={0}
              color="transparent"
              password
              labelStyleProps={{
                marginBottom: 0,
              }}
              bordered={false}
              styles={{
                borderBottomColor: colors.dark,
                borderBottomWidth: 1,
                paddingHorizontal: 0,
              }}
              onChange={val => {
                handleChangeForm(val, 'confirm');
              }}
              placeholder="Nhập lại mật khẩu"
              label="Nhập lại mật khẩu"
            />
            {errorText && <Text style={{color:'red'}} className='text-gray-700 mb-2'>{errorText}</Text>}
            <Animated.View entering={FadeInDown.delay(600).duration(1000).springify()} className='w-full'>
                <Section>
                  {renderButtonRegister()}
                </Section>
            </Animated.View>
            <Animated.View entering={FadeInDown.delay(600).duration(1000).springify()} className='flex-row justify-center mt-7'>
              <Text className='text-gray-700 font-semibold'>Đã có tài khoản chọn </Text>
              <TouchableOpacity onPress={() => navigation.push('Login')}>
                <Text className='font-semibold text-sky-500'>Đăng nhập</Text>
              </TouchableOpacity>
            </Animated.View>
        </Animated.View>
        <View style={{height:50}}>

        </View>
        </ScrollView>
      </View>
      </>
    </View>
  )
}

export default SignUp