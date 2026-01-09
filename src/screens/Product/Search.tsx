import { ActivityIndicator, FlatList, Pressable, StyleSheet, TextInput, View } from 'react-native'
import React, { FC, useState, useMemo } from 'react'
import { moderateScale, moderateScaleVertical } from '../../utils/responsiveSize'
import { Colors, Fonts, RoutesName } from '@utils/Constants'
import { useRoute } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Ionicons'
import { RFValue } from 'react-native-responsive-fontsize'
import { goBack, navigate } from '@utils/NavigationUtils'
import CustomText from '@components/global/CustomText'
import { Container } from '@components/global/Container'
import ProductItem from '@components/Product/ProductItem'
import useSearchProducts from '@hooks/product/search-products'
import { useAuthStore } from '@state/authStore'
import withCart from '@components/Cart/WithCart'
import { withCollapsibleContext } from '@r0b0t3d/react-native-collapsible'

const Search: FC = () => {
  // init
  const route = useRoute()
  const { settingData } = useAuthStore()
  const initialSearchTerm = (route?.params as any)?.searchTerm || ''

  // states
  const [searchTerm, setSearchTerm] = useState<string>(initialSearchTerm)

  // api
  const { data: searchResults, isLoading: searchLoading, isFetching } = useSearchProducts({ 
    DisplayName: searchTerm 
  })

  const productsList = useMemo(() => {
    return searchResults?.data?.result?.products || []
  }, [searchResults])

  const renderItem = ({ item, index }: any) => {
    return (
      <Pressable onPress={() => navigate(RoutesName.ProductDetails, { productId: item?.id })}>
        <ProductItem item={item} index={index} />
      </Pressable>
    )
  }

  return (
    <Container statusBarStyle='dark-content' statusBarBackgroundColor={Colors.paleGray} >
      {/* Custom Header */}
      <View style={styles.header}>
        <Pressable onPress={() => goBack()}>
          <Icon name="chevron-back" size={RFValue(20)} color={Colors.textColor} />
        </Pressable>
        <View style={styles.searchContainer}>
          <Icon name="search" size={RFValue(20)} color={Colors.grayish} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search products..."
            placeholderTextColor={Colors.grayish}
            value={searchTerm}
            onChangeText={setSearchTerm}
            autoFocus={!initialSearchTerm}
            returnKeyType="search"
          />
          {searchTerm.length > 0 && (
            <Pressable onPress={() => setSearchTerm('')}>
              <Icon name="close-circle" size={RFValue(20)} color={Colors.grayish} />
            </Pressable>
          )}
        </View>
      </View>

      <View style={styles.content}>
        {searchLoading ? (
          <View style={styles.center}>
            <ActivityIndicator
              size="large"
              color={Colors.Purple}
            />
          </View>
        ) : (
          <FlatList
            data={productsList}
            keyExtractor={(item: any) => item?.id?.toString()}
            renderItem={renderItem}
            style={styles.container}
            contentContainerStyle={productsList.length === 0 ? styles.emptyContent : styles.listContent}
            ListEmptyComponent={() => (
              <View style={styles.emptyContainer}>
                <CustomText fontFamily={Fonts.SemiBold} variant="h6" style={styles.noProducts}>
                  {searchTerm.length > 0 ? 'No Products Found' : 'Start typing to search products'}
                </CustomText>
              </View>
            )}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            refreshing={isFetching}
          />
        )}
      </View>
    </Container>
  )
}

export default withCart(withCollapsibleContext(Search))

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: moderateScale(10),
    height: moderateScale(60),
    backgroundColor: Colors.paleGray,
    borderBottomWidth: 0.6,
    borderColor: Colors.border,
    gap: moderateScale(10),
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: moderateScale(8),
    paddingHorizontal: moderateScale(12),
    height: moderateScale(40),
    gap: moderateScale(8),
  },
  searchIcon: {
    marginRight: moderateScale(4),
  },
  searchInput: {
    flex: 1,
    fontSize: RFValue(14),
    fontFamily: Fonts.Regular,
    color: Colors.textColor,
    padding: 0,
  },
  content: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.gray8,
  },
  listContent: {
    paddingVertical: moderateScaleVertical(10),
    paddingBottom: moderateScaleVertical(100),
  },
  emptyContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noProducts: {
    color: Colors.black,
  },
})
