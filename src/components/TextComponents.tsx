import { View, StyleProp, TextStyle } from 'react-native'
import React from 'react'
import { fontFamilies } from '../contants/fontFamilies';
import { sizes } from '../contants/sizes';
import { Text} from '@bsdaoquang/rncomponent'
import { colors } from '../contants/colors';


type Props = {
    text : string, 
    size?: number, 
    font?: string,
    flex?: number, 
    numberOfLine?: number, 
    color?: string,
    styles?: StyleProp<TextStyle>;
    type?: 'bigTitle' | 'title' | 'text' | 'description'
}
const TextComponents = (props : Props) => {
    const {text, size, font, flex,numberOfLine,color,type,styles}= props;
    let fontSize : number = sizes.text;
    let fontFamily : string = fontFamilies.poppinsRegular;
    switch (type) {
        case 'bigTitle' :
            fontSize = sizes.bigTitle;
            break;
        case 'title' :
            fontSize =sizes.title;
            break;
        case 'description' : 
            fontSize = sizes.description;
            break;
        default :
        fontSize = sizes.text;

        break;
    }
  return (
    <Text 
        text={text}
        font={font ?? fontFamilies.poppinsRegular}
        flex={flex}
        numberOfLine={numberOfLine}
        size={size ? size : fontSize}
        color={color ?? colors.dark}
        styles = {[{}, styles]}
        weight={!type || (type !== 'bigTitle' && type !== 'title') ? "400" : 'bold'}
    />
  )
}

export default TextComponents