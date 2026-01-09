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
import CustomText from '@components/global/CustomText'
import { Colors, Fonts } from '@utils/Constants'
import { screenHeight } from '@utils/Scaling'

const Content: FC = () => {

  // api
  const { data: homeData, isLoading: homeDataIsLoading } = useGetHomeData()

  return (
    <View style={styles.container} >

      {/* <BannerSlider data={homeData?.data?.homeBanner?.homeBannerTop} />

      <HistoryAndExpertTab/>

      <LabTestProcess/>

      <HealthPackages/>
      
      <PopularTests/>

      <LabTestsFooter/> */}

      <View style={styles.comingSoonContainer}>
        <CustomText variant='h2' fontFamily={Fonts.Bold} style={styles.comingSoonTitle}>
          Lab Test Feature
        </CustomText>
        <CustomText variant='h4' fontFamily={Fonts.Medium} style={styles.comingSoonText}>
          Coming Soon
        </CustomText>
        <CustomText variant='body' fontFamily={Fonts.Regular} style={styles.comingSoonSubtext}>
          We're working hard to bring you this feature. Stay tuned!
        </CustomText>
      </View>

    </View>
  )
}

export default Content

const styles = StyleSheet.create({
  container: {
    // paddingHorizontal: moderateScale(20),
    // flex: 1,
    minHeight: screenHeight * 0.75,
  },
  subContainer: {
    paddingHorizontal: moderateScale(10),
    gap: moderateScaleVertical(20)
  },
  comingSoonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: moderateScale(40),
    // minHeight: screenHeight * 0.6,
  },
  comingSoonTitle: {
    color: Colors.deepPurple,
    marginBottom: moderateScaleVertical(10),
    textAlign: 'center',
  },
  comingSoonText: {
    color: Colors.primary,
    marginBottom: moderateScaleVertical(15),
    textAlign: 'center',
  },
  comingSoonSubtext: {
    color: Colors.gray,
    textAlign: 'center',
    lineHeight: moderateScaleVertical(20),
  }
})