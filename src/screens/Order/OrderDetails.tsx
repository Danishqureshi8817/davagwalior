import React from 'react';
import { View, Image, Pressable, ActivityIndicator, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { format } from 'date-fns';
import useGetUserOrderDetails from '@hooks/order/get-order-details';
import { Container } from '@components/global/Container';
import { AppBar } from '@components/global/AppBar';
import { Colors, Fonts } from '@utils/Constants';
import { moderateScale, moderateScaleVertical } from '@utils/responsiveSize';
import CustomText from '@components/global/CustomText';
import PrimaryButton from '@components/ui/PrimaryButton';
import Body from '@components/global/Body';


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
  const orderItems = order?.orderItems || [];
  const orderDate = new Date(order?.createdAt as any);

  // Calculate billing details from order data
  const mrpTotal = orderItems?.reduce((total: number, item: any) => {
    const buyPrice = item?.itemBuyPrice || 0;
    const quantity = item?.quantity || 0;
    return total + (buyPrice * quantity);
  }, 0) || 0;

  const itemsDiscount = Math.max(0, mrpTotal - (order?.subTotal || 0));
  const couponDiscount = order?.coupondiscount || 0;
  const shippingCharge = order?.shippingCharge || 0;
  const codCharge = order?.codCharge || 0;
  const finalTotal = order?.totalOrderAmount || order?.total || 0;
  const totalSavings = itemsDiscount + couponDiscount;

  const OrderItem = ({ item }: { item: any }) => (
    <View style={styles.itemContainer}>
      <View style={styles.imageWrapper}>
        <Image source={require('@assets/images/product2.png')} style={styles.image} />
      </View>
      <View style={styles.itemDetails}>
        <CustomText variant="h7" fontFamily={Fonts.SemiBold} style={styles.itemTitle} numberOfLine={1}>{item?.productName || 'N/A'}</CustomText>
        <CustomText variant="h7" fontFamily={Fonts.Regular} style={styles.itemText} numberOfLine={1}>
          Quantity: <CustomText variant="h7" fontFamily={Fonts.Medium} style={styles.brandText}>{item?.quantity || 0}</CustomText>
        </CustomText>
        <View style={styles.priceRow}>
          <View style={styles.priceInfo}>
            <CustomText variant="h6" fontFamily={Fonts.SemiBold} style={styles.price}>{'\u20B9'}{(item?.total || 0).toFixed(2)}</CustomText>
            {item?.itemBuyPrice && item?.total && item?.itemBuyPrice !== item?.total && (
              <CustomText variant="h8" fontFamily={Fonts.Medium} style={styles.offer}>{'\u20B9'}{item?.itemBuyPrice}</CustomText>
            )}
          </View>
          {/* <Pressable>
            <CustomText variant="h8" fontFamily={Fonts.Medium} style={styles.cancel}>Cancel</CustomText>
          </Pressable> */}
        </View>
      </View>
    </View>
  );

  return (
    <Container statusBarBackgroundColor={Colors.paleGray} statusBarStyle="dark-content">
      <AppBar back title="Order Details" />
      <Body showsVerticalScrollIndicator={false}>
        <CustomText variant="h6" fontFamily={Fonts.SemiBold} style={styles.sectionTitle}>
          {orderItems?.length || 0} {orderItems?.length === 1 ? 'Item' : 'Items'} in this order
        </CustomText>
        <View style={styles.box}>
          {orderItems?.map((item: any, index: number) => (
            <OrderItem key={item?.id || index} item={item} />
          ))}
        </View>

        <CustomText variant="h6" fontFamily={Fonts.SemiBold} style={styles.sectionTitle}>Bill Details</CustomText>
        <View style={styles.billingBox}>
          <View style={styles.row}>
            <CustomText variant="h6" fontFamily={Fonts.Regular} style={styles.label}>MRP Total</CustomText>
            <CustomText variant="h6" fontFamily={Fonts.Medium} style={styles.value}>{'\u20B9'} {mrpTotal.toFixed(2)}</CustomText>
          </View>
          {itemsDiscount > 0 && (
            <View style={styles.row}>
              <CustomText variant="h6" fontFamily={Fonts.Regular} style={styles.label}>Items Discount</CustomText>
              <CustomText variant="h6" fontFamily={Fonts.Medium} style={styles.value}>-{'\u20B9'} {itemsDiscount.toFixed(2)}</CustomText>
            </View>
          )}
          {couponDiscount > 0 && (
            <View style={styles.row}>
              <CustomText variant="h6" fontFamily={Fonts.Regular} style={styles.label}>Coupon Discount</CustomText>
              <CustomText variant="h6" fontFamily={Fonts.Medium} style={styles.value}>-{'\u20B9'} {couponDiscount.toFixed(2)}</CustomText>
            </View>
          )}
          <View style={styles.row}>
            <CustomText variant="h6" fontFamily={Fonts.Regular} style={styles.label}>Shipping / Delivery Charges</CustomText>
            <CustomText variant="h6" fontFamily={Fonts.Medium} style={styles.value}>
              {shippingCharge === 0 ? 'Free' : `\u20B9 ${shippingCharge.toFixed(2)}`}
            </CustomText>
          </View>
          {codCharge > 0 && (
            <View style={styles.row}>
              <CustomText variant="h6" fontFamily={Fonts.Regular} style={styles.label}>COD Charges</CustomText>
              <CustomText variant="h6" fontFamily={Fonts.Medium} style={styles.value}>{'\u20B9'} {codCharge.toFixed(2)}</CustomText>
            </View>
          )}
          <View style={styles.separator} />
          <View style={styles.row}>
            <CustomText variant="h6" fontFamily={Fonts.Regular} style={styles.totalLabel}>Total</CustomText>
            <CustomText variant="h5" fontFamily={Fonts.SemiBold} style={styles.totalValue}>{'\u20B9'} {finalTotal.toFixed(2)}</CustomText>
          </View>
          {totalSavings > 0 && (
            <View style={styles.savingsBox}>
              <CustomText variant="h6" fontFamily={Fonts.Regular} style={styles.savingsLabel}>Total Savings</CustomText>
              <CustomText variant="h5" fontFamily={Fonts.SemiBold} style={styles.savingsValue}>{'\u20B9'} {totalSavings.toFixed(2)}</CustomText>
            </View>
          )}
        </View>

        <CustomText variant="h6" fontFamily={Fonts.SemiBold} style={styles.sectionTitle}>Order Status</CustomText>
        <View style={styles.box}>
          <View style={styles.statusSection}>
            <CustomText variant="h7" fontFamily={Fonts.Regular} style={styles.statusLabel}>Order Id</CustomText>
            <CustomText variant="h6" fontFamily={Fonts.Regular} style={styles.statusValue}>{order?.orderId}</CustomText>
            <CustomText variant="h7" fontFamily={Fonts.Regular} style={styles.statusLabel}>Payment</CustomText>
            <CustomText variant="h6" fontFamily={Fonts.Regular} style={styles.statusValue}>{order?.paymentMod}</CustomText>
          </View>
          <View style={styles.statusSection}>
            <CustomText variant="h7" fontFamily={Fonts.Regular} style={styles.statusLabel}>Deliver To</CustomText>
            <CustomText variant="h6" fontFamily={Fonts.Regular} style={styles.statusValue} numberOfLine={2}>{order?.address}</CustomText>
            <CustomText variant="h7" fontFamily={Fonts.Regular} style={styles.statusLabel}>Delivery Date</CustomText>
            <CustomText variant="h6" fontFamily={Fonts.Regular} style={styles.statusValue}>{format(orderDate, 'dd MMM yyyy')}</CustomText>
          </View>
        </View>

        <View style={styles.refundBox}>
          <CustomText variant="h6" fontFamily={Fonts.Medium} style={styles.refundText}>Refund and Cancel</CustomText>
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
    height: moderateScaleVertical(100),
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
    gap: moderateScaleVertical(0),
  },
  itemTitle: {
    color: Colors.black,
  },
  itemText: {
    color: Colors.black,
  },
  brandText: {
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
    color: Colors.deepPurple,
  },
  offer: {
    color: Colors.mutedPurple,
    textDecorationLine: 'line-through',
  },
  cancel: {
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
    color: Colors.mutedPurple,
  },
  value: {
    color: Colors.black,
  },
  totalLabel: {
    color: Colors.deepPurple,
  },
  totalValue: {
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
    color: Colors.mediumAquamarine,
  },
  savingsValue: {
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
    color: Colors.mutedPurple,
  },
  statusValue: {
    color: Colors.black,
  },
  refundBox: {
    backgroundColor: Colors.paleGray,
    height: moderateScaleVertical(40),
    justifyContent: 'center',
    marginTop: moderateScaleVertical(20),
  },
  refundText: {
    color: Colors.mutedPurple,
    paddingHorizontal: moderateScale(20),
  },
});
