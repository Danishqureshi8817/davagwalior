import { moderateScale } from "@utils/responsiveSize";
import { StyleSheet } from "react-native";


export const hocStyle = StyleSheet.create({
  cartConatiner:{
    position:'absolute',
    bottom:0,
    width:'100%',
    backgroundColor:'#fff',
    borderTopLeftRadius:moderateScale(10),
    borderTopRightRadius:moderateScale(10),
    elevation:10,
    shadowOffset:{width:1,height:1},
    shadowOpacity:0.3,
    shadowRadius:5
  },
})

export const shadowStyle = {
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.5,
  shadowRadius: 4,
  elevation: 5,
}

