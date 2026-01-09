import { ActivityIndicator, Image, ImageBackground, Pressable, StyleSheet, View } from 'react-native'
import React from 'react'
import { useCartStore } from '@state/cartStore'
import { useRoute, useNavigation } from '@react-navigation/native'
import { useToast } from '@masumdev/rn-toast'
import { Container } from '@components/global/Container'
import { AppBar } from '@components/global/AppBar'
import Body from '@components/global/Body'
import CustomText from '@components/global/CustomText'
import { Colors, Fonts, RoutesName } from '@utils/Constants'
import { moderateScale, moderateScaleVertical } from '@utils/responsiveSize'
import { CartIcon, ProductShareIcon } from '@components/Icons'
import PrimaryButton from '@components/ui/PrimaryButton'
import ProductsSlider from '@components/Home/ProductSlider'
import Carousel from 'pinar'
import { useAuthStore } from '@state/authStore'
import { navigate } from '@utils/NavigationUtils'
import useGetProductDetails from '@hooks/product/get-product-details'

const ProductDetails = () => {
  // init
  const cartData = useCartStore(state => state?.cart)
  const route: any = useRoute()
  const { productSku } = route?.params || {}
  const { showToast } = useToast()
  const { settingData } = useAuthStore()
  const navigation: any = useNavigation()

  // api - get product details by SKU
  const { data, isLoading } = useGetProductDetails({ sku: productSku })

  const product = data?.data?.result
  const isPresentItem = cartData?.some(item => item?.id === product?.id)
  const addedText = 'Add to Cart'

  const addItemCart = () => {
    if (isPresentItem) {
      navigate(RoutesName.Cart)
    } else {
      if (product) {
        useCartStore.getState().addItem(product)
        showToast('Product added to cart', 'success')
      }
    }
  }

  const RigthIcon = () => {
    return (
      <Pressable hitSlop={20} onPress={() => { navigation.navigate(RoutesName.Cart) }}>
        <CartIcon />
        {!!cartData?.length && (
          <View style={styles.cartBadge}>
            <CustomText fontFamily={Fonts.Medium} fontSize={10} style={styles.cartBadgeText} numberOfLine={1}>
              {cartData?.length}
            </CustomText>
          </View>
        )}
      </Pressable>
    )
  }

  if (isLoading) {
    return (
      <Container statusBarBackgroundColor='transparent' statusBarStyle='dark-content'>
        <AppBar back title='Product Detail' right={<RigthIcon />} />
        <View style={styles.loaderContainer}>
          <ActivityIndicator size={'large'} color={Colors.Purple} />
        </View>
      </Container>
    )
  }

  console.log('product', data)

  if (!product) {
    return (
      <Container statusBarBackgroundColor={Colors.paleGray} statusBarStyle='dark-content'>
        <AppBar back title='Product Detail' right={<RigthIcon />} />
        <View style={styles.loaderContainer}>
          <CustomText fontFamily={Fonts.Medium} variant="h6">Product not found</CustomText>
        </View>
      </Container>
    )
  }

  // Get images from gallery if available, otherwise use thumbnail
  const getImages = () => {
    if (product?.gallery && product.gallery.length > 0) {
      return product.gallery.map((img: string) => `${settingData?.s3Url}${img}`)
    }
    if (product?.thumbnail) {
      return [`${settingData?.s3Url}${product.thumbnail}`]
    }
    return []
  }
  const images = getImages()

  return (
    <Container statusBarBackgroundColor={Colors.paleGray} statusBarStyle='dark-content'>
      <AppBar back title={product?.DisplayName ?? 'N/A'} right={<RigthIcon />} />
      <Body>
        <ImageBackground 
          source={require('@assets/images/productDetailBg.png')} 
          style={styles.imageBackground}
        >
          <View style={styles.shareButtonContainer}>
            <Pressable style={styles.shareButton}>
              <ProductShareIcon />
            </Pressable>
          </View>
          {images.length > 0 && (
            <Carousel 
              style={styles.carousel} 
              showsControls={false} 
              loop={true} 
              autoplay={true} 
              autoplayInterval={2000} 
              activeDotStyle={styles.activeDot} 
              dotsContainerStyle={styles.dotsContainer}
            >
              {images.map((img, index) => (
                <Image 
                  key={index?.toString()} 
                  source={{ uri: img }} 
                  style={styles.carouselImage} 
                  resizeMode='contain' 
                />
              ))}
            </Carousel>
          )}
        </ImageBackground>

        <View style={styles.productInfoContainer}>
          <CustomText fontFamily={Fonts.SemiBold} variant="h4" style={styles.productName} numberOfLine={1}>
            {product?.DisplayName}
          </CustomText>
          <CustomText fontFamily={Fonts.Regular} variant="h6" style={styles.brandText} numberOfLine={1}>
            Brand Name : <CustomText fontFamily={Fonts.Regular} variant="h6" style={styles.brandValue}>
              {product?.brand}
            </CustomText>
          </CustomText>
        </View>

        <View style={styles.priceContainer}>
          <View style={styles.priceInfo}>
            <View style={styles.priceRow}>
              <CustomText fontFamily={Fonts.SemiBold} variant="h4" style={styles.sellPrice} numberOfLine={1}>
                {'\u20B9'}{product?.sellPrice}
              </CustomText>
              <CustomText fontFamily={Fonts.Medium} variant="h7" style={styles.mrpPrice} numberOfLine={1}>
                MRP {'\u20B9'}{product?.BuyPrice}
              </CustomText>
            </View>
            <CustomText fontFamily={Fonts.Regular} variant="h8" style={styles.taxText} numberOfLine={1}>
              Exclusive all taxes
            </CustomText>
          </View>
          <View style={styles.addToCartButton}>
 <PrimaryButton 
            onPress={addItemCart} 
            buttonText={isPresentItem ? 'Go to Cart' : addedText} 
            // style={styles.addToCartButton}
          />
          </View>
         
        </View>

        <View style={styles.deliveryContainer}>
          <Image 
            source={require('@assets/images/freeDelivery.png')} 
            style={styles.deliveryIcon} 
            resizeMode='contain' 
          />
          <View style={styles.deliveryInfo}>
            <CustomText fontFamily={Fonts.SemiBold} variant="h7" style={styles.deliveryTitle} numberOfLine={1}>
              Unlimited free delivery
            </CustomText>
            <CustomText fontFamily={Fonts.Regular} variant="h8" style={styles.deliverySubtext} numberOfLine={1}>
              Free delivery on above order on ₹99
            </CustomText>
          </View>
        </View>

        <View style={styles.detailsContainer}>
          <CustomText fontFamily={Fonts.Regular} variant="h6" style={styles.detailText} numberOfLine={1}>
            Shelf life : <CustomText fontFamily={Fonts.Medium} variant="h6" style={styles.detailValue}>
              24
            </CustomText>
          </CustomText>
          <CustomText fontFamily={Fonts.Medium} variant="h6" style={styles.detailText} numberOfLine={1}>
            Item weight : <CustomText fontFamily={Fonts.Medium} variant="h6" style={styles.detailValue}>
              200 g
            </CustomText>
          </CustomText>
        </View>

        <View style={styles.featuresContainer}>
          <View style={styles.featuresRow}>
            <View style={styles.featureItem}>
              <Image 
                source={require('@assets/images/happyCustomer.png')} 
                style={styles.featureIcon} 
                resizeMode='contain' 
              />
              <CustomText fontFamily={Fonts.Medium} variant="h8" style={styles.featureText} numberOfLine={2}>
                99+ Happy Customers
              </CustomText>
            </View>

            <View style={styles.featureItem}>
              <Image 
                source={require('@assets/images/authentic.png')} 
                style={styles.featureIcon} 
                resizeMode='contain' 
              />
              <View>
                <CustomText fontFamily={Fonts.Medium} variant="h8" style={styles.featureText} numberOfLine={2}>
                  100%
                </CustomText>
                <CustomText fontFamily={Fonts.Medium} variant="h8" style={styles.featureText} numberOfLine={2}>
                  Authentic
                </CustomText>
              </View>
            </View>

            <View style={styles.featureItem}>
              <Image 
                source={require('@assets/images/qualityCheck.png')} 
                style={styles.featureIcon} 
                resizeMode='contain' 
              />
              <CustomText fontFamily={Fonts.Medium} variant="h8" style={styles.featureText} numberOfLine={2}>
                Quality Checked Product
              </CustomText>
            </View>
          </View>
          <View style={styles.safeBadge}>
            <CustomText fontFamily={Fonts.Medium} variant="h7" style={styles.safeText} numberOfLine={1}>
              100 % Safe
            </CustomText>
          </View>
        </View>

        <View style={styles.descriptionContainer}>
          <CustomText fontFamily={Fonts.SemiBold} variant="h6" style={styles.sectionTitle} numberOfLine={1}>
            Product Details
          </CustomText>
          <CustomText fontFamily={Fonts.Light} variant="h7" style={styles.descriptionText}>
            {product?.description}
          </CustomText>
        </View>

        <View style={styles.disclaimerContainer}>
          <CustomText fontFamily={Fonts.SemiBold} variant="h6" style={styles.sectionTitle} numberOfLine={1}>
            Disclaimer
          </CustomText>
          <CustomText fontFamily={Fonts.Light} variant="h7" style={styles.disclaimerText}>
            Interdum et malesuada fames ac ante ipsum primis in faucibus. Morbi ut nisi odio. Nulla facilisi.
            Nunc risus massa, gravida id egestas a, pretium vel tellus. Praesent feugiat diam sit amet pulvinar finibus. Etiam et nisi aliquet, accumsan nisi sit.
          </CustomText>
        </View>

        {/* TODO: Add ProductsSlider with proper productData when available */}
        {/* <ProductsSlider productData={genericProductsData} /> */}
        <View style={styles.spacer} />
        {/* <ProductsSlider productData={similarProductsData} sliderBgType='blue' /> */}
      </Body>
    </Container>
  )
}

