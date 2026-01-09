import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import { useCartStore } from '@state/cartStore'
import { Colors, Fonts } from '@utils/Constants';
import { moderateScale, moderateScaleVertical } from '@utils/responsiveSize';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RFValue } from 'react-native-responsive-fontsize';
import CustomText from '@components/global/CustomText';
import PrimaryButton from './PrimaryButton';

const UniversalAdd: FC<{ item: any }> = ({ item }) => {

  // init
  const count = useCartStore(state => state.getItemCount(item?.id));
  const { addItem, removeItem, clearCart } = useCartStore();

  return (
    <View style={[styles.container, { backgroundColor: count === 0 ? '#fff' : Colors.primary }]} >
      {
        count == 0 ? (
          <Pressable onPress={() => addItem(item)} style={styles.add}>
            <CustomText variant='h9' fontFamily={Fonts.SemiBold} style={styles.addText} >
              ADD TO CART
            </CustomText>
          </Pressable>
        ) : (
          <View style={styles.counterContainer} >
            <Pressable onPress={() => removeItem(item?.id)} >
              <Icon name='minus' color={'#fff'} size={RFValue(13)} />
            </Pressable>
            <CustomText fontFamily={Fonts.SemiBold} style={styles.text} variant='h8' >{count}</CustomText>
            <Pressable onPress={() => addItem(item)} >
              <Icon name='plus' color={'#fff'} size={RFValue(13)} />
            </Pressable>
          </View>
        )
      }
    </View>
  )
}

export default UniversalAdd

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.primary,
    width: '100%',
    borderRadius: moderateScale(8),
    marginVertical: moderateScaleVertical(6)
  },
  add: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: moderateScale(4),
    paddingVertical: moderateScaleVertical(6)
  },
  addText: {
    color: Colors.primary,
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: "100%",
    paddingHorizontal: moderateScale(4),
    paddingVertical: moderateScaleVertical(4),
    justifyContent: 'space-between'
  },
  text: {
    color: '#fff'
  }
})