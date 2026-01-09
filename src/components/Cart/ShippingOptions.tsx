import { View, Pressable, StyleSheet } from 'react-native';
import React, { FC } from 'react';
import CustomText from '@components/global/CustomText';
import { moderateScale, moderateScaleVertical } from '@utils/responsiveSize';
import { Colors, Fonts } from '@utils/Constants';
import { getCharge } from '@utils/helperFunctions';
import { useCartStore } from '@state/cartStore';
import { useAuthStore } from '@state/authStore';

interface ShippingOptionsProps {
  selectedShippingOption: any;
  onShippingOptionPress: (category: any) => void;
}

const ShippingOptions : FC <ShippingOptionsProps> = ({ selectedShippingOption, onShippingOptionPress,  }) => {

  // init
  const { settingData } = useAuthStore()
  const { getTotalPrice, cart, clearCart } = useCartStore();
  const totalItemPrice = getTotalPrice()

  
  const codCharges = JSON.parse(settingData?.codCharges);
  const deliveryCharges = JSON.parse(settingData?.deliveryCharges);
  const expressCharges = JSON.parse(settingData?.expressCharges);
  
  const codCharge = getCharge(totalItemPrice, codCharges);
  const deliveryCharge = getCharge(totalItemPrice, deliveryCharges);
  const expressCharge = getCharge(totalItemPrice, expressCharges);

  return (
    <View>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: moderateScale(20), marginVertical: moderateScaleVertical(20) }} >
        <CustomText fontFamily={Fonts.SemiBold} variant="h6" numberOfLine={1}>Shipping Option</CustomText>
      </View>

      <View style={styles.container}>
      {/* Surface Option */}
      <Pressable onPress={() => onShippingOptionPress('SURFACE')}>
        <View style={styles.optionRow}>
          <View style={styles.optionLeft}>
            <View style={styles.outerCircle}>
              <View
                style={[
                  styles.innerCircle,
                  {
                    backgroundColor:
                      selectedShippingOption === 'SURFACE'
                        ? Colors.mutedPurple
                        : Colors.white,
                  },
                ]}
              />
            </View>
            <CustomText style={styles.optionText} numberOfLine={1}>
              Normal (5 days)
            </CustomText>
          </View>
          <CustomText style={styles.priceText} numberOfLine={1}>
            {'\u20B9'} {deliveryCharge}
          </CustomText>
        </View>
      </Pressable>

      {/* Express Option */}
      <Pressable onPress={() => onShippingOptionPress('EXPRESS')}>
        <View style={styles.optionRow}>
          <View style={styles.optionLeft}>
            <View style={styles.outerCircle}>
              <View
                style={[
                  styles.innerCircle,
                  {
                    backgroundColor:
                      selectedShippingOption === 'EXPRESS'
                        ? Colors.mutedPurple
                        : Colors.white,
                  },
                ]}
              />
            </View>
            <CustomText style={styles.optionText} numberOfLine={1}>
              Express (3 days)
            </CustomText>
          </View>
          <CustomText style={styles.priceText} numberOfLine={1}>
            {'\u20B9'} {expressCharge}
          </CustomText>
        </View>
      </Pressable>
    </View>
    </View>

  );
};

export default ShippingOptions;

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