export default ProductDetails

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadge: {
    backgroundColor: Colors.red,
    width: moderateScale(20),
    height: moderateScale(20),
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    marginTop: moderateScaleVertical(-7),
    marginLeft: moderateScale(10),
  },
  cartBadgeText: {
    color: Colors.white,
    lineHeight: 12,
  },
  imageBackground: {
    height: moderateScale(255),
    width: '100%',
    paddingTop: moderateScaleVertical(20),
  },
  shareButtonContainer: {
    backgroundColor: Colors.brightGray,
    height: moderateScale(32),
    width: moderateScale(32),
    borderRadius: moderateScale(16),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    position: 'absolute',
    right: 0,
    marginRight: moderateScale(15),
    marginTop: moderateScaleVertical(20),
  },
  shareButton: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  carousel: {
    width: '100%',
    height: '100%',
  },
  activeDot: {
    width: moderateScale(5),
    height: moderateScaleVertical(0.9),
    backgroundColor: Colors.black,
    borderRadius: moderateScaleVertical(1),
  },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: moderateScaleVertical(2.5),
  },
  carouselImage: {
    width: '97%',
    height: '100%',
    alignSelf: 'center',
  },
  productInfoContainer: {
    marginTop: moderateScaleVertical(10),
    marginHorizontal: moderateScale(20),
    gap: moderateScale(0),
  },
  productName: {
    color: Colors.black,
    flex: 1,
  },
  brandText: {
    color: Colors.black,
    flex: 1,
  },
  brandValue: {
    color: Colors.grayish,
  },
  priceContainer: {
    // marginHorizontal: moderateScale(20),
    marginTop: moderateScaleVertical(25),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  priceInfo: {
    flex: 1,
    paddingLeft: moderateScale(20),
    // backgroundColor:'red',
    // gap: 4,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScaleVertical(4),
    // marginTop: moderateScaleVertical(6),
  },
  sellPrice: {
    color: Colors.deepPurple,
    maxWidth: '50%',
  },
  mrpPrice: {
    color: Colors.mutedPurple,
    maxWidth: '50%',
    textDecorationLine: 'line-through',
  },
  taxText: {
    color: Colors.mutedPurple,
    marginTop: moderateScaleVertical(-8),
  },
  addToCartButton: {
    // flex: 1,
    width:moderateScale(150),
    // borderRadius: moderateScale(10),
    marginRight: moderateScale(20),
  },
  deliveryContainer: {
    marginHorizontal: moderateScale(20),
    marginTop: moderateScaleVertical(20),
    height: moderateScale(70),
    backgroundColor: Colors.lavenderBlush,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: moderateScale(20),
    borderRadius: moderateScale(10),
    gap: moderateScale(15),
  },
  deliveryIcon: {
    width: moderateScale(35),
    height: moderateScale(35),
    alignSelf: 'center',
  },
  deliveryInfo: {
    gap: moderateScaleVertical(0),
  },
  deliveryTitle: {
    color: Colors.black,
  },
  deliverySubtext: {
    color: Colors.mutedPurple,
  },
  detailsContainer: {
    marginHorizontal: moderateScale(20),
    marginVertical: moderateScaleVertical(15),
    gap: moderateScaleVertical(0),
  },
  detailText: {
    color: Colors.black,
  },
  detailValue: {
    color: Colors.mutedPurple,
  },
  featuresContainer: {
    marginHorizontal: moderateScale(20),
    backgroundColor: Colors.lavenderBlush,
    justifyContent: 'center',
    borderRadius: moderateScale(10),
    overflow: 'hidden',
    marginBottom: moderateScaleVertical(25),
  },
  featuresRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingVertical: moderateScale(20),
  },
  featureItem: {
    alignSelf: 'center',
    alignItems: 'center',
    gap: moderateScaleVertical(10),
  },
  featureIcon: {
    width: moderateScale(35),
    height: moderateScale(35),
  },
  featureText: {
    color: Colors.black,
    width: moderateScale(80),
    textAlign: 'center',
  },
  safeBadge: {
    backgroundColor: Colors.darkViolet,
    alignItems: 'center',
    justifyContent: 'center',
    height: moderateScale(26),
  },
  safeText: {
    color: Colors.white,
  },
  descriptionContainer: {
    marginHorizontal: moderateScale(20),
    gap: moderateScaleVertical(7),
  },
  sectionTitle: {
    color: Colors.black,
  },
  descriptionText: {
    color: Colors.grayish,
  },
  disclaimerContainer: {
    marginHorizontal: moderateScale(20),
    gap: moderateScaleVertical(7),
    marginTop: moderateScaleVertical(15),
  },
  disclaimerText: {
    color: Colors.grayish,
  },
  spacer: {
    height: moderateScale(20),
    backgroundColor: Colors.white,
  },
})
