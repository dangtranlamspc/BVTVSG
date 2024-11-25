import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'

const HomeAuth = ({navigation} : any) => {
  return (
    <View className="bg-white h-full w-full">
        {/* <Image className='h-full w-full absolute' source={require('../../assets/images/background.png')} /> */}

        <View className='flex-row justify-around w-full absolute'>
            <Image className="h-[225] w-[90]" source={require('../../assets/images/light.png')} />
            <Image className="h-[160] w-[65]" source={require('../../assets/images/light.png')} />
        </View>
        <View className="h-full w-full flex justify-around pt-40 pb-10">
            <View className='flex item-center mx-4 space-y-4'>
                <View className='flex-1 flex justify-around pt-10'>
                    <View className='flex-row justify-center'>
                        <Image className='h-[150] w-[150]' source={require('../../assets/logo1.png')} />
                    </View>
                </View>
                <View className='w-full pt-80' >
                    <TouchableOpacity 
                        className='w-full bg-sky-400 p-5 rounded-2xl mb-2'
                        onPress={() =>
                         navigation.navigate('SignUp')
                        }
                    >
                        <Text className='text-xl font-bold text-white text-center'>Đăng kí</Text>
                    </TouchableOpacity>
                </View>
                <View className='flex-row justify-center'>
                  <Text>Bạn đã có tài khoản </Text>
                  <TouchableOpacity onPress={() =>
                            navigation.navigate('Login')
                        }>
                    <Text className='text-sky-600'>Đăng nhập</Text>
                  </TouchableOpacity>
                </View>
            </View>
        </View>
    </View>
  )
}

export default HomeAuth