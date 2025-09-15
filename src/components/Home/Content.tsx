import { StyleSheet, View } from 'react-native'
import React, { FC } from 'react'
import { moderateScale, moderateScaleVertical } from '@utils/responsiveSize'
import BannerSlider from './BannerSlider'
import SingleImageBanner from './SingleImageBanner'
import useGetHomeData from '@hooks/home/get-home'
import FavoriteCategories from './FavoriteCategories'
import SubstitutesBox from './SubstitutesBox'
import ShopByCategories from './ShopByCategories'
import ProductsSlider from './ProductSlider'

const Content: FC = () => {

  // api
  const { data: homeData, isLoading: homeDataIsLoading } = useGetHomeData()

  return (
    <View style={styles.container} >
      <FavoriteCategories data={homeData?.data?.masterCat} />

      <BannerSlider data={homeData?.data?.homeBanner?.homeBannerTop} />
      
      <View style={styles.subContainer} >
        <SingleImageBanner onPress={() => { }} image='j' buttontext='Upload Now' />
        <SingleImageBanner image='j' buttontext='Book Now' />

        <SubstitutesBox />

        <ShopByCategories data={homeData?.data?.mainCat} />

      </View>

      <BannerSlider data={homeData?.data?.homeBanner?.homeBannerBottom} />

      <View style={{ marginBottom: moderateScaleVertical(20) }} >
        <ProductsSlider title={'Top Deals Products'} sliderBgType='blue' />
      </View>

      <View style={{ marginBottom: moderateScaleVertical(0) }} >
        <ProductsSlider title={'Baby Care Products'} />
      </View>

      <ProductsSlider title={'Supplements'} sliderBgType='blue' />


    </View>
  )
}

export default Content

const styles = StyleSheet.create({
  container: {
    // paddingHorizontal: moderateScale(20),
  },
  subContainer: {
    paddingHorizontal: moderateScale(10),
    gap: moderateScaleVertical(20)
  }
})