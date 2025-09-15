import { Image, StyleSheet, View } from 'react-native';
import React, { FC } from 'react';
import { Colors, Fonts } from '@utils/Constants';
import { moderateScale, moderateScaleVertical } from '@utils/responsiveSize';
import CustomText from '@components/global/CustomText';
import { RFValue } from 'react-native-responsive-fontsize';

const SubstitutesBox: FC = () => {
  const benefits = [
    {
      title: 'Safe',
      desc: 'FDA and GMP certified medicines',
      img: require('@assets/images/safe.png'),
    },
    {
      title: 'Same',
      desc: 'Exact same salt composition',
      img: require('@assets/images/same.png'),
    },
    {
      title: 'Saving',
      desc: 'Up to 60% cheaper',
      img: require('@assets/images/saving.png'),
    },
  ];

  return (
    <View style={styles.container}>
      <Image
        alt="savemoney"
        source={require('@assets/images/savemoneyHome.png')}
        style={styles.headerImage}
      />

      <CustomText
        variant='h8'
        fontFamily={Fonts.Medium}
        style={styles.titleText}
        numberOfLine={1}
      >
        Substitutes are the smarter choice
      </CustomText>

      <View style={styles.benefitsContainer}>
        {benefits.map((item, index) => (
          <View key={index} style={styles.benefitItem}>
            <Image source={item.img} style={styles.benefitImage} />
            <CustomText
              variant='h9'
              fontFamily={Fonts.Medium}
              style={styles.benefitTitle}
              numberOfLine={1}
            >
              {item.title}
            </CustomText>
            <CustomText
              fontSize={RFValue(6)}
              fontFamily={Fonts.Regular}
              style={styles.benefitDesc}
              numberOfLine={2}
            >
              {item.desc}
            </CustomText>
          </View>
        ))}
      </View>

      <View style={styles.footer}>
        <CustomText
          variant='h9'
          fontFamily={Fonts.Medium}
          style={styles.footerText}
          numberOfLine={1}
        >
          All generics are made by top 1% medicine manufacturers
        </CustomText>
      </View>
    </View>
  );
};

export default SubstitutesBox;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.lavenderBlush,
    height: moderateScale(330),
    borderRadius: moderateScale(10),
    alignItems: 'center',
    overflow: 'hidden',
  },
  headerImage: {
    width: '95%',
    height: moderateScale(140),
    resizeMode: 'contain',
    marginTop: moderateScaleVertical(5),
  },
  titleText: {
    color: Colors.black,
    alignSelf: 'flex-start',
    marginTop: moderateScaleVertical(15),
    marginLeft: moderateScale(12),
    paddingHorizontal: moderateScale(10),
  },
  benefitsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: moderateScale(20),
    paddingHorizontal: moderateScale(10),
  },
  benefitItem: {
    alignItems: 'center',
    flex: 1,
    gap: moderateScale(5),
  },
  benefitImage: {
    width: moderateScale(30),
    height: moderateScale(30),
    resizeMode: 'contain',
  },
  benefitTitle: {
    color: Colors.black,
  },
  benefitDesc: {
    color: Colors.mutedPurple,
    width: moderateScale(84),
    textAlign: 'center',
  },
  footer: {
    backgroundColor: Colors.Purple,
    height: moderateScale(25),
    width: '100%',
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerText: {
    color: Colors.white,
  },
});
