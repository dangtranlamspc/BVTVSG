import { StyleSheet } from "react-native";
import { colors } from "../contants/colors";

export const globalStyles = StyleSheet.create({
    container : {
        flex : 1,
    },
    center : {
        justifyContent : 'center',
        alignItems : 'center',
    },
    padding : {
        paddingBottom : 20,
    },
    avatar : {
        width : 50,
        height : 50,
        borderRadius : 100
    },
    button: {
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.white,
        paddingHorizontal: 16,
        paddingVertical: 16,
        // minHeight: 56,
        flexDirection: 'row',
      },
      row: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
      },
      shadow: {
        shadowColor: 'rgba(0,0,0,0.5)',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 6,
      },
    
})