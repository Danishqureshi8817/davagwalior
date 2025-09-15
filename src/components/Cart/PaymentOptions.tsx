import { View, Pressable, StyleSheet } from 'react-native';
import React, { FC } from 'react';
import CustomText from '@components/global/CustomText';
import { moderateScale, moderateScaleVertical } from '@utils/responsiveSize';
import { Colors, Fonts } from '@utils/Constants';

interface PaymentOptionsProps {
  selectedPaymentOption: any;
  onPaymentOptionPress: (category: any) => void;
}

const PaymentOptions : FC <PaymentOptionsProps> = ({ selectedPaymentOption, onPaymentOptionPress,  }) => {
  return (
    <View>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: moderateScale(20), marginVertical: moderateScaleVertical(20) }} >
        <CustomText fontFamily={Fonts.SemiBold} variant="h6" numberOfLine={1}>Payment Option</CustomText>
      </View>

      <View style={styles.container}>
      {/* Surface Option */}
      <Pressable onPress={() => onPaymentOptionPress(20)}>
        <View style={styles.optionRow}>
          <View style={styles.optionLeft}>
            <View style={styles.outerCircle}>
              <View
                style={[
                  styles.innerCircle,
                  {
                    backgroundColor:
                    !!selectedPaymentOption ? Colors.mutedPurple : Colors.white
                  },
                ]}
              />
            </View>
            <CustomText style={styles.optionText} numberOfLine={1}>
            Cash on Delivery(COD)
            </CustomText>
          </View>
          {/* <CustomText style={styles.priceText} numberOfLine={1}>
            {'\u20B9'} {'133'}
          </CustomText> */}
        </View>
      </Pressable>

      {/* Express Option */}
      <Pressable onPress={() => onPaymentOptionPress(0)}>
        <View style={styles.optionRow}>
          <View style={styles.optionLeft}>
            <View style={styles.outerCircle}>
              <View
                style={[
                  styles.innerCircle,
                  {
                    backgroundColor:
                    !(!!selectedPaymentOption) ? Colors.mutedPurple : Colors.white
                  },
                ]}
              />
            </View>
            <CustomText style={styles.optionText} numberOfLine={1}>
            Prepaid
            </CustomText>
          </View>
          {/* <CustomText style={styles.priceText} numberOfLine={1}>
            {'\u20B9'} { '233'}
          </CustomText> */}
        </View>
      </Pressable>
    </View>
    </View>

  );
};

export default PaymentOptions;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.paleGray,
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateScaleVertical(20),
    gap: moderateScaleVertical(15),
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(12),
  },
  outerCircle: {
    borderColor: Colors.mutedPurple,
    borderWidth: 2,
    height: moderateScale(24),
    width: moderateScale(24),
    borderRadius: moderateScale(12),
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerCircle: {
    height: moderateScale(16),
    width: moderateScale(16),
    borderRadius: moderateScale(8),
  },
  optionText: {
    fontFamily: Fonts.Medium,
    fontSize: 14,
    lineHeight: 16,
    color: Colors.mutedPurple,
  },
  priceText: {
    fontFamily: Fonts.Medium,
    fontSize: 14,
    lineHeight: 16,
    color: Colors.black,
  },
});
