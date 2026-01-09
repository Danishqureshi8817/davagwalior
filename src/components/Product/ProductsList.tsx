import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native'
import React, { FC, useMemo } from 'react'
import { Colors } from '@utils/Constants'
import { height, moderateScaleVertical } from '../../utils/responsiveSize'
import ProductItem from './ProductItem'
import { RFValue } from 'react-native-responsive-fontsize'
import useGetProductsList from '@hooks/product/get-products-list'

interface ProductsListProps {
  subCat: string
  mainCat: string
  masterCat: string
  sortBy?: string
}

const ProductsList: FC<ProductsListProps> = ({ subCat, mainCat, masterCat, sortBy }) => {

  // api
  const { data: productsApiList, isLoading: productsApiLoading, isFetching } = useGetProductsList({ 
    mainCat: mainCat, 
    masterCat: masterCat, 
    subCat: subCat,
    sortBy: sortBy 
  })

  const finalProductsList = useMemo(() => {
    return productsApiList?.pages?.flatMap((page: any) =>
      page?.data?.result?.products || []
    ) || [];
  }, [productsApiList]);

  const renderItem = ({ item, index }: any) => {
    return <ProductItem item={item} index={index} />
  }

  if (productsApiLoading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color={Colors.Purple} />
      </View>
    )
  }

  return (
    <FlatList
      data={finalProductsList}
      keyExtractor={(item: any) => item?.id?.toString()}
      renderItem={renderItem}
      style={styles.container}
      contentContainerStyle={finalProductsList.length === 0 ? styles.emptyContent : styles.content}
      ListEmptyComponent={() => (
        <View style={styles.emptyContainer}>
          <Text style={styles.noProducts}>No Products Found</Text>
        </View>
      )}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      refreshing={isFetching}
    />
  )
}

export default ProductsList

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: Colors.gray8,
    flexGrow: 1,
  },
  content: {
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
    // paddingTop: height*0.4,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noProducts: {
    fontFamily: 'Poppins-SemiBold',
    color: Colors.black,
    fontSize: RFValue(16),
  },
})

