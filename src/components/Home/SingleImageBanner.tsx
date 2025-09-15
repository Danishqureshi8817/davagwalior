
import { GreaterIcon } from "../Icons";
import { moderateScale, moderateScaleVertical } from "../../utils/responsiveSize";
import { Colors, Fonts } from "@utils/Constants";
import { ActivityIndicator, ImageBackground, Pressable, Text, View } from "react-native";
import CustomText from "@components/global/CustomText";
import { FC } from "react";

interface SingleImageBannerProps {
  image: string;
  buttontext: string;
  onPress?: () => void;
  loading?: boolean;
  status?: string;
}

const SingleImageBanner :FC <SingleImageBannerProps>= ({buttontext, onPress, loading, status}) => {

  return (
    <View style={{width:'100%',height:moderateScale(115),borderRadius:moderateScale(20),overflow:'hidden'}}>
      <ImageBackground source={buttontext === 'Book Now' ? require('@assets/images/singleBanner2.jpeg') :require('@assets/images/singleBanner1.png')} style={{width:'100%',height:'100%'}} resizeMode='cover'>
        <Pressable onPress={onPress} disabled={!!status ? true : loading} style={{flexDirection:'row',alignItems:'center',marginLeft:buttontext === 'Book Now' ? moderateScale(25) : moderateScale(18),marginTop:moderateScale(65),gap:moderateScale(7)}}>
          <CustomText fontFamily={Fonts.SemiBold} variant='h7' style={{color:!!status ? Colors.greenText : Colors.deepPurple}} numberOfLine={2}>{!!status ? status : buttontext}</CustomText>
          {/* <GreaterIcon /> */}
          {/* <Icon as={ChevronRightIcon} color={Colors.grayish} w="$3" h="$3" /> */}
          {loading && <ActivityIndicator color={Colors.deepPurple}  size={'small'} />}
        </Pressable>
      </ImageBackground>
    </View>
  )
}

export default SingleImageBanner