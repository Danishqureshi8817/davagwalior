import { Platform, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useRef } from 'react'
import { screenHeight } from '@utils/Scaling'
import { moderateScale, moderateScaleVertical } from '@utils/responsiveSize'
import { Container } from '@components/global/Container'
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated'
import {
  CollapsibleContainer,
  CollapsibleScrollView,
  useCollapsibleContext,
  CollapsibleHeaderContainer,
  withCollapsibleContext
} from '@r0b0t3d/react-native-collapsible'
import Icon from "react-native-vector-icons/Ionicons";
import CustomText from '@components/global/CustomText'
import { Colors, Fonts } from '@utils/Constants'
import { RFValue } from 'react-native-responsive-fontsize'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import withCart from '@components/Cart/WithCart'
import Visuals from '@components/Home/Visuals'
import AnimatedHeader from '@components/Home/AnimatedHeader'
import StickSearchBar from '@components/Home/StickSearchBar'
import Content from '@components/LabTests/Content'

const LabTests = () => {

  // init
  const insets = useSafeAreaInsets()
  const { scrollY, expand } = useCollapsibleContext()
  const previousScroll = useRef<number>(0)

  const backToTopStyle = useAnimatedStyle(() => {

    const isScrollingUp = scrollY?.value < previousScroll.current && scrollY.value > 180
    const opacity = withTiming(isScrollingUp ? 1 : 0, { duration: 300 });
    const translateY = withTiming(isScrollingUp ? 0 : 10, { duration: 300 });

    previousScroll.current = scrollY?.value

    return {
      opacity,
      transform: [{ translateY }]
    }
  })

  return (
    <Container fullScreen={true} statusBarStyle='dark-content' statusBarBackgroundColor='transparent' >
      <Visuals />
      <Animated.View style={[styles.backToTopButton, backToTopStyle]} >
        <TouchableOpacity
          onPress={() => {
            scrollY.value = 0
            expand()
          }}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 6
          }}
        >
          <Icon name='arrow-up-circle-outline' size={RFValue(12)} color='white' />
          <CustomText variant='h9' fontFamily={Fonts.SemiBold} style={{ color: 'white' }} >
            Back to Top
          </CustomText>
        </TouchableOpacity>
      </Animated.View>

      <CollapsibleContainer style={[styles.panelContainer, { marginTop: insets.top || moderateScaleVertical(20) }]} >
        <CollapsibleHeaderContainer containerStyle={styles.transparent} >
          <AnimatedHeader
            showNotice={() => {
            }}
          />
          <StickSearchBar />
        </CollapsibleHeaderContainer>

        <CollapsibleScrollView nestedScrollEnabled={true} style={styles.panelContainer} showsVerticalScrollIndicator={false}>
          <Content />
        </CollapsibleScrollView>
      </CollapsibleContainer>

    </Container>
  )
}

export default withCart(withCollapsibleContext(LabTests))

const styles = StyleSheet.create({
  panelContainer: {
    flex: 1
  },
  transparent: {
    backgroundColor: 'rgba(246, 247, 249, 1)'
  },
  backToTopButton: {
    position: 'absolute',
    alignSelf: 'center',
    top: Platform.OS === 'ios' ? screenHeight * 0.18 : screenHeight * 0.18,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.deepPurple,
    borderRadius: moderateScale(20),
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScaleVertical(5),
    zIndex: 999,
  }
})