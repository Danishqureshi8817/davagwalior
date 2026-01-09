import { ActivityIndicator, Image, Platform, Pressable, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import { useState, useMemo, useEffect } from 'react'
import useGetSettings from '@hooks/auth/get-settings'
import useCreateOrder from '@hooks/order/create-order'
import useApplyCoupon from '@hooks/order/apply-coupon'
import { Container } from '@components/global/Container';
import { AppBar } from '@components/global/AppBar';
import { Colors, Fonts, RoutesName } from '@utils/Constants';
import Body from '@components/global/Body';
import { moderateScale, moderateScaleVertical } from '@utils/responsiveSize';
import { useCartStore } from '@state/cartStore';
import CustomText from '@components/global/CustomText';
import CartItems from '@components/Cart/CartItems';
import Icon from 'react-native-vector-icons/Ionicons';
import { RFValue } from 'react-native-responsive-fontsize';
import ShippingOptions from '@components/Cart/ShippingOptions';
import PaymentOptions from '@components/Cart/PaymentOptions';
import PaymentDetails from '@components/Cart/PaymentDetails';
import ProductsSlider from '@components/Home/ProductSlider';
import { useAuthStore } from '@state/authStore';
import MIcon from 'react-native-vector-icons/MaterialIcons'
import PrimaryButton from '@components/ui/PrimaryButton';
import CartAnimationWrapper from '@components/Cart/CartAnimationWrapper';
import { navigate } from '@utils/NavigationUtils';
import { getCharge } from '@utils/helperFunctions';
import { useToast } from "@masumdev/rn-toast";
import { useQueryClient } from '@tanstack/react-query';
import orderService from '@services/order-service';


const Cart = () => {

  // init
  const cartItems = useCartStore(state => state?.cart);
  const { getTotalPrice, cart, clearCart } = useCartStore();
  const { user, setCurrentOrder, settingData } = useAuthStore()
  const totalItemPrice = getTotalPrice()
  const { showToast } = useToast();
  const queryClient = useQueryClient();

  // states
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('COD')
  const [codCharge, setCodCharge] = useState(0)
  const [selectedShippingOption, setSelectedShippingOption] = useState('SURFACE')
  const [promoCode, setPromoCode] = useState('')
  const [appliedCouponDiscount, setAppliedCouponDiscount] = useState(0)
  const [appliedCoupon, setAppliedCoupon] = useState<any>(null)

  // api
  const { data: settingDataFromAPI, isLoading: settingIsLoading } = useGetSettings()
  const createOrderMutation = useCreateOrder()
  const applyCouponMutation = useApplyCoupon()

  // Calculate charges dynamically
  const charges = useMemo(() => {
    if (!settingData) return { shippingCharge: 0, codChargeAmount: 0 };

    let shippingCharge = 0;
    let codChargeAmount = 0;

    if (settingData?.deliveryCharges && settingData?.expressCharges) {
      const deliveryCharges = JSON.parse(settingData?.deliveryCharges);
      const expressCharges = JSON.parse(settingData?.expressCharges);
      
      if (selectedShippingOption === 'SURFACE') {
        shippingCharge = getCharge(totalItemPrice, deliveryCharges);
      } else if (selectedShippingOption === 'EXPRESS') {
        shippingCharge = getCharge(totalItemPrice, expressCharges);
      }
    }

    if (selectedPaymentMethod === 'COD' && settingData?.codCharges) {
      const codCharges = JSON.parse(settingData?.codCharges);
      codChargeAmount = getCharge(totalItemPrice, codCharges);
    }

    return { shippingCharge, codChargeAmount };
  }, [totalItemPrice, selectedShippingOption, selectedPaymentMethod, settingData]);

  // Update COD charge when payment method changes
  useEffect(() => {
    setCodCharge(charges.codChargeAmount);
  }, [charges.codChargeAmount]);

  // Clear coupon when cart is empty
  useEffect(() => {
    if (!cartItems || cartItems.length === 0) {
      setAppliedCoupon(null);
      setAppliedCouponDiscount(0);
      setPromoCode('');
    }
  }, [cartItems]);

  // Calculate final total
  const finalTotal = useMemo(() => {
    return totalItemPrice + charges.shippingCharge + codCharge - appliedCouponDiscount;
  }, [totalItemPrice, charges.shippingCharge, codCharge, appliedCouponDiscount]);

  // Handle payment option selection
  const handlePaymentOptionPress = (method: string, charge: number) => {
    setSelectedPaymentMethod(method);
    setCodCharge(charge);
  };

  // Handle promo code application
  const handleApplyPromoCode = async () => {
    if (!promoCode.trim()) {
      showToast('Please enter a promo code', 'error');
      return;
    }

    if (!cartItems || cartItems.length === 0) {
      showToast('Your cart is empty', 'error');
      return;
    }

    // Calculate total amount before applying coupon (subtotal + shipping)
    const totalBeforeCoupon = totalItemPrice + charges.shippingCharge;

    try {
      applyCouponMutation.mutate(
        {
          couponCode: promoCode.trim().toUpperCase(),
          totalAmount: totalBeforeCoupon
        },
        {
          onSuccess: (response) => {
            if (response?.data?.success) {
              const { coupon, discountAmount, finalAmount } = response.data.result;
              setAppliedCouponDiscount(discountAmount);
              setAppliedCoupon(coupon);
              showToast(response.data.message || 'Coupon code applied successfully', 'success');
            } else {
              showToast(response?.data?.message || 'Failed to apply coupon code', 'error');
              setAppliedCouponDiscount(0);
              setAppliedCoupon(null);
            }
          },
          onError: (error: any) => {
            const errorMessage = error?.response?.data?.message || 'Failed to apply coupon code';
            showToast(errorMessage, 'error');
            setAppliedCouponDiscount(0);
            setAppliedCoupon(null);
          }
        }
      );
    } catch (error) {
      showToast('An error occurred. Please try again.', 'error');
      setAppliedCouponDiscount(0);
      setAppliedCoupon(null);
    }
  };

  // Handle order creation
  const handlePlaceOrder = async () => {
    // Validation
    if (!cartItems || cartItems.length === 0) {
      showToast('Your cart is empty', 'error');
      return;
    }

    if (!user?.saveAddressLocal?.id && !user?.userLocation) {
      showToast('Please select a delivery address', 'error');
      navigate(RoutesName.Address);
      return;
    }

    const addressId = user?.saveAddressLocal?.id;
    if (!addressId) {
      showToast('Please select a valid delivery address', 'error');
      navigate(RoutesName.Address);
      return;
    }

    // Prepare order data
    const orderItems = cartItems.map(item => ({
      productId: item.item?.sku,
      quantity: item.count
    }));

    // Ensure payment method is ONLINE if not COD (handle any legacy PREPAID values)
    const paymentMethod = selectedPaymentMethod === 'COD' ? 'COD' : 'ONLINE';

    const orderData = {
      userId: user?.userUniqueId,
      addressId: addressId,
      orderItems: orderItems,
      couponCode: appliedCoupon?.coupon_code || promoCode || '',
      prescription: '',
      shippingCharge: charges.shippingCharge,
      codCharge: codCharge,
      shipMode: selectedShippingOption,
      paymentMod: paymentMethod
    };

    console.log(orderData,'orderData');

    try {
      createOrderMutation.mutate(orderData, {
        onSuccess: (response) => {
          if (response?.data?.success) {
            setCurrentOrder(response?.data?.result);
            clearCart();
            // Invalidate all order queries to refresh orders list
            queryClient.invalidateQueries({
              queryKey: [orderService.queryKeys.getOrders]
            });
            navigate(RoutesName.OrderSuccess);
            showToast('Order placed successfully!', 'success');
          } else {
            showToast(response?.data?.message || 'Failed to create order', 'error');
          }
        },
        onError: (error: any) => {
          const errorMessage = error?.response?.data?.message || 'Failed to create order. Please try again.';
          showToast(errorMessage, 'error');
        }
      });
    } catch (error) {
      showToast('An error occurred. Please try again.', 'error');
    }
  };

  if (settingIsLoading) {
    return (
      <Container statusBarBackgroundColor={Colors.paleGray} statusBarStyle='dark-content'>
        <AppBar back title='My Cart' />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size={'large'} color={Colors.Purple} />
        </View>
      </Container>
    )
  }

  return (
    <Container statusBarBackgroundColor={Colors.paleGray} statusBarStyle='dark-content'>
      <AppBar back title='My Cart' />
      <Body contentContainerStyle={{ paddingBottom: cartItems?.length > 0 ? moderateScaleVertical(125) : 0,backgroundColor: Colors.white }} >
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: moderateScale(20), marginVertical: moderateScaleVertical(15) }}  >
          <CustomText fontFamily={Fonts.Medium} variant="h6" style={{ color: Colors.black }} numberOfLine={1}>{cartItems?.length} Items in your cart</CustomText>
          <Pressable>
            <CustomText fontFamily={Fonts.Medium} variant="h7" style={{ color: Colors.deepLavende }} numberOfLine={1}>
              <CustomText fontFamily={Fonts.Medium} variant="h6" style={{ color: Colors.deepLavende }} numberOfLine={1}>+</CustomText> Add more
            </CustomText>
          </Pressable>
        </View>

        <CartItems />

        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: moderateScale(20), marginVertical: moderateScaleVertical(20) }} >
          <CustomText fontFamily={Fonts.SemiBold} variant="h6" style={{ color: Colors.black }} numberOfLine={1}>Promo Code</CustomText>
          <Pressable style={{ flexDirection: 'row', alignItems: 'center', gap: moderateScale(5) }}>
            <CustomText fontFamily={Fonts.SemiBold} variant="h7" style={{ color: Colors.grayish }} numberOfLine={1}>View all</CustomText>
            <Icon name='chevron-forward' color={Colors.grayish} size={RFValue(12)} />
          </Pressable>
        </View>

        {appliedCoupon ? (
          <View style={{ backgroundColor: Colors.mintCream, borderRadius: moderateScale(10), marginHorizontal: moderateScale(20), padding: moderateScale(15) }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: moderateScaleVertical(10) }}>
              <View style={{ flex: 1 }}>
                <CustomText fontFamily={Fonts.SemiBold} variant="h7" style={{ color: Colors.mediumAquamarine }} numberOfLine={1}>
                  {appliedCoupon.name}
                </CustomText>
                <CustomText fontFamily={Fonts.Regular} variant="h8" style={{ color: Colors.mutedPurple }} numberOfLine={1}>
                  Code: {appliedCoupon.coupon_code}
                </CustomText>
                <CustomText fontFamily={Fonts.Medium} variant="h8" style={{ color: Colors.mediumAquamarine, marginTop: moderateScaleVertical(4) }} numberOfLine={1}>
                  Discount: ₹{appliedCouponDiscount.toFixed(2)}
                </CustomText>
              </View>
              <Pressable
                onPress={() => {
                  setAppliedCoupon(null);
                  setAppliedCouponDiscount(0);
                  setPromoCode('');
                  showToast('Coupon removed', 'success');
                }}
                style={{ padding: moderateScale(5) }}
              >
                <Icon name='close-circle' color={Colors.red} size={RFValue(24)} />
              </Pressable>
            </View>
          </View>
        ) : (
          <View style={{ backgroundColor: Colors.lavenderBlush, height: moderateScale(150), borderRadius: moderateScale(10), marginHorizontal: moderateScale(20), justifyContent: 'center' }}>
            <View style={{ marginHorizontal: moderateScale(15), gap: moderateScaleVertical(8) }}>
              <CustomText fontFamily={Fonts.Medium} variant="h7" numberOfLine={1}>Add Promo Code</CustomText>
              <View style={{ backgroundColor: Colors.white, height: moderateScale(50), borderRadius: moderateScale(8), overflow: 'hidden', paddingLeft: moderateScale(10) }} >
                <TextInput
                  placeholder='Enter Code'
                  placeholderTextColor={Colors.grayish}
                  value={promoCode}
                  onChangeText={setPromoCode}
                  style={{ color: Colors.black, fontSize: RFValue(12), fontFamily: Fonts.Regular, height: '100%' }}
                />
              </View>
            </View>

            <Pressable 
              style={{ marginHorizontal: moderateScale(20), marginTop: moderateScaleVertical(15), alignSelf: 'flex-end' }} 
              onPress={handleApplyPromoCode}
              disabled={applyCouponMutation.isPending}
            >
              {applyCouponMutation.isPending ? (
                <ActivityIndicator size="small" color={Colors.deepLavende} />
              ) : (
                <CustomText fontFamily={Fonts.SemiBold} variant="h7" style={{ color: Colors.deepLavende }} numberOfLine={1}>Apply Code</CustomText>
              )}
            </Pressable>
          </View>
        )}

        <PaymentOptions
          selectedPaymentMethod={selectedPaymentMethod}
          onPaymentOptionPress={handlePaymentOptionPress}
        />

        <ShippingOptions
          selectedShippingOption={selectedShippingOption}
          onShippingOptionPress={(type) => setSelectedShippingOption(type)}
        />

        {cartItems?.length > 0 && (
          <PaymentDetails 
            title='Payment Details'
            selectedShippingOption={selectedShippingOption}
            codCharge={codCharge}
            couponDiscount={appliedCouponDiscount}
          />
        )}

        {/* <Box flexDirection='row' alignItems='center' justifyContent='space-between' mx={moderateScale(20)} my={moderateScaleVertical(20)}>
          <Text fontFamily='$poppinsSemiBold' fontSize={18} lineHeight={20} color={colors.black} numberOfLines={1}>Next month refill date</Text>
        </Box> */}

        {/* <Box bgColor={colors.paleGray} px={moderateScale(20)} py={moderateScaleVertical(20)} gap={moderateScale(15)} justifyContent='center'>
          <Box bgColor={colors.white} h={moderateScale(55)} flexDirection='row' gap={moderateScale(15)} alignItems='center' py={moderateScaleVertical(20)} px={moderateScale(20)} borderRadius={moderateScale(10)}>
            <OrdersColorIcon />
            <Text fontFamily='$poppinsMedium' fontSize={14} lineHeight={16} color={colors.mutedPurple} numberOfLines={1}>Select date</Text>
          </Box>
        </Box> */}

        {/* <View style={{ marginTop: moderateScaleVertical(20) }} >
          <ProductsSlider productData={null} sliderBgType='blue' />
        </View> */}


      </Body>

      <CartAnimationWrapper cartCount={cartItems?.length} >
        <View style={styles.absoluteContainer}>
          <View style={styles.addressContainer}>

            <View style={styles.flexRow} >
              <Image source={require('@assets/icons/deliveryPack.png')} style={{ width: moderateScale(20), height: moderateScale(20) }} />
              <View style={{ width: '75%' }} >
                <CustomText variant='h8' fontFamily={Fonts.Medium} >
                  Delivering to
                </CustomText>
                <CustomText variant='h9' numberOfLine={2} style={{ opacity: 0.6 }} >
                  {!!user?.saveAddressLocal?.Address ? user?.saveAddressLocal?.Address : user?.userLocation?.address || 'Please select address'}
                </CustomText>
              </View>
            </View>

            <TouchableOpacity onPress={() => { navigate(RoutesName.Address) }} activeOpacity={0.8} style={{ flexDirection: 'row', alignItems: 'center' }} >
              <CustomText variant='h8' fontFamily={Fonts.Medium} style={{ color: Colors.deepPurple }} >
                Change
              </CustomText>
              <MIcon name="arrow-right" size={RFValue(15)} color={Colors.deepPurple} />
            </TouchableOpacity>

          </View>

          <View style={styles.paymentGateway} >
            <View style={{ width: '40%' }} >
              <CustomText fontFamily={Fonts.SemiBold} variant='h5' style={{ color: Colors.darkViolet }}>
                {'\u20B9'}{finalTotal.toFixed(2)}
              </CustomText>
              <CustomText fontFamily={Fonts.Regular} variant='h8' style={{ color: Colors.mutedPurple }}>
                Total Amount
              </CustomText>
            </View>

            <View style={{ width: '60%', alignItems: 'flex-end' }} >
              <PrimaryButton
                onPress={handlePlaceOrder}
                loading={createOrderMutation.isPending}
                disabled={createOrderMutation.isPending || cartItems?.length === 0}
                buttonText='Place Order'
                height={moderateScale(50)}
                width={moderateScale(190)}
                borderRadius={moderateScale(10)}
              />
            </View>


          </View>
        </View>
      </CartAnimationWrapper>
    </Container>
  )
}

export default Cart

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    // backgroundColor: Colors.border,
    // padding: moderateScale(10),
  },
  cancelText: {
    marginTop: moderateScaleVertical(4),
    opacity: 0.6
  },
  flexRowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: moderateScale(10),
    borderRadius: moderateScale(15),
  },
  flexRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: moderateScale(10),
  },
  paymentGateway: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(9),
    paddingTop: moderateScaleVertical(10)
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(10),
    paddingBottom: moderateScaleVertical(10),
    borderBottomWidth: 0.7,
    borderBottomColor: Colors.border,
  },
  absoluteContainer: {
    marginVertical: moderateScaleVertical(15),
    marginBottom: Platform.OS == 'ios' ? 30 : 10
  }
})