import { Image, Pressable, StyleSheet, View } from 'react-native'
import React, { FC } from 'react'
import { moderateScale, moderateScaleVertical } from '../../utils/responsiveSize'
import { Colors, Fonts, RoutesName } from '@utils/Constants'
import CustomText from '@components/global/CustomText'
import { RFValue } from 'react-native-responsive-fontsize'
import UniversalAdd from '@components/ui/UniversalAdd'
import { Dimensions } from 'react-native'
import { useAuthStore } from '@state/authStore'
import { calculateDiscount } from '@utils/helperFunctions'
import { navigate } from '@utils/NavigationUtils'

const screenHeight = Dimensions.get('window').height

interface ProductItemProps {
  item: {
    id: number;
    storeId: string;
    sku: number;
    stock: boolean;
    name: string;
    DisplayName: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    masterCat: string;
    mainCat: string;
    subCat: string;
    BuyPrice: number;
    sellPrice: number;
    thumbnail: string;
    brand: string;
    metaTitle: string;
    metaDes: string;
    drug: string;
    usage: string;
    packagingType: string;
    oum: string;
    hsnCode: string;
    igst: number;
    package_qty: number;
    oum_qty: number;
  }
  index: number
}

const ProductItem: FC<ProductItemProps> = ({ item, index }) => {

  // init
  const { settingData } = useAuthStore()

  const isSecondColumn = index % 2 !== 0

  const discount = calculateDiscount(item?.sellPrice, item?.BuyPrice, 0)

  return (
    // <Pressable onPress={() => navigate(RoutesName.ProductDetails, { productId: item?.id })}>
      <Pressable
        onPress={() => navigate(RoutesName.ProductDetails, { productSku: item?.sku })}
        style={[
          styles.container,
          { marginRight: isSecondColumn ? moderateScale(10) : 0 },
        ]}
      >
        <View style={styles.imageContainer}>
          {item?.thumbnail ? (
            <Image source={{ uri: `${settingData?.s3Url}${item?.thumbnail}` }} style={styles.image} />
          ) : null}
        </View>

        <View style={styles.content}>
          <View style={styles.flexRow}>
            <CustomText fontSize={RFValue(6)} fontFamily={Fonts.Medium}>
              {discount}% OFF
            </CustomText>
          </View>

          <CustomText
            fontFamily={Fonts.Medium}
            variant="h8"
            numberOfLine={2}
            style={{ marginVertical: moderateScale(3), height: moderateScale(36) }}
          >
            {item?.name} {index % 2 === 0 ? 'hdfkshsjhfkdshsdkjfh' : ''}
          </CustomText>

          <View style={styles.priceContainer}>
            <View style={styles.priceRow}>
              <CustomText variant="h8" fontFamily={Fonts.Medium} style={{ maxWidth: '50%' }} numberOfLine={1} >
                ₹{item?.sellPrice}
              </CustomText>
              {item?.BuyPrice && (
                <CustomText
                  variant="h8"
                  fontFamily={Fonts.Medium}
                  style={styles.discountPrice}
                  numberOfLine={1}
                >
                  ₹{item?.BuyPrice}
                </CustomText>
              )}
            </View>

            <View style={styles.buttonContainer}>
              <UniversalAdd item={item} />
            </View>
          </View>
        </View>
      </Pressable>
  //   </Pressable>
  )
}

export default ProductItem

const styles = StyleSheet.create({
  container: {
    width: '45%',
    borderRadius: moderateScale(10),
    backgroundColor: '#fff',
    marginBottom: moderateScaleVertical(10),
    marginLeft: moderateScale(10),
    overflow: 'hidden',
  },
  imageContainer: {
    // height: screenHeight * 0.12,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    padding: moderateScale(12),
    // backgroundColor: Colors.paleGray,
    // width: moderateScale(114),
    height: '46%',
    // borderRadius: moderateScale(6),
    // marginVertical: moderateScaleVertical(10),
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
    aspectRatio: 1 / 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: moderateScale(10),
  },
  flexRow: {
    flexDirection: 'row',
    padding: 2,
    borderRadius: moderateScale(4),
    alignItems: 'center',
    gap: 2,
    backgroundColor: Colors.gray8,
    alignSelf: 'flex-start',
  },
  priceContainer: {
    flexDirection: 'column',
    // paddingVertical: moderateScaleVertical(10),
    // marginTop: 'auto',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(8),
    // marginBottom: moderateScaleVertical(8),
  },
  discountPrice: {
    opacity: 0.8,
    textDecorationLine: 'line-through',
    maxWidth: '50%',
  },
  buttonContainer: {
    width: '100%',
  },
})

