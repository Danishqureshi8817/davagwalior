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
import Cart from '@screens/Cart/Cart'
import { useCartStore } from '@state/cartStore'

const Content: FC = () => {

  const cartItems = useCartStore(state => state?.cart);

  // api
  const { data: homeData, isLoading: homeDataIsLoading } = useGetHomeData()

  return (
    <View style={[styles.container,{paddingBottom: cartItems?.length > 0 ? moderateScaleVertical(70) : 0}]} >
      
      <FavoriteCategories data={homeData?.data?.masterCat} />

      <BannerSlider data={homeData?.data?.homeBanner?.homeBannerTop} />
      
      <View style={styles.subContainer} >
        <SingleImageBanner onPress={() => { }} image='j' buttontext='Upload Now' />
        <SingleImageBanner image='j' buttontext='Book Now' />

        <SubstitutesBox />

        <ShopByCategories data={homeData?.data?.mainCat} />

      </View>

      <BannerSlider data={homeData?.data?.homeBanner?.homeBannerBottom} />

      {homeData?.data?.productsByCategory?.map((categoryData: any, index: number) => (
        <View 
          key={categoryData?.category || index} 
          style={{ marginBottom: moderateScaleVertical(20) }} 
        >
          <ProductsSlider 
            sliderBgType={index % 2 === 0 ? 'blue' : 'white'} 
            productData={categoryData} 
          />
        </View>
      ))}


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