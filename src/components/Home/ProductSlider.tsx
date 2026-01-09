import { FlatList, View, StyleSheet, Image, ImageBackground, Pressable } from "react-native"
import { moderateScale, moderateScaleVertical, textScale } from "../../utils/responsiveSize"
import { Colors, Fonts, RoutesName } from "@utils/Constants"
import CustomText from "@components/global/CustomText"
import { Greater19Icon } from "@components/Icons"
import { shadowStyle } from "@styles/GlobalStyles"
import UniversalAdd from "@components/ui/UniversalAdd"
import { FC } from "react"
import { useAuthStore } from "@state/authStore"
import { calculateDiscount } from "@utils/helperFunctions"
import { navigate } from "@utils/NavigationUtils"

interface ProductsSliderProps {
  sliderBgType?: string;
  productData?: {
    category: string;
    products: {
      sku: number;
      DisplayName: string;
      sellPrice: number;
      BuyPrice: number;
      thumbnail: string;
      brand: string;
      igst: number;
      stock: boolean;
    }[];
  };
}

const ProductsSlider:FC <ProductsSliderProps> = ({productData, sliderBgType}) => {

  // init
  const { settingData } = useAuthStore()

  if (!productData || !productData?.products || productData?.products?.length === 0) {
    return null
  }

  const ItemCard = ({ item, index }: { item: any, index: number }) => {

    const discount = calculateDiscount(item?.sellPrice, item?.BuyPrice, 0)

    return (
      <Pressable
       onPress={() => navigate(RoutesName.ProductDetails, { productSku: item?.sku })}
       style={[styles.card, shadowStyle]}>
        <View style={styles.imageContainer}>
          {item?.thumbnail ? (
            <Image 
              source={{ uri: `${settingData?.s3Url}${item?.thumbnail}` }} 
              style={styles.productImage} 
              resizeMode="contain" 
            />
          ) : null}
          {discount && parseFloat(discount) > 0 && (
            <View style={styles.discountBadge}>
              <CustomText fontFamily={Fonts.SemiBold} fontSize={textScale(5)} style={{ color: Colors.white }} numberOfLine={1}>{discount}% OFF</CustomText>
            </View>
          )}
        </View>

        <View style={styles.cardDetails}>
          <CustomText fontFamily={Fonts.Medium} variant="h9" style={{ color: Colors.grayish }} numberOfLine={1}>{item?.brand}</CustomText>
          <CustomText fontFamily={Fonts.SemiBold} variant="h9" style={styles.productName} numberOfLine={2}>{item?.DisplayName}</CustomText>
          <View style={styles.priceRow}>
            <CustomText fontFamily={Fonts.SemiBold} variant="h9" style={{ color: Colors.black,maxWidth: '50%' }} numberOfLine={1}>{'₹'}{item?.sellPrice}</CustomText>
            {item?.BuyPrice && (
              <CustomText fontFamily={Fonts.Medium} variant="h9" style={{ color: Colors.mutedPurple, textDecorationLine: 'line-through',maxWidth: '50%' }} numberOfLine={1}>MRP {'₹'}{item?.BuyPrice}</CustomText>
            )}
          </View>
        </View>
        <UniversalAdd item={item} />
      </Pressable>
    )
  }

  return (
    <ImageBackground alt="productBg" source={sliderBgType === 'blue' ? require('@assets/images/productSliderBg.png') : require('@assets/images/productSliderBg2.png')} style={styles.sliderBackground}>
      <View style={styles.header}>
        <CustomText fontFamily={Fonts.SemiBold} variant="h6" numberOfLine={1}>{productData?.category}</CustomText>
        <Pressable style={styles.viewAllContainer}>
          <CustomText fontFamily={Fonts.SemiBold} variant="h7" style={{ color: Colors.grayish }} numberOfLine={1}>View All</CustomText>
          <Greater19Icon />
        </Pressable>
      </View>

      <FlatList
        data={productData?.products}
        renderItem={({ item, index }) => <ItemCard item={item} index={index} />}
        keyExtractor={(item, index) => item?.sku?.toString() || index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 10, paddingLeft: moderateScale(20) }}
      />
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  sliderBackground: {
    height: moderateScale(355),
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: moderateScale(20),
    marginVertical: moderateScaleVertical(30)
  },
  viewAllContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  card: {
    backgroundColor: Colors.white1,
    width: moderateScale(140),
    height: moderateScale(245),
    borderRadius: moderateScale(8),
    paddingHorizontal: moderateScale(10),
    overflow: 'hidden',
  },
  imageContainer: {
    backgroundColor: Colors.paleGray,
    width: '100%',
    height: moderateScale(104),
    borderRadius: moderateScale(6),
    marginTop: moderateScaleVertical(10),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  productImage: {
    width: moderateScale(90),
    height: moderateScale(75)
  },
  discountBadge: {
    backgroundColor: Colors.red,
    width: moderateScale(40),
    height: moderateScale(12),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(3),
    position: 'absolute',
    top: 0,
    left: 0,
    marginLeft: moderateScale(8),
    marginTop: moderateScaleVertical(7)
  },
  cardDetails: {
    marginTop: moderateScaleVertical(10),
    // gap: moderateScaleVertical(3)
  },
  productName: {
    color: Colors.grayish,
    height: moderateScale(30)
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScaleVertical(10),
    marginTop: moderateScaleVertical(5)
  }
});

export default ProductsSlider;
