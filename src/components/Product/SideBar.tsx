import { ScrollView, StyleSheet, TouchableOpacity, View, Image } from 'react-native'
import React, { FC, useEffect, useRef, useMemo } from 'react'
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { moderateScale, moderateScaleVertical } from '../../utils/responsiveSize'
import { Colors } from '@utils/Constants'
import CustomText from '@components/global/CustomText'
import { RFValue } from 'react-native-responsive-fontsize'
import { useAuthStore } from '@state/authStore'

const AnimatedImage = Animated.createAnimatedComponent(Image)

interface CategoryItem {
  id: number;
  name: string;
  masterCat: string;
  mainCat: string;
  image: string;
}

interface SideBarProps {
  selectedCategory: CategoryItem | null
  categories: CategoryItem[]
  onCategoryPress: (category: CategoryItem) => void
}

interface CategoryItemComponentProps {
  category: CategoryItem
  isSelected: boolean
  settingData: any
  onPress: () => void
}

const CategoryItemComponent: FC<CategoryItemComponentProps> = ({ 
  category, 
  isSelected, 
  settingData, 
  onPress 
}) => {
  const animatedValue = useSharedValue(isSelected ? 2 : -15)
  
  useEffect(() => {
    animatedValue.value = withTiming(isSelected ? 2 : -15, { duration: 500 })
  }, [isSelected, animatedValue])

  const animatedStyle = useAnimatedStyle(() => ({
    bottom: animatedValue.value,
  }))

  return (
    <TouchableOpacity
      key={category.id}
      activeOpacity={1}
      style={styles.categoryButton}
      onPress={onPress}
    >
      <View
        style={[
          styles.imageContainer,
          isSelected && styles.selectedImageContainer,
        ]}
      >
        {typeof category?.image === 'number' ? (
          <AnimatedImage
            source={category?.image}
            style={[styles.image, animatedStyle]}
          />
        ) : category?.image ? (
          <AnimatedImage
            source={{ uri: `${settingData?.s3Url}${category?.image}` }}
            style={[styles.image, animatedStyle]}
          />
        ) : null}
      </View>
      <CustomText fontSize={RFValue(7)} style={{ textAlign: 'center' }}>
        {category?.name}
      </CustomText>
    </TouchableOpacity>
  )
}

const SideBar: FC<SideBarProps> = ({ selectedCategory, categories, onCategoryPress }) => {
  // init
  const scrollViewRef = useRef<ScrollView>(null)
  const { settingData } = useAuthStore()
  const indicatorPosition = useSharedValue(0)

  useEffect(() => {
    let targetIndex = -1
    categories?.forEach((category: CategoryItem, index: number) => {
      const isSelected = selectedCategory?.id === category?.id
      if (isSelected) {
        targetIndex = index
      }
    })

    if (targetIndex !== -1) {
      indicatorPosition.value = withTiming(targetIndex * 100, { duration: 500 })
      runOnJS(() => {
        scrollViewRef.current?.scrollTo({
          y: targetIndex * 100,
          animated: true,
        })
      })()
    }
  }, [selectedCategory, categories, indicatorPosition])

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: indicatorPosition.value }],
  }))

  return (
    <View style={styles.sideBar}>
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={{ paddingBottom: moderateScaleVertical(50) }}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View style={[styles.indicator, indicatorStyle]} />

        <View>
          {categories?.map((category: CategoryItem) => {
            const isSelected = selectedCategory?.id === category?.id
            return (
              <CategoryItemComponent
                key={category.id}
                category={category}
                isSelected={isSelected}
                settingData={settingData}
                onPress={() => onCategoryPress(category)}
              />
            )
          })}
        </View>
      </ScrollView>
    </View>
  )
}

export default SideBar

const styles = StyleSheet.create({
  sideBar: {
    width: '24%',
    backgroundColor: '#fff',
    borderRightWidth: 0.8,
    borderRightColor: '#eee',
    position: 'relative',
  },
  categoryButton: {
    padding: moderateScale(10),
    height: moderateScale(100),
    paddingVertical: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  indicator: {
    position: 'absolute',
    right: 0,
    width: moderateScale(4),
    height: moderateScale(80),
    top: moderateScaleVertical(10),
    alignSelf: 'center',
    backgroundColor: Colors.primary,
    borderTopLeftRadius: moderateScale(15),
    borderBottomLeftRadius: moderateScale(15),
  },
  image: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
  },
  imageContainer: {
    borderRadius: moderateScale(100),
    height: '50%',
    marginBottom: moderateScaleVertical(10),
    width: '75%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3F4F7',
    overflow: 'hidden',
  },
  selectedImageContainer: {
    backgroundColor: Colors.primary,
  },
})

