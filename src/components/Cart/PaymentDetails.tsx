import React, { FC, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { moderateScale, moderateScaleVertical } from '@utils/responsiveSize';
import { Colors, Fonts } from '@utils/Constants';
import CustomText from '@components/global/CustomText';
import { useCartStore } from '@state/cartStore';
import { getCharge } from '@utils/helperFunctions';
import { useAuthStore } from '@state/authStore';

interface PaymentDetailsProps {
  title : string;
  selectedShippingOption: string;
  codCharge: number;
  couponDiscount?: number;
}

const ReportItem : FC<{underline?: boolean; title: string; price: number}> = ({underline, title, price}) => {

  return (
    <View style={styles.rowBetween}>
    <CustomText fontFamily={Fonts.Regular} variant='h7' style={{color: Colors.mutedPurple}}>
      {title}
    </CustomText>
    <CustomText fontFamily={Fonts.Medium} variant='h7' style={{ textDecorationLine: underline ? 'underline' : 'none' }}>
    { price === 0 ? 'Free' : `₹ ${price.toFixed(2)}`}
    </CustomText>
  </View>
  );
}

const PaymentDetails : FC <PaymentDetailsProps> = ({title, selectedShippingOption, codCharge, couponDiscount = 0}) => {
  const { getTotalPrice, cart } = useCartStore();
  const { settingData } = useAuthStore();

  // Calculate all charges and totals
  const calculations = useMemo(() => {
    const subtotal = getTotalPrice();
    
    // Calculate shipping charges
    let shippingCharge = 0;
    if (settingData?.deliveryCharges && settingData?.expressCharges) {
      const deliveryCharges = JSON.parse(settingData?.deliveryCharges);
      const expressCharges = JSON.parse(settingData?.expressCharges);
      
      if (selectedShippingOption === 'SURFACE') {
        shippingCharge = getCharge(subtotal, deliveryCharges);
      } else if (selectedShippingOption === 'EXPRESS') {
        shippingCharge = getCharge(subtotal, expressCharges);
      }
    }

    // Calculate MRP total (sum of original prices)
    const mrpTotal = cart?.reduce((total, cartItem) => {
      const originalPrice = cartItem?.item?.originalPrice || cartItem?.item?.sellPrice;
      return total + (originalPrice * cartItem?.count);
    }, 0) || 0;

    // Calculate items discount (difference between MRP and sell price)
    const itemsDiscount = mrpTotal - subtotal;

    // Calculate total before COD charge
    const totalBeforeCOD = subtotal + shippingCharge - couponDiscount;
    
    // Final total including COD charge
    const finalTotal = totalBeforeCOD + codCharge;

    // Total savings
    const totalSavings = itemsDiscount + couponDiscount;

    return {
      mrpTotal,
      subtotal,
      itemsDiscount: itemsDiscount > 0 ? itemsDiscount : 0,
      couponDiscount,
      shippingCharge,
      codCharge,
      finalTotal,
      totalSavings
    };
  }, [cart, getTotalPrice, selectedShippingOption, codCharge, couponDiscount, settingData]);

  return (
    <View>
      <View style={styles.headerRow}>
        <CustomText
          fontFamily={Fonts.SemiBold}
          variant='h6'
          numberOfLine={1}
        >
          {title}
        </CustomText>
      </View>

      <View style={styles.paymentContainer}>

        <ReportItem title='MRP Total' price={calculations.mrpTotal} />

        {calculations.itemsDiscount > 0 && (
          <ReportItem title='Items Discount' price={calculations.itemsDiscount} />
        )}

        {calculations.couponDiscount > 0 && (
          <ReportItem title='Coupon Discount' price={calculations.couponDiscount} />
        )}

        <ReportItem title='Shipping / Delivery Charges' price={calculations.shippingCharge} />

        {codCharge > 0 && (
          <ReportItem title='COD Charges' price={codCharge} />
        )}

        <View style={styles.divider} />

        <View style={styles.rowBetween}>
          <CustomText fontFamily={Fonts.Regular} variant='h6' style={{color:Colors.deepPurple}}>
            Total
          </CustomText>
          <CustomText fontFamily={Fonts.SemiBold} variant='h5' style={{color:Colors.deepPurple}}>
            {'\u20B9'}{calculations.finalTotal.toFixed(2)}
          </CustomText>
        </View>

        {calculations.totalSavings > 0 && (
          <View style={styles.savingsBox}>
            <CustomText fontFamily={Fonts.Regular} variant='h5' style={{color:Colors.mediumAquamarine}}>
              Total Savings
            </CustomText>
            <CustomText fontFamily={Fonts.SemiBold} variant='h5' style={{color:Colors.mediumAquamarine}}>
              {'\u20B9'}{calculations.totalSavings.toFixed(2)}
            </CustomText>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: moderateScale(20),
    marginVertical: moderateScaleVertical(20),
  },
  paymentContainer: {
    backgroundColor: Colors.paleGray,
    paddingVertical: moderateScaleVertical(20),
    paddingHorizontal: moderateScale(20),
    gap: moderateScaleVertical(18),
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  divider: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.brightGray,
  },
  savingsBox: {
    backgroundColor: Colors.mintCream,
    height: 40,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(10),
  }
});

export default PaymentDetails;
