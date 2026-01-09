import { Platform, StyleSheet, TouchableOpacity, StatusBar } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { screenHeight } from '@utils/Scaling'
import { moderateScale, moderateScaleVertical } from '@utils/responsiveSize'
import { Container } from '@components/global/Container'
import Animated, { useAnimatedStyle, withTiming, useAnimatedReaction, runOnJS } from 'react-native-reanimated'
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
import StickSearchBar from '@components/Home/StickSearchBar'
import AnimatedHeader from '@components/Home/AnimatedHeader'
import Visuals from '@components/Home/Visuals'
import Content from '@components/Home/Content'
import withCart from '@components/Cart/WithCart'
import Geolocation from '@react-native-community/geolocation'
import { reverseGeocode } from '@services/mapService'
import { useAuthStore } from '@state/authStore'
const Home = () => {

  // init
  const { user, setUser } = useAuthStore()
  const insets = useSafeAreaInsets()
  const { scrollY, expand } = useCollapsibleContext()
  const previousScroll = useRef<number>(0)
  const isHeaderHidden = useRef<boolean>(false)
  const [statusBarBackgroundColor, setStatusBarBackgroundColor] = useState('#F6F7F9')

  // Function to update status bar when header is hidden/shown
  const updateStatusBar = (headerHidden: boolean) => {
    if (headerHidden) {
      // Header is hidden - set status bar to white background with dark content
      StatusBar.setBarStyle('dark-content')
      if (Platform.OS === 'android') {
        StatusBar.setBackgroundColor('#FFFFFF')
      } else {
        // For iOS, update the state which will update Container's prop
        setStatusBarBackgroundColor('#FFFFFF')
      }
    } else {
      // Header is visible - set status bar to original color
      StatusBar.setBarStyle('dark-content')
      if (Platform.OS === 'android') {
        StatusBar.setBackgroundColor('#F6F7F9')
      } else {
        // For iOS, update the state which will update Container's prop
        setStatusBarBackgroundColor('#F6F7F9')
      }
    }
  }

  // Watch scroll position and update status bar when header is hidden/shown
  useAnimatedReaction(
    () => scrollY?.value ?? 0,
    (scrollValue) => {
      const headerHidden = scrollValue >= 60 // Header hides at scrollY >= 120
      if (headerHidden !== isHeaderHidden.current) {
        isHeaderHidden.current = headerHidden
        runOnJS(updateStatusBar)(headerHidden)
      }
    }
  )

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

  const updateUserLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords
        console.log(latitude, longitude, 'location');

        // refetchUser(setUser)
        reverseGeocode(latitude, longitude, setUser, user)
      },
      err => console.log(err),
      {
        enableHighAccuracy: false,
        timeout: 15000,
      }

    )
  }

  useEffect(() => {
    updateUserLocation()
  }, [])

  console.log(user, 'uuiu');


  return (
    <Container statusBarStyle='dark-content' statusBarBackgroundColor={statusBarBackgroundColor} >
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

      <CollapsibleContainer style={[styles.panelContainer, { marginTop: 0 }]} >
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

export default withCart(withCollapsibleContext(Home))

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
    backgroundColor: Colors.primary,
    borderRadius: moderateScale(20),
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScaleVertical(5),
    zIndex: 999,
  }
})