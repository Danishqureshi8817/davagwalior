import CustomText from '@components/global/CustomText';
import { Greater19Icon } from '@components/Icons';
import { Colors, Fonts } from '@utils/Constants';
import { moderateScale, moderateScaleVertical } from '@utils/responsiveSize';
import React from 'react';
import { View, Image, Pressable, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const PopularTests = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <CustomText variant='h6' fontFamily={Fonts.SemiBold} style={styles.headerTitle}>Popular Tests</CustomText>
        <Pressable style={styles.viewAll}>
          <CustomText variant='h7' fontFamily={Fonts.SemiBold} style={styles.viewAllText}>View All</CustomText>
          <Greater19Icon />
        </Pressable>
      </View>

      {[1, 2].map((_, index) => (
        <View
          key={index}
          style={[styles.testCard, index > 0 && styles.cardSpacing]}
        >
          <View style={styles.topSection}>
            <View style={styles.iconWrapper}>
              <Image
                source={require('@assets/images/popularTest.png')}
                style={styles.testIcon}
                resizeMode="contain"
              />
            </View>
            <View style={styles.testInfo}>
              <CustomText variant='h7' fontFamily={Fonts.Medium} style={styles.testTitle}>
                Complete Blood Count (CBC)
              </CustomText>
              <CustomText variant='h8' fontFamily={Fonts.Medium} style={styles.testSubText}>
                Reports in 24 hrs
              </CustomText>
            </View>
          </View>

          <View style={styles.bottomSection}>
            <View style={styles.priceInfo}>
              <CustomText variant='h9' fontFamily={Fonts.Regular} style={styles.priceLine}>
                Best price :{' '}
                <CustomText variant='h8' fontFamily={Fonts.Medium} style={styles.highlightedPrice}>
                  {'\u20B9'}120
                </CustomText>
              </CustomText>
              <CustomText variant='h9' fontFamily={Fonts.Regular} style={styles.priceLine}>
                MRP{' '}
                <CustomText variant='h8' fontFamily={Fonts.Regular} style={styles.strikeThroughPrice}>
                  {'\u20B9'}150
                </CustomText>{' '}
                <CustomText variant='h8' fontFamily={Fonts.Medium} style={styles.highlightedPrice}>30 off</CustomText>
              </CustomText>
            </View>

            <Pressable onPress={() => { }}>
              <LinearGradient
                colors={['#A74AC7', '#690DAC']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.addToCartBtn}
              >
                <View
                  style={{ height: '100%', alignItems: 'center', justifyContent: 'center' }}
                >
                  <CustomText
                    variant='h9'
                    fontFamily={Fonts.SemiBold}
                    style={{ color: Colors.white }}
                  >
                    ADD TO CART
                  </CustomText>
                </View>
              </LinearGradient>
            </Pressable>

          </View>
        </View>
      ))}
    </View>
  );
};

export default PopularTests;

const styles = StyleSheet.create({
  container: {
    marginTop: moderateScaleVertical(0),
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: moderateScale(20),
    marginVertical: moderateScaleVertical(30),
  },
  headerTitle: {
    color: Colors.black,
  },
  viewAll: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    color: Colors.grayish,
    marginRight: moderateScale(5),
  },
  testCard: {
    backgroundColor: Colors.lavenderBlush,
    height: moderateScale(135),
    marginHorizontal: moderateScale(20),
    borderRadius: moderateScale(10),
    paddingVertical: moderateScaleVertical(15),
    gap: moderateScale(15),
  },
  cardSpacing: {
    marginTop: moderateScaleVertical(15),
  },
  topSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(15),
    paddingHorizontal: moderateScale(20),
  },
  iconWrapper: {
    backgroundColor: Colors.white,
    height: moderateScale(42),
    width: moderateScale(42),
    borderRadius: moderateScale(21),
    alignItems: 'center',
    justifyContent: 'center',
  },
  testIcon: {
    height: moderateScale(24),
    width: moderateScale(24),
  },
  testInfo: {
    gap: moderateScaleVertical(3),
  },
  testTitle: {
    color: Colors.black,
  },
  testSubText: {
    color: Colors.mutedPurple,
  },
  bottomSection: {
    backgroundColor: Colors.white,
    height: moderateScale(57),
    marginHorizontal: moderateScale(5),
    borderBottomLeftRadius: moderateScale(8),
    borderBottomRightRadius: moderateScale(8),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(10),
  },
  priceInfo: {
    flexDirection: 'column',
    gap: moderateScaleVertical(3),
  },
  priceLine: {
    color: Colors.mutedPurple,
  },
  highlightedPrice: {
    color: Colors.darkViolet,
  },
  strikeThroughPrice: {
    color: Colors.mutedPurple,
    textDecorationLine: 'line-through',
  },
  addToCartBtn: {
    height: moderateScale(25),
    width: moderateScale(115),
    borderRadius: moderateScale(5),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
