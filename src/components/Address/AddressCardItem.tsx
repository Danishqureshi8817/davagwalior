import { Pressable, StyleSheet, View } from 'react-native'
import React, { FC } from 'react'
import { Colors, Fonts, RoutesName } from '@utils/Constants'
import { moderateScale, moderateScaleVertical } from '@utils/responsiveSize'
import { RFValue } from 'react-native-responsive-fontsize';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import CustomText from '@components/global/CustomText';
import { useAuthStore } from '@state/authStore';
import { navigate } from '@utils/NavigationUtils';

interface ADDRESS_CARD_TYPE {
  id: number;
  userId: number;
  userName: string;
  userMobile: string;
  Address: string;
  landmark: string;
  pincode: number;
  cityId: number;
  cityName: string;
  Country: string;
  stateId: number;
  stateName: string;
  createdAt: string;
}

interface AddressCardItemProps {
  item: ADDRESS_CARD_TYPE;
  onDeleteAddress: (id: number) => void
}

const AddressCardItem : FC<AddressCardItemProps> = ({ item, onDeleteAddress }) => {
  // init
  const { user, setUser } = useAuthStore()



  const onSaveAddressLocal = (item: ADDRESS_CARD_TYPE) => {
    setUser({
      ...user,
      saveAddressLocal: item
    })
  }

  return (
    <Pressable
      key={item?.id?.toString()}
      style={styles.cardContainer}
      onPress={() => onSaveAddressLocal(item)}
    >
      <View style={styles.cardRow}>
        <View style={styles.leftRow}>
          <View style={styles.radioOuter}>
            <View style={[styles.radioInner, user?.saveAddressLocal?.id === item?.id && styles.radioActive]} />
          </View>
          <View style={styles.infoTextContainer}>
            <CustomText variant="h7" fontFamily={Fonts.SemiBold} numberOfLine={1}>{item?.userName ?? 'N/A'}</CustomText>
            <CustomText variant="h7" fontFamily={Fonts.Medium} numberOfLine={1} style={{ color: Colors.mutedPurple }} >{item?.userMobile ?? 'N/A'}</CustomText>
            <CustomText variant="h7" fontFamily={Fonts.Medium} numberOfLine={2} style={{ color: Colors.mutedPurple }}>{item?.Address ?? 'N/A'} , {item?.cityName ?? 'N/A'} , {item?.pincode ?? 'N/A'}</CustomText>
            <CustomText variant="h7" fontFamily={Fonts.Medium} numberOfLine={1} style={{ color: Colors.mutedPurple }}>{item?.stateName ?? 'N/A'}</CustomText>
          </View>
        </View>
        <View style={styles.iconRow}>
          <Pressable hitSlop={15} onPress={() => onDeleteAddress(item?.id)}>
            <MIcon name="delete-outline" size={RFValue(20)} color={'#A74AC7'} />
          </Pressable>
          <Pressable hitSlop={15} onPress={() => navigate(RoutesName.AddAddress, { editData: item })}>
            <MIcon name="pencil-outline" size={RFValue(20)} color={'#A74AC7'} />
          </Pressable>
        </View>
      </View>
    </Pressable>
  )
}

export default AddressCardItem

const styles = StyleSheet.create({
  cardContainer: {
    borderWidth: 1,
    borderColor: Colors.brightGray,
    borderRadius: moderateScale(10),
    paddingVertical: moderateScaleVertical(20),
    paddingHorizontal: moderateScale(20)
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  leftRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(15)
  },
  radioOuter: {
    borderColor: Colors.darkViolet,
    borderWidth: 2,
    height: moderateScale(24),
    width: moderateScale(24),
    borderRadius: moderateScale(12),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start'
  },
  radioInner: {
    height: moderateScale(16),
    width: moderateScale(16),
    borderRadius: moderateScale(8),
    backgroundColor: Colors.white
  },
  radioActive: {
    backgroundColor: Colors.darkViolet
  },
  infoTextContainer: {
    gap: moderateScale(6)
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(15),
    alignSelf: 'flex-start'
  },
})