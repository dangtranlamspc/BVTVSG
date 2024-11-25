import { View, Text, StyleProp, ViewStyle, TextStyle, TouchableOpacity } from 'react-native'
import React, { ReactNode } from 'react'
import { colors} from '@bsdaoquang/rncomponent';
import TextComponents from './TextComponents';
import { fontFamilies } from '../contants/fontFamilies';
import { globalStyles } from '../styles/globalStyles';

interface Props {
    icon?: ReactNode;
    text: string;
    type?: 'primary' | 'text' | 'link';
    color?: string;
    styles?: StyleProp<ViewStyle>;
    textColor?: string;
    textStyles?: StyleProp<TextStyle>;
    textFont?: string;
    onPress?: () => void;
    iconFlex?: 'right' | 'left';
    disable?: boolean;
  }

const ButtonComponent = (props: Props) => {
    const {
        icon,
        text,
        textColor,
        textStyles,
        textFont,
        color,
        styles,
        onPress,
        iconFlex,
        type,
        disable,
      } = props;
    
  return type === 'primary' ?(
    <View style={{alignItems: 'center'}}>
      <TouchableOpacity
        disabled={disable}
        onPress={onPress}
        style={[
          globalStyles.button,
          // globalStyles.shadow,
          {
            backgroundColor: color
              ? color
              : disable
              ? colors.gray400
              : colors.primary,
            marginBottom: 17,
            width: '90%',
          },
          styles,
        ]}>
        {icon && iconFlex === 'left' && icon}
        <TextComponents
          text={text}
          color={textColor ?? colors.white}
          styles={[
            textStyles,
            {
              marginLeft: icon ? 12 : 0,
              fontSize: 16,
              textAlign: 'center',
            },
          ]}
          flex={icon && iconFlex === 'right' ? 1 : 0}
          font={textFont ?? fontFamilies.poppinsMedium}
        />
        {icon && iconFlex === 'right' && icon}
      </TouchableOpacity>
    </View>
  ) : (
    <TouchableOpacity onPress={onPress}>
      <TextComponents
        flex={0}
        text={text}
        color={type === 'link' ? colors.primary : colors.text}
      />
    </TouchableOpacity>
  )
}

export default ButtonComponent