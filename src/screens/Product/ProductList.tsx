import { ActivityIndicator, Pressable, StyleSheet, View } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { moderateScale } from '../../utils/responsiveSize'
import { Colors, Fonts } from '@utils/Constants'
import { useRoute } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Ionicons'
import { RFValue } from 'react-native-responsive-fontsize'
import { goBack } from '@utils/NavigationUtils'
import CustomText from '@components/global/CustomText'
import SideBar from '@components/Product/SideBar'
import ProductsList from '@components/Product/ProductsList'
import { Container } from '@components/global/Container'
import useGetSubcategories from '@hooks/product/get-subcategories'
import { useAuthStore } from '@state/authStore'
import FilterModal from '@components/Product/FilterModal'
import withCart from '@components/Cart/WithCart'
import { withCollapsibleContext } from '@r0b0t3d/react-native-collapsible'

interface CategoryItem {
  id: number;
  name: string;
  masterCat: string;
  mainCat: string;
  image: string;
}

const ProductList: FC = () => {

  // init
  const route = useRoute()
  const {settingData} = useAuthStore()
  const { selectedCat, mainCat, masterCat }: any = route?.params || {}

  // states
  const [selectedCategory, setSelectedCategory] = useState<CategoryItem | null>(null)
  const [filterModalVisible, setFilterModalVisible] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState<string>('PLH')

  // api
  const { data: subcategories, isLoading: subcategoriesLoading } = useGetSubcategories({ name: mainCat })

  // Get subcategories list from API
  const subcategoriesList = subcategories?.data?.result?.subCats || []

  // Set initial category from route params or first subcategory
  useEffect(() => {
    if (subcategoriesList.length > 0) {
      if (selectedCat) {
        const foundCategory = subcategoriesList.find((cat: CategoryItem) => cat.name === selectedCat)
        if (foundCategory) {
          setSelectedCategory(foundCategory)
        } else {
          // If not found, select first subcategory
          setSelectedCategory(subcategoriesList[0])
        }
      } else {
        // Select first subcategory by default
        setSelectedCategory(subcategoriesList[0])
      }
    }
  }, [subcategoriesList, selectedCat])

  return (
    <Container statusBarStyle='dark-content' statusBarBackgroundColor={Colors.paleGray} >
      {/* Custom Header */}
      <View style={styles.header}>
        <Pressable onPress={() => goBack()}>
          <Icon name="chevron-back" size={RFValue(20)} color={Colors.textColor} />
        </Pressable>
        <CustomText
          style={styles.headerText}
          variant="h5"
          fontFamily={Fonts.SemiBold}
        >
          {selectedCategory?.name || 'Product Categories'}
        </CustomText>
        <Pressable onPress={() => setFilterModalVisible(true)}>
          <Icon name="filter" size={RFValue(20)} color={Colors.textColor} />
        </Pressable>
      </View>

      <View style={styles.subContainer}>
        {subcategoriesLoading ? (
          <View style={styles.center}>
            <ActivityIndicator
              size="large"
              color={Colors.Purple}
            />
          </View>
        ) : (
          <>
            <SideBar
              categories={subcategoriesList}
              selectedCategory={selectedCategory}
              onCategoryPress={(category: CategoryItem) => setSelectedCategory(category)}
            />

            {selectedCategory && (
              <ProductsList 
                subCat={selectedCategory.name}
                mainCat={mainCat || selectedCategory.mainCat}
                masterCat={masterCat || selectedCategory.masterCat}
                sortBy={selectedFilter}
              />
            )}
          </>
        )}
      </View>

      <FilterModal
        visible={filterModalVisible}
        onClose={() => setFilterModalVisible(false)}
        selectedFilter={selectedFilter}
        onFilterSelect={setSelectedFilter}
      />
    </Container>
  )
}

export default withCart(withCollapsibleContext(ProductList))

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    justifyContent: 'space-between',
    padding: moderateScale(10),
    height: moderateScale(60),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.paleGray,
    borderBottomWidth: 0.6,
    borderColor: Colors.border,
  },
  headerText: {
    textAlign: 'center',
  },
  subContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})