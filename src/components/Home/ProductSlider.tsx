import { FlatList, View, StyleSheet, Image, ImageBackground, Pressable } from "react-native"
import { moderateScale, moderateScaleVertical, textScale } from "../../utils/responsiveSize"
import { Colors, Fonts } from "@utils/Constants"
import CustomText from "@components/global/CustomText"
import { Greater19Icon } from "@components/Icons"
import { shadowStyle } from "@styles/GlobalStyles"
import UniversalAdd from "@components/ui/UniversalAdd"
import { FC } from "react"

interface ProductsSliderProps {
  title: string;
  sliderBgType?: string;
}

const ProductsSlider:FC <ProductsSliderProps> = ({title,sliderBgType}) => {

  const productData = [
    { id: '01', name: 'Ashwagandha', comp: 'KORESELECT', price: '400', final: '500', img: require('../../assets/images/product1.png') },
    { id: '02', name: 'Shirashoolari', comp: 'SRI SRI', price: '400', final: '500', img: require('../../assets/images/product2.png') },
    { id: '03', name: 'SMB Capsule', comp: 'NVEDA', price: '400', final: '500', img: require('../../assets/images/product3.png') },
  ]

  const ItemCard = ({ item }: { item: any, index: number }) => {


    return (
      <View style={[styles.card, shadowStyle]}>
        <View style={styles.imageContainer}>
          <Image source={item?.img} style={styles.productImage} resizeMode="contain" />
          <View style={styles.discountBadge}>
            <CustomText fontFamily={Fonts.SemiBold} fontSize={textScale(5)} style={{ color: Colors.white }} numberOfLine={1}>12% OFF</CustomText>
          </View>
        </View>

        <View style={styles.cardDetails}>
          <CustomText fontFamily={Fonts.Medium} variant="h9" style={{ color: Colors.grayish }} numberOfLine={1}>{item?.comp}</CustomText>
          <CustomText fontFamily={Fonts.SemiBold} variant="h9" style={styles.productName} numberOfLine={2}>{item?.name}</CustomText>
          <View style={styles.priceRow}>
            <CustomText fontFamily={Fonts.SemiBold} variant="h9" style={{ color: Colors.black }}>{'₹'}{item?.price}</CustomText>
            <CustomText fontFamily={Fonts.Medium} variant="h9" style={{ color: Colors.mutedPurple }}>MRP {'₹'}{item?.final}</CustomText>
          </View>
        </View>
        <UniversalAdd item={item} />
        {/* <PrimaryButton buttonText={isPresentItem ? 'Go to Cart' : addedText} onPress={addItemCart} height={moderateScale(25)} fontSize={RFValue(8)} borderRadius={moderateScale(4)} marginTop={moderateScaleVertical(10)} /> */}
      </View>
    )
  }

  return (
    <ImageBackground alt="productBg" source={sliderBgType === 'blue' ? require('@assets/images/productSliderBg.png') : require('@assets/images/productSliderBg2.png')} style={styles.sliderBackground}>
      <View style={styles.header}>
        <CustomText fontFamily={Fonts.SemiBold} variant="h6" numberOfLine={1}>{title}</CustomText>
        <Pressable style={styles.viewAllContainer}>
          <CustomText fontFamily={Fonts.SemiBold} variant="h7" style={{ color: Colors.grayish }} numberOfLine={1}>View All</CustomText>
          <Greater19Icon />
        </Pressable>
      </View>

      <FlatList
        data={productData}
        renderItem={({ item, index }) => <ItemCard item={item} index={index} />}
        keyExtractor={(item) => item?.id}
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
    paddingHorizontal: moderateScale(15),
    overflow: 'hidden',
  },
  imageContainer: {
    backgroundColor: Colors.paleGray,
    width: moderateScale(114),
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
    gap: moderateScaleVertical(3)
  },
  productName: {
    color: Colors.grayish,
    height: moderateScale(25)
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScaleVertical(10),
    marginTop: moderateScaleVertical(5)
  }
});

export default ProductsSlider;
