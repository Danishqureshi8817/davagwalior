import { FlatList, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { moderateScale, moderateScaleVertical } from '../../utils/responsiveSize';
import CustomText from '../../components/global/CustomText';
import Avatar from '@components/global/Avatar';
import { Colors, Fonts, RoutesName } from '@utils/Constants';
import { BaseIMGURL } from '@services/config';
import { FC } from 'react';
import { navigate } from '@utils/NavigationUtils';
import { useAuthStore } from '@state/authStore';

interface ShopByCategoriesProps {
  data?: {
    id: number;
    name: string;
    masterCat: string;
    image: string;
    showHome: number;
  }[];
}

interface CategoryItem {
  id: number;
  name: string;
  masterCat: string;
  image: string;
  showHome: number;
}

const ShopByCategories : FC <ShopByCategoriesProps> = ({data}) => {

  // init
  const { settingData } = useAuthStore()

  const CategoryItems = ({ item }: { item: CategoryItem; index: number }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigate(RoutesName.ProductListing, {
            selectedCat: item?.name,
            mainCat: item?.name,
          })
        }
        activeOpacity={0.6}
      >
        <View style={styles.itemWrapper}>
          <View style={styles.imageBox}>
            {!!item?.image ? (
              <Image
                alt="category"
                source={{ uri: `${settingData?.s3Url}${item?.image}` }}
                style={styles.image}
                resizeMode="contain"
              />
            ) : (
              <Avatar
              fallbackText={item?.name}
              imageUrl={item?.image ? `${item.image}` : undefined}
            />
            )}
          </View>

          <CustomText
            variant='h8'
            fontFamily={Fonts.Medium}
            style={styles.categoryText}
            numberOfLine={2}
          >
            {item?.name}
          </CustomText>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <CustomText
        variant='h5'
        style={styles.headingText}
        numberOfLine={1}
        fontFamily={Fonts.SemiBold}
      >
        Shop by category
      </CustomText>

      <FlatList
        data={data}
        renderItem={({ item, index }) => (
          <CategoryItems key={item?.id} item={item} index={index} />
        )}
        keyExtractor={(item: CategoryItem) => item?.id?.toString()}
        columnWrapperStyle={styles.columnWrapper}
        numColumns={4}
        style={styles.flatList}
        scrollEnabled={false}
        nestedScrollEnabled={true}
      />
    </View>
  );
};

export default ShopByCategories;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: moderateScale(15),
    marginTop: moderateScale(20),
  },
  headingText: {
    color: Colors.black,
  },
  flatList: {
    // alignSelf: 'center',
  },
  columnWrapper: {
    gap: moderateScale(10),
    alignItems: 'flex-start',
    marginTop: moderateScaleVertical(10),
  },
  itemWrapper: {
    width: moderateScale(80),
    alignItems: 'center',
    justifyContent: 'center',
    gap: moderateScale(10),
  },
  imageBox: {
    width: moderateScale(60),
    height: moderateScale(60),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(10),
    overflow: 'hidden',
    backgroundColor: '#E9DEF4',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  categoryText: {
    color: Colors.black,
    textAlign: 'center',
  },
});
