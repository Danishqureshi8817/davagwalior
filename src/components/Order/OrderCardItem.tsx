import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';
import { OrderCardPastIcon } from '@components/Icons';
import { format } from 'date-fns';
import { Colors, RoutesName } from '@utils/Constants';
import { navigate } from '@utils/NavigationUtils';
import { moderateScale, moderateScaleVertical } from '@utils/responsiveSize';
import { RFValue } from 'react-native-responsive-fontsize';

const OrderCardItem: FC<{ item: any }> = ({ item }) => {
  const date = new Date(item?.createdAt);
  return (
    <View style={styles.card}>
      <View style={styles.rowBetween}>
        <View style={styles.iconContainer}>
          <OrderCardPastIcon />
        </View>
        <View style={styles.infoBlock}>
          <Text style={styles.orderId}>Order #{item?.orderId}</Text>
          <Text style={styles.label}>
            Quantity: <Text style={styles.value}>2</Text>
          </Text>
        </View>
        <View style={styles.infoBlock}>
          <Text style={styles.date}>{format(date, 'dd MMM yyyy')}</Text>
          <Text style={styles.label}>
            Subtotal: <Text style={styles.valueBold}>{'₹'}2400</Text>
          </Text>
        </View>
      </View>
      <View style={styles.rowBetween}>
        <Text style={styles.status}>IN-PROGRESS</Text>
        <Pressable
          onPress={() => navigate(RoutesName.OrderDetails, { orderId: item?.orderId })}
          style={styles.detailsButton}
        >
          <Text style={styles.detailsText}>Details</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default OrderCardItem;

const styles = StyleSheet.create({
  card: {
    height: moderateScale(138),
    borderColor: Colors.brightGray,
    borderWidth: 1,
    marginHorizontal: moderateScale(20),
    borderRadius: moderateScale(10),
    paddingHorizontal: moderateScale(15),
    paddingVertical: moderateScaleVertical(15),
    justifyContent: 'space-between',
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconContainer: {
    backgroundColor: Colors.lavenderBlush,
    height: moderateScale(48),
    width: moderateScale(48),
    borderRadius: moderateScale(5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoBlock: {
    gap: moderateScaleVertical(5),
    marginTop: moderateScaleVertical(5),
  },
  orderId: {
    fontFamily: 'Poppins-SemiBold',
    color: Colors.black,
    fontSize: RFValue(14),
  },
  label: {
    fontFamily: 'Poppins-Medium',
    color: Colors.mutedPurple,
    fontSize: RFValue(12),
  },
  value: {
    fontFamily: 'Poppins-Medium',
    color: Colors.black,
  },
  valueBold: {
    fontFamily: 'Poppins-SemiBold',
    color: Colors.black,
  },
  date: {
    fontFamily: 'Poppins-Medium',
    color: Colors.mutedPurple,
    fontSize: RFValue(10),
    alignSelf: 'flex-end',
  },
  status: {
    fontFamily: 'Poppins-Medium',
    color: Colors.yellow,
    fontSize: RFValue(12),
  },
  detailsButton: {
    width: moderateScale(80),
    height: moderateScale(30),
    borderColor: Colors.brightGray,
    borderWidth: 1,
    borderRadius: moderateScale(35),
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailsText: {
    fontFamily: 'Poppins-Medium',
    color: Colors.black,
    fontSize: RFValue(12),
  },
});
