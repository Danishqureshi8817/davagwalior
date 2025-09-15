import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC, useState } from 'react'
import { moderateScale, moderateScaleVertical } from '@utils/responsiveSize'
import { Colors, Fonts } from '@utils/Constants'
import Icon from "react-native-vector-icons/Ionicons";
import { RFValue } from 'react-native-responsive-fontsize';
import RollingBar from 'react-native-rolling-bar';
import CustomText from '@components/global/CustomText';

const SearchBar: FC = () => {

  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.8} >
      <Icon name="search" size={RFValue(20)} color={Colors.deepPurple} />

      <CustomText variant='h6' fontFamily={Fonts.Medium} style={{ color: Colors.mutedPurple, paddingLeft: moderateScale(15) }} >Search</CustomText>
      <RollingBar customStyle={styles.textContainer} interval={3000} defaultStyle={false} >
        <CustomText variant='h6' fontFamily={Fonts.Medium} style={{ color: Colors.deepPurple }} >"Medicines"</CustomText>
        <CustomText variant='h6' fontFamily={Fonts.Medium} style={{ color: Colors.deepPurple }} >"Lab Tests"</CustomText>
      </RollingBar>

      {/* <View style={styles.divider} />

      <Icon name="mic" size={RFValue(20)} color={Colors.black} /> */}
    </TouchableOpacity>
  )
}

export default SearchBar

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: moderateScale(10),
    borderWidth: 0.6,
    borderColor: Colors.border,
    marginTop: moderateScaleVertical(15),
    overflow: 'hidden',
    marginHorizontal: moderateScale(10),
    paddingHorizontal: moderateScale(10),
  },
  textContainer: {
    width: '90%',
    paddingLeft: moderateScale(10),
    height: moderateScale(50)
  },
  divider: {
    height: '100%',
    width: 1,
    backgroundColor: '#ddd',
    marginHorizontal: moderateScale(10)
  }
})