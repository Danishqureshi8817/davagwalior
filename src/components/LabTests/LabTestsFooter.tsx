import React from 'react';
import CustomText from '@components/global/CustomText';
import { Colors, Fonts } from '@utils/Constants';
import { moderateScale, moderateScaleVertical } from '@utils/responsiveSize';
import { View, Image, StyleSheet } from 'react-native';

const LabTestsFooter = () => {
  return (
    <View style={styles.container}>
      {/* Certified Safety Card */}
      <View style={styles.certifiedCard}>
        <View style={styles.certifiedIconContainer}>
          <Image
            alt="Icon"
            source={require('@assets/images/certified.png')}
            style={styles.certifiedIcon}
            resizeMode="contain"
          />
        </View>
        <CustomText style={styles.certifiedTitle}>Certified Safety and Quality</CustomText>
        <CustomText variant='h8' fontFamily={Fonts.Regular} style={styles.certifiedSubtext}>
          Ensuring peace of mind with our commitment to certified safety and superior quality standards
        </CustomText>
        <View style={styles.certifiedFooter}>
          <CustomText variant='h8' fontFamily={Fonts.Medium} style={styles.certifiedFooterText}>Trusted by 20+ customers</CustomText>
        </View>
      </View>

      {/* Three Point Info */}
      <View style={styles.infoCard}>
        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Image source={require('@assets/images/happyCustomer.png')} style={styles.infoIcon} resizeMode="contain" />
            <CustomText variant='h9' fontFamily={Fonts.Medium} style={styles.infoText} numberOfLine={2}>Book lab tests from accredited labs</CustomText>
          </View>
          <View style={styles.infoItem}>
            <Image source={require('@assets/images/authentic.png')} style={styles.infoIcon} resizeMode="contain" />
            <CustomText variant='h9' fontFamily={Fonts.Medium} style={styles.infoText} numberOfLine={2}>100+ tests & packages offered</CustomText>
          </View>
          <View style={styles.infoItem}>
            <Image source={require('@assets/images/qualityCheck.png')} style={styles.infoIcon} resizeMode="contain" />
            <CustomText variant='h9' fontFamily={Fonts.Medium} style={styles.infoText} numberOfLine={2}>100+ pin codes serving home samples</CustomText>
          </View>
        </View>
      </View>

      {/* Safety Highlights */}
      <View style={styles.highlightsContainer}>
        <CustomText variant='h7' fontFamily={Fonts.Medium} style={styles.highlightsTitle}>100% safe & secure lab tests</CustomText>
        <CustomText variant='h7' fontFamily={Fonts.Light} style={styles.bulletText}>•  Govt approved diagnostics centers</CustomText>
        <CustomText variant='h7' fontFamily={Fonts.Light} style={styles.bulletText}>•  Regular disinfection of labs</CustomText>
        <CustomText variant='h7' fontFamily={Fonts.Light} style={styles.bulletText}>•  Daily temperature check of all technicians</CustomText>
      </View>
    </View>
  );
};

export default LabTestsFooter;

const styles = StyleSheet.create({
  container: {
    marginTop: moderateScaleVertical(60),
    marginBottom: moderateScaleVertical(50),
  },
  certifiedCard: {
    backgroundColor: Colors.lavenderBlush,
    marginHorizontal: moderateScale(20),
    height: moderateScaleVertical(155),
    borderRadius: moderateScale(10),
  },
  certifiedIconContainer: {
    backgroundColor: Colors.lavenderBlush,
    marginHorizontal: moderateScale(20),
    height: moderateScale(55),
    width: moderateScale(55),
    borderRadius: moderateScale(27),
    borderWidth: 2,
    borderColor: Colors.white,
    alignSelf: 'center',
    marginTop: -moderateScale(30),
    alignItems: 'center',
    justifyContent: 'center',
  },
  certifiedIcon: {
    width: moderateScale(36),
    height: moderateScale(36),
  },
  certifiedTitle: {
    fontSize: moderateScale(14),
    lineHeight: moderateScale(16),
    color: Colors.black,
    textAlign: 'center',
    marginTop: moderateScaleVertical(30),
    fontFamily: 'Poppins-SemiBold',
  },
  certifiedSubtext: {
    color: Colors.mutedPurple,
    textAlign: 'center',
    marginHorizontal: moderateScale(30),
    marginTop: moderateScaleVertical(20),
  },
  certifiedFooter: {
    backgroundColor: Colors.darkViolet,
    height: moderateScale(23),
    width: '100%',
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: moderateScale(10),
    borderBottomRightRadius: moderateScale(10),
  },
  certifiedFooterText: {
    color: Colors.white,
  },
  infoCard: {
    backgroundColor: Colors.paleGray,
    borderRadius: moderateScale(10),
    marginVertical: moderateScaleVertical(25),
    height: moderateScaleVertical(125),
    overflow: 'hidden',
    justifyContent: 'center',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingVertical: moderateScaleVertical(20),
  },
  infoItem: {
    alignItems: 'center',
    gap: moderateScaleVertical(10),
    flex: 1,
  },
  infoIcon: {
    width: moderateScale(35),
    height: moderateScale(35),
  },
  infoText: {
    color: Colors.black,
    textAlign: 'center',
  },
  highlightsContainer: {
    marginHorizontal: moderateScale(20),
    gap: moderateScaleVertical(10),
  },
  highlightsTitle: {
    color: Colors.black,
  },
  bulletText: {
    color: Colors.mutedPurple,
  },
});
