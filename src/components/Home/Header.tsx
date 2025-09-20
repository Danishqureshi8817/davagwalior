import { ImageBackground, Platform, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC, useEffect } from 'react'
import { moderateScale, moderateScaleVertical } from '@utils/responsiveSize'
import Geolocation from '@react-native-community/geolocation'
import { useAuthStore } from '@state/authStore'
import { Colors, Fonts, RoutesName } from '@utils/Constants'
import { RFValue } from 'react-native-responsive-fontsize'
import { navigate } from '@utils/NavigationUtils'
import CustomText from '@components/global/CustomText'
import { CartIcon, WalletIcon } from '@components/Icons'
import LinearGradient from 'react-native-linear-gradient'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { reverseGeocode } from '@services/mapService'
import Icon from "react-native-vector-icons/Ionicons";
import useGetUserProfile from '@hooks/profile/get-user-profile'
import { useCartStore } from '@state/cartStore'

const Header: FC<{ showNotice: () => void }> = ({ showNotice }) => {

  // init
  const { user } = useAuthStore()
  const cartItems = useCartStore(state => state?.cart);

  // api
  const { data: profileData, isLoading: profileIsLoading } = useGetUserProfile({ userId: user?.userUniqueId })

  return (
    <View style={{ height: moderateScale(60),backgroundColor: '#F6F7F9' }} >
      <View style={{ flexDirection: 'row', marginTop: moderateScaleVertical(10) }}>
        <View style={{ gap: moderateScale(4), width: '60%', paddingLeft: moderateScale(20) }}>
          <CustomText variant='h8' fontFamily={Fonts.Medium} style={{ color: Colors.grayish }}>
            Deliver to
          </CustomText>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: moderateScale(3), }}>
            <CustomText variant='h7' fontFamily={Fonts.Medium} style={{ color: Colors.black, }} numberOfLine={1}>
              {user?.userLocation?.address || 'Your Address'}
            </CustomText>
            <Icon name="chevron-down" size={RFValue(15)} color='#9996A9' />
          </View>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', paddingRight: moderateScale(20), gap: moderateScale(32), width: '40%' }}>
          <Pressable onPress={() => navigate(RoutesName.Wallet)}>
            <WalletIcon />
            <View style={{
              width: moderateScale(39),
              height: moderateScale(19),
              borderRadius: moderateScale(6),
              alignItems: 'center',
              justifyContent: 'center',
              position: 'absolute',
              marginTop: moderateScaleVertical(-8),
              marginLeft: moderateScale(10),
              overflow: 'hidden'
            }}>
              <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={[Colors.deepPurple, Colors.darkViolet]}
                style={{ height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center' }}
              >
                <CustomText variant='h9' fontFamily={Fonts.Medium} style={{ color: Colors.white }} numberOfLine={1}>
                  {'\u20B9'}{profileData?.data?.result?.wallet || 0}
                </CustomText>
              </LinearGradient>
            </View>
          </Pressable>

          <Pressable onPress={() => navigate(RoutesName.Cart)}>
            <CartIcon />
            {!!cartItems?.length && (
              <View style={{
                backgroundColor: Colors.red,
                width: moderateScale(20),
                height: moderateScale(20),
                borderRadius: moderateScale(20),
                alignItems: 'center',
                justifyContent: 'center',
                position: 'absolute',
                marginTop: moderateScaleVertical(-8),
                marginLeft: moderateScale(12),
              }}>
                <CustomText fontFamily={Fonts.Medium} variant='h9' style={{ color: Colors.white }} numberOfLine={1}>
                  {cartItems?.length}
                </CustomText>
              </View>
            )}
          </Pressable>
        </View>
      </View>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  text: {
    color: '#fff'
  },
  text2: {
    color: '#fff',
    width: '90%',
    textAlign: 'center',
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
    width: '70%'
  },
  subConatiner: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: moderateScale(10),
    paddingTop: Platform.OS === 'android' ? moderateScaleVertical(10) : 5,
    justifyContent: 'space-between',
    backgroundColor: 'green'
  },
  flexRowGap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5
  },
  noticeBtn: {
    backgroundColor: '#E8EAF5',
    borderRadius: moderateScale(100),
    paddingHorizontal: moderateScale(8),
    paddingVertical: moderateScaleVertical(2),
    bottom: -2
  }
})