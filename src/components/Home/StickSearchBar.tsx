import { StyleSheet, } from 'react-native'
import React from 'react'
import { moderateScale } from '@utils/responsiveSize'
import { Colors } from '@utils/Constants'
import { StickyView, useCollapsibleContext } from '@r0b0t3d/react-native-collapsible'
import Animated, { interpolate, useAnimatedStyle } from 'react-native-reanimated'
import SearchBar from './SearchBar'

const StickSearchBar = () => {
  // init
  const { scrollY } = useCollapsibleContext()

  const animatedShadow = useAnimatedStyle(() => {
    const opacity = interpolate(scrollY.value, [0, 140], [1, 0]);
    return {
      opacity
    }
  })

  const backgroundColorChanges = useAnimatedStyle(() => {
    const opacity = interpolate(scrollY.value, [1, 80], [0, 1]);
    return {
      backgroundColor: `rgba(255,255,255,${opacity})`,
    }
  })
  return (
    <StickyView style={[backgroundColorChanges]} >
      <SearchBar />
      <Animated.View style={[styles.shadow, animatedShadow]} />
    </StickyView>
  )
}

export default StickSearchBar

const styles = StyleSheet.create({
  shadow: {
    height: moderateScale(15),
    width: '100%',
    borderBottomWidth: 0,
    borderBottomColor: Colors.border,
  }
})