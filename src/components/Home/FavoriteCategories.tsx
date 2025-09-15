import { moderateScale, moderateScaleVertical } from "../../utils/responsiveSize"
import { Colors, Fonts, RoutesName } from "@utils/Constants"
import { BaseIMGURL } from "@services/config"
import { Image, Pressable, StyleSheet, View } from "react-native"
import CustomText from "@components/global/CustomText"
import { shadowStyle } from "@styles/GlobalStyles"
import { FC } from "react"
import { navigate } from "@utils/NavigationUtils"

interface FavoriteCategoriesProps {
  data?: {
    id: number;
    name: string;
    image: string;
  }[]
}

const FavoriteCategories : FC<FavoriteCategoriesProps> = ({data}) => {

  const onHandleNavigate = (name: string, index: number) => {

    if (index === 0) {
      navigate(RoutesName.ProductListing, { selectedCat: name })
    } else if (index === 1) {
      navigate(RoutesName.ProductListing, { selectedCat: name })
    } else if (index === 2) {
      navigate(RoutesName.ProductListing, { selectedCat: name })
    } else if (index === 3) {
      navigate(RoutesName.ProductListing, { selectedCat: name })
    }

  }

  return (
    <View style={{ flexDirection: 'column' }}>
      <View style={{ alignItems: 'center', justifyContent: 'center', gap: moderateScale(16), marginTop: moderateScaleVertical(40) }}>
        <CustomText variant="h5" fontFamily={Fonts.Bold} style={{ color: Colors.deepPurple, letterSpacing: 5 }} numberOfLine={1}>FAVORITE CATEGORIES</CustomText>
        <Image source={require('@assets/images/homeDivider.png')} style={{ width: moderateScale(190), height: moderateScale(10) }} />
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: moderateScale(20), justifyContent: 'space-between', marginTop: moderateScaleVertical(20) }} >
        {
          data?.map((item: any, index: number) => (
            <Pressable key={item?.id} onPress={() => onHandleNavigate(item?.name, index)}>
              <View style={{ justifyContent: 'center', gap: moderateScale(10),alignItems: 'center' }}>
                <View style={[styles.itemImgContainer, shadowStyle]}  >
                  <Image alt='categoryIcon' source={{ uri: `${item?.image}` }} style={{ width: moderateScale(48), height: moderateScale(48) }} />
                </View>
                <CustomText variant='h9' fontFamily={Fonts.Medium} numberOfLine={1} >{item?.name}</CustomText>
              </View>
            </Pressable>
          ))
        }


      </View>
    </View>
  )
}

export default FavoriteCategories

const styles = StyleSheet.create({
  itemImgContainer: {
    backgroundColor: Colors.white1,
    width: moderateScale(60),
    height: moderateScale(60),
    borderRadius: moderateScale(8),
    alignItems: 'center',
    justifyContent: 'center'
  }
})