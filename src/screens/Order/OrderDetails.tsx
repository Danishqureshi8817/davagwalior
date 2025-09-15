import React from 'react';
import { View, Image, Pressable, ActivityIndicator, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { format } from 'date-fns';
import useGetUserOrderDetails from '@hooks/order/get-order-details';
import { Container } from '@components/global/Container';
import { AppBar } from '@components/global/AppBar';
import { Colors } from '@utils/Constants';
import { moderateScale, moderateScaleVertical } from '@utils/responsiveSize';
import CustomText from '@components/global/CustomText';
import PrimaryButton from '@components/ui/PrimaryButton';
import Body from '@components/global/Body';
import PaymentDetails from '@components/Cart/PaymentDetails';


const OrderDetails = () => {
  // init
  const route = useRoute();
  const { orderId }: any = route?.params;

  // api
  const { data, isLoading } = useGetUserOrderDetails({ orderId });

  if (isLoading) {
    return (
      <Container statusBarBackgroundColor={Colors.paleGray} statusBarStyle="dark-content">
        <AppBar back title="Order Details" />
        <View style={styles.center}>
          <ActivityIndicator size="large" color={Colors.Purple} />
        </View>
      </Container>
    );
  }

  const order = data?.data?.result?.orderInfo[0];
  const orderDate = new Date(order?.createdAt as any);

  const OrderItem = () => (
    <View style={styles.itemContainer}>
      <View style={styles.imageWrapper}>
        <Image source={require('@assets/images/product2.png')} style={styles.image} />
      </View>
      <View style={styles.itemDetails}>
        <CustomText style={styles.itemTitle} numberOfLine={1}>Ashwagandha</CustomText>
        <CustomText style={styles.itemText} numberOfLine={1}>
          Brand Name: <CustomText style={styles.brandText}>KORESELECT</CustomText>
        </CustomText>
        <View style={styles.priceRow}>
          <View style={styles.priceInfo}>
            <CustomText style={styles.price}>{'\u20B9'}450.00</CustomText>
            <CustomText style={styles.offer}>1 Offer</CustomText>
          </View>
          <Pressable>
            <CustomText style={styles.cancel}>Cancel</CustomText>
          </Pressable>
        </View>
      </View>
    </View>
  );

  return (
    <Container statusBarBackgroundColor={Colors.paleGray} statusBarStyle="dark-content">
      <AppBar back title="Order Details" />
      <Body showsVerticalScrollIndicator={false}>
        <CustomText style={styles.sectionTitle}>2 Items in this order</CustomText>
        <View style={styles.box}>
          <OrderItem />
          <OrderItem />
        </View>

        {/* <CustomText style={styles.sectionTitle}>Billing Details</CustomText>
        <View style={styles.billingBox}>
          {[
            ['MRP Total', '\u20B9 228.80'],
            ['Items Discount', '-\u20B9 28.80'],
            ['Coupon Discount', '-\u20B9 15.80'],
            ['Shipping / Delivery Charges', 'Free'],
          ].map(([label, value], idx) => (
            <View style={styles.row} key={idx}>
              <CustomText style={styles.label}>{label}</CustomText>
              <CustomText style={styles.value}>{value}</CustomText>
            </View>
          ))}
          <View style={styles.separator} />
          <View style={styles.row}>
            <CustomText style={styles.totalLabel}>Total</CustomText>
            <CustomText style={styles.totalValue}>{'\u20B9'}180.80</CustomText>
          </View>
          <View style={styles.savingsBox}>
            <CustomText style={styles.savingsLabel}>Total Savings</CustomText>
            <CustomText style={styles.savingsValue}>{'\u20B9'}15.80</CustomText>
          </View>
        </View> */}

        <PaymentDetails title='Bill Details'/>

        <CustomText style={styles.sectionTitle}>Order Status</CustomText>
        <View style={styles.box}>
          <View style={styles.statusSection}>
            <CustomText style={styles.statusLabel}>Order Id</CustomText>
            <CustomText style={styles.statusValue}>{order?.orderId}</CustomText>
            <CustomText style={styles.statusLabel}>Payment</CustomText>
            <CustomText style={styles.statusValue}>{order?.paymentMod}</CustomText>
          </View>
          <View style={styles.statusSection}>
            <CustomText style={styles.statusLabel}>Deliver To</CustomText>
            <CustomText style={styles.statusValue} numberOfLine={2}>{order?.address}</CustomText>
            <CustomText style={styles.statusLabel}>Delivery Date</CustomText>
            <CustomText style={styles.statusValue}>{format(orderDate, 'dd MMM yyyy')}</CustomText>
          </View>
        </View>

        <View style={styles.refundBox}>
          <CustomText style={styles.refundText}>Refund and Cancel</CustomText>
        </View>

      </Body>
      <PrimaryButton
        buttonText="Track Order"
        marginHorizontal={moderateScale(20)}
        height={moderateScaleVertical(48)}
        marginVertical={moderateScaleVertical(20)}
        borderRadius={moderateScale(10)}
      />
    </Container>
  );
};

export default OrderDetails;

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: Colors.black,
    marginHorizontal: moderateScale(20),
    marginVertical: moderateScaleVertical(25),
    lineHeight: 18,
  },
  box: {
    backgroundColor: Colors.paleGray,
  },
  itemContainer: {
    flexDirection: 'row',
    marginHorizontal: moderateScale(20),
    height: moderateScaleVertical(120),
    borderBottomWidth: 1,
    borderBottomColor: Colors.brightGray,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imageWrapper: {
    width: moderateScale(75),
    height: moderateScale(75),
    backgroundColor: Colors.white,
    borderRadius: moderateScale(8),
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: moderateScale(64),
    height: moderateScale(64),
    resizeMode: 'contain',
  },
  itemDetails: {
    flex: 1,
    marginLeft: moderateScale(15),
    gap: moderateScaleVertical(10),
  },
  itemTitle: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: Colors.black,
  },
  itemText: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: Colors.black,
  },
  brandText: {
    fontFamily: 'Poppins-Medium',
    color: Colors.grayish,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(10),
  },
  price: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: Colors.deepPurple,
  },
  offer: {
    fontFamily: 'Poppins-Medium',
    fontSize: 10,
    color: Colors.mutedPurple,
  },
  cancel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 10,
    color: Colors.red,
  },
  billingBox: {
    backgroundColor: Colors.paleGray,
    paddingVertical: moderateScaleVertical(20),
    paddingHorizontal: moderateScale(20),
    gap: moderateScaleVertical(18),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.mutedPurple,
  },
  value: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: Colors.black,
  },
  totalLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: Colors.deepPurple,
  },
  totalValue: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: Colors.deepPurple,
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.brightGray,
  },
  savingsBox: {
    backgroundColor: Colors.mintCream,
    height: moderateScaleVertical(40),
    borderRadius: moderateScale(5),
    flexDirection: 'row',
    paddingHorizontal: moderateScale(10),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  savingsLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: Colors.mediumAquamarine,
  },
  savingsValue: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: Colors.mediumAquamarine,
  },
  statusSection: {
    marginHorizontal: moderateScale(20),
    paddingVertical: moderateScaleVertical(20),
    borderBottomWidth: 1,
    borderBottomColor: Colors.brightGray,
    gap: moderateScaleVertical(10),
  },
  statusLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: Colors.mutedPurple,
  },
  statusValue: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.black,
  },
  refundBox: {
    backgroundColor: Colors.paleGray,
    height: moderateScaleVertical(40),
    justifyContent: 'center',
    marginTop: moderateScaleVertical(20),
  },
  refundText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: Colors.mutedPurple,
    paddingHorizontal: moderateScale(20),
  },
});
