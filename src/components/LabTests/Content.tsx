import { StyleSheet, View } from 'react-native'
import React, { FC } from 'react'
import { moderateScale, moderateScaleVertical } from '@utils/responsiveSize'
import BannerSlider from '@components/Home/BannerSlider'
import useGetHomeData from '@hooks/home/get-home'
import HistoryAndExpertTab from './HistoryAndExpertTab'
import LabTestProcess from './LabTestProcess'
import HealthPackages from './HealthPackages'
import LabTestsFooter from './LabTestsFooter'
import PopularTests from './PopularTests'


const Content: FC = () => {

  // api
  const { data: homeData, isLoading: homeDataIsLoading } = useGetHomeData()

  return (
    <View style={styles.container} >

      <BannerSlider data={homeData?.data?.homeBanner?.homeBannerTop} />

      <HistoryAndExpertTab/>

      <LabTestProcess/>

      <HealthPackages/>
      
      <PopularTests/>

      <LabTestsFooter/>

      


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