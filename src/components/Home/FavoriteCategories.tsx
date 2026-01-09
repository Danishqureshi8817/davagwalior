import { FC } from "react"
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  View,
  ListRenderItem,
} from "react-native"
import { moderateScale, moderateScaleVertical } from "../../utils/responsiveSize"
import { Colors, Fonts, RoutesName } from "@utils/Constants"
import { shadowStyle } from "@styles/GlobalStyles"
import CustomText from "@components/global/CustomText"
import { navigate } from "@utils/NavigationUtils"
import { BaseIMGURL } from "@services/config"
import { useAuthStore } from "@state/authStore"

interface CategoryItem {
  id: number
  name: string
  image: string
}

interface FavoriteCategoriesProps {
  data?: CategoryItem[]
}

const FavoriteCategories: FC<FavoriteCategoriesProps> = ({ data }) => {
  const onHandleNavigate = (name: string) => {
    navigate(RoutesName.ProductListing, { selectedCat: name })
  }

  const { settingData } = useAuthStore()

  const renderItem: ListRenderItem<CategoryItem> = ({ item }) => (
    <Pressable
      style={styles.itemWrapper}
      onPress={() => onHandleNavigate(item.name)}
    >
      <View style={[styles.itemImgContainer, shadowStyle]}>
        <Image
          source={{ uri: `${settingData?.s3Url}${item.image}` }}
          style={styles.itemImg}
          resizeMode="contain"
        />
      </View>
      <CustomText
        variant="h9"
        fontFamily={Fonts.Medium}
        numberOfLine={1}
        style={styles.itemText}
      >
        {item.name}
      </CustomText>
    </Pressable>
  )

  return (
    <View style={styles.container}>
      {/* Header */}
      {/* <View style={styles.header}>
        <CustomText
          variant="h5"
          fontFamily={Fonts.Bold}
          style={styles.headerText}
          numberOfLine={1}
        >
          FAVORITE CATEGORIES
        </CustomText>
        <Image
          source={require("@assets/images/homeDivider.png")}
          style={styles.divider}
        />
      </View> */}

      {/* Horizontal Scrollable List */}
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={{ width: moderateScale(10) }} />}
      />
    </View>
  )
}

export default FavoriteCategories

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
    gap: moderateScale(16),
    marginTop: moderateScaleVertical(40),
  },
  headerText: {
    color: Colors.deepPurple,
    letterSpacing: 5,
  },
  divider: {
    width: moderateScale(190),
    height: moderateScale(10),
  },
  listContent: {
    paddingHorizontal: moderateScale(10),
    marginTop: moderateScaleVertical(20),
  },
  itemWrapper: {
    alignItems: "center",
    width: moderateScale(80), // fixed width for consistency
  },
  itemImgContainer: {
    backgroundColor: Colors.white1,
    width: moderateScale(60),
    height: moderateScale(60),
    borderRadius: moderateScale(8),
    alignItems: "center",
    justifyContent: "center",
  },
  itemImg: {
    width: moderateScale(48),
    height: moderateScale(48),
  },
  itemText: {
    marginTop: moderateScale(8),
    textAlign: "center",
  },
})
