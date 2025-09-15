import Carousel from "pinar";
import { moderateScale, moderateScaleVertical } from "../../utils/responsiveSize";
import { FC } from "react";
import { Colors } from "@utils/Constants";
import { ActivityIndicator, Image, View } from "react-native";
import { BaseIMGURL } from "@services/config";

interface BannerSliderProps {
  data?: {
    id: number;
    img: string;
    type: string;
    url: string;
    createdAt: string;
    section: string;
  }[];
}

const BannerSlider: FC<BannerSliderProps> = ({ data }) => {

  return (
    <View style={{ height: moderateScale(220), alignSelf: 'center', marginTop: moderateScaleVertical(15)}}>
      {data?.length as number > 0 ? (<Carousel style={{ width: '100%', height: '100%' }} showsControls={false} loop={true} autoplay={true} autoplayInterval={2000} activeDotStyle={{ width: moderateScale(14), height: moderateScale(6), backgroundColor: Colors.black, borderRadius: moderateScale(20) }}>
        {
          data?.map((item) => (
            <View style={{ width: '95%', height: '80%',alignSelf:'center',borderRadius:moderateScale(15),overflow:'hidden' }}>
              <Image
                key={item?.id} // Assuming id is unique
                source={{ uri: `${item?.img}` }}
                style={{ width: '100%', height: '100%' }} // Adjust style as needed
                resizeMode='cover'
              />
            </View>

          ))
        }
      </Carousel>)
        :
        (
          <View style={{ height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator size={'small'} color={Colors.Purple} />
          </View>

        )}
    </View>
  )
}

export default BannerSlider