import { ImageBackground, StyleSheet } from 'react-native'
import React from 'react'
import { moderateScale } from '@utils/responsiveSize'
import { screenHeight, screenWidth } from '@utils/Scaling'
import { useCollapsibleContext } from '@r0b0t3d/react-native-collapsible'
import Animated, { interpolate, useAnimatedStyle } from 'react-native-reanimated'

const Visuals = () => {
  // init
  const { scrollY } = useCollapsibleContext();

  const headerAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scrollY.value, [0, 120], [1, 0]);
    return {
      opacity
    }
  })

  return (
    <Animated.View style={[styles.container, headerAnimatedStyle]}  >
      <ImageBackground alt='topBg' source={require('@assets/images/topBg.png')} style={{ height: moderateScale(110), width: screenWidth }} >
      </ImageBackground>
    </Animated.View>
  )
}

export default Visuals

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
  },
  lottie: {
    width: '100%',
    height: moderateScale(150),
    position: 'absolute',
    transform: [{ scaleX: -1 }]
  },
  gradient: {
    width: '100%',
    height: screenHeight * 0.4,
    position: 'absolute'
  },
  cloud: {
    width: screenWidth,
    resizeMode: 'stretch',
    height: moderateScale(100),
  }
})