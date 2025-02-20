import { Dimensions, Platform } from "react-native";

export const sizes = {
    width : Platform.OS === 'ios' ? Dimensions.get('window').width : Dimensions.get('window').width,
    height : Platform.OS === 'ios' ? Dimensions.get('window').height : Dimensions.get('screen').height,
    bigTitle : 18,
    title : 16,
    description : 12,
    icon : 18,
    text : 14,
    title2 : 24

}