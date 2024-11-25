import { View, Text, SafeAreaView, ScrollView, Platform, StatusBar } from 'react-native'
import React, { ReactNode } from 'react'
import { Button, Row } from '@bsdaoquang/rncomponent';
import TextComponents from './TextComponents';
import { fontFamilies } from '../contants/fontFamilies';
import { globalStyles } from '../styles/globalStyles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { colors } from '../contants/colors';
import { useNavigation } from '@react-navigation/native';

type Props = {
    children : ReactNode;
    title ?: string,
    back?: boolean,
    left ?: ReactNode,
    right ?: ReactNode,
    isScroll ?: boolean,
    bottomComponent?: ReactNode
};
const Container = (props : Props) => {
    const {children, title, back, left, right, isScroll, bottomComponent} = props;
    const navigation : any = useNavigation();
  return (
    <SafeAreaView style={[globalStyles.container]}>
        {(back || left || title || right) ? (
        <Row justifyContent='space-between' styles={{
            paddingHorizontal : 16,
            paddingVertical : 16,
            paddingTop: 
            Platform.OS === 'android' ? StatusBar.currentHeight : 1,
        }}>
            {back && <Button styles={{width: 42, height: 42, paddingHorizontal: 0, paddingVertical: 0}} inline isShadow={false} icon={<MaterialIcons
                style={{marginLeft: 8}}
                name="arrow-back-ios"
                size={22}
                color={colors.white}
              />} 
              color={colors.blue500} onPress={() => navigation.canGoBack() && navigation.goBack()} />}
            {left && !back && <TextComponents text='Left'/>}
            <View>
                {title && <TextComponents type='bigTitle' font={fontFamilies.poppinsMedium} text='title' />}
            </View>
            {right && right}
        </Row>): <View style={{
            paddingTop: 
            Platform.OS === 'android' ? StatusBar.currentHeight : 1,
        }} />}

        {!isScroll && isScroll !== false ? (
            <ScrollView style={[globalStyles.container]}>{children}</ScrollView>
        ) : (
            <View style={[globalStyles.container]}>{children}</View>
        )}
        {
            bottomComponent && bottomComponent
        }
    </SafeAreaView>
  )
}

export default Container