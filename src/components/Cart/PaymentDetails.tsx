import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';
import { moderateScale, moderateScaleVertical } from '@utils/responsiveSize';
import { Colors, Fonts } from '@utils/Constants';
import CustomText from '@components/global/CustomText';

interface PaymentDetailsProps {
  title : string;

}

const ReportItem : FC<{underline?: boolean; title: string; price: number}> = ({underline, title, price}) => {

  return (
    <View style={styles.rowBetween}>
    <CustomText fontFamily={Fonts.Regular} variant='h7' style={{color: Colors.mutedPurple}}>
      {title}
    </CustomText>
    <CustomText fontFamily={Fonts.Medium} variant='h7' style={{ textDecorationLine: underline ? 'underline' : 'none' }}>
    { price === 0 ? 'Free' : `₹ ${price}`}
    </CustomText>
  </View>
  );
}

const PaymentDetails : FC <PaymentDetailsProps> = ({title}) => {
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

        <ReportItem title='MRP Total' price={2323} />

        <ReportItem title='Items Discount' price={28.80} />

        <ReportItem title='Coupon Discount' price={15.80} />

        <ReportItem title='Shipping / Delivery Charges' price={0} />

        <View style={styles.divider} />

        <View style={styles.rowBetween}>
          <CustomText fontFamily={Fonts.Regular} variant='h6' style={{color:Colors.deepPurple}}>
            Total
          </CustomText>
          <CustomText fontFamily={Fonts.SemiBold} variant='h5' style={{color:Colors.deepPurple}}>
            {'\u20B9'}180.80
          </CustomText>
        </View>

        <View style={styles.savingsBox}>
          <CustomText fontFamily={Fonts.Regular} variant='h5' style={{color:Colors.mediumAquamarine}}>
            Total Savings
          </CustomText>
          <CustomText fontFamily={Fonts.SemiBold} variant='h5' style={{color:Colors.mediumAquamarine}}>
            {'\u20B9'}15.80
          </CustomText>
        </View>
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
