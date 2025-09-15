import CustomText from '@components/global/CustomText';
import { shadowStyle } from '@styles/GlobalStyles';
import { Colors, Fonts } from '@utils/Constants';
import { moderateScale, textScale } from '@utils/responsiveSize';
import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const HistoryAndExpertTab = () => {
  return (
    <View style={styles.container}>
      <View style={[styles.card, shadowStyle]}>
        <View style={styles.textContainer}>
          <CustomText variant='h9' fontFamily={Fonts.SemiBold}>Booking History</CustomText>
          <CustomText fontSize={textScale(6)} fontFamily={Fonts.Medium} style={{ color: Colors.mutedPurple }} >Your previous tests</CustomText>
        </View>
        <Image source={require('@assets/images/calender.png')} style={styles.icon} resizeMode="contain" />
      </View>

      <View style={[styles.card, shadowStyle]}>
        <View style={styles.textContainer}>
          <CustomText variant='h9' fontFamily={Fonts.SemiBold}>Call Our Expert</CustomText>
          <CustomText fontSize={textScale(6)} fontFamily={Fonts.Medium} style={{ color: Colors.mutedPurple }}>to book now call us</CustomText>
        </View>
        <Image source={require('@assets/images/callExpert.png')} style={styles.icon} resizeMode="contain" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(20),
    height: moderateScale(80),
    marginHorizontal: moderateScale(20),
  },
  card: {
    flex: 1,
    backgroundColor: Colors.white1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: moderateScale(15),
    height: moderateScale(65),
    borderRadius: moderateScale(10),
  },
  textContainer: {
    gap: moderateScale(3),
  },
  icon: {
    height: moderateScale(32),
    width: moderateScale(32),
  },
});

export default HistoryAndExpertTab;
