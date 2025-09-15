import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC } from 'react'
import { Colors, Fonts } from '@utils/Constants';
import { moderateScale, moderateScaleVertical } from '@utils/responsiveSize';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { RFValue } from 'react-native-responsive-fontsize';
import CustomText from '@components/global/CustomText';

interface ArrowButtonProps {
  title: string;
  onPress?: () => void;
  price?: number;
  loading?: boolean;
}
const ArrowButton: FC<ArrowButtonProps> = ({ title, onPress, price, loading }) => {
  return (
    <TouchableOpacity activeOpacity={0.8} disabled={loading} onPress={onPress} style={[styles.btn, { justifyContent: price !== 0 ? 'space-between' : 'center' }]} >
      {price !== 0 && price && (
        <View>
          <CustomText variant='h7' style={{ color: 'white' }} fontFamily={Fonts.Medium} > ₹{price + 34}.0</CustomText>
          <CustomText variant='h7' style={{ color: 'white' }} fontFamily={Fonts.Medium} >TOTAL</CustomText>
        </View>
      )}
      <View style={styles.flexRow} >
        <CustomText variant='h6' style={{ color: 'white' }} fontFamily={Fonts.Medium} >{title}</CustomText>
        {loading ? (
            <ActivityIndicator color={'#fff'} size={'small'} style={{ marginHorizontal: moderateScale(5) }} />
          ) : (
            <Icon name="arrow-right" size={RFValue(25)} color={'#fff'} />
          )}
      </View>


    </TouchableOpacity>
  )
}

export default ArrowButton

const styles = StyleSheet.create({
  btn: {
    backgroundColor: Colors.deepPurple,
    padding: moderateScale(10),
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: moderateScale(12),
    marginVertical: moderateScaleVertical(10),
    marginHorizontal: moderateScale(10)
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  }
})