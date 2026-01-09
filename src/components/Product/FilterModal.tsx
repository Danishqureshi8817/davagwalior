import { Modal, Pressable, StyleSheet, View, TouchableOpacity } from 'react-native'
import React, { FC } from 'react'
import { moderateScale, moderateScaleVertical } from '@utils/responsiveSize'
import { Colors, Fonts } from '@utils/Constants'
import CustomText from '@components/global/CustomText'
import Icon from 'react-native-vector-icons/Ionicons'
import { RFValue } from 'react-native-responsive-fontsize'
import { shadowStyle } from '@styles/GlobalStyles'

interface FilterModalProps {
  visible: boolean
  onClose: () => void
  selectedFilter: string
  onFilterSelect: (filter: string) => void
}

type FilterOption = {
  label: string
  value: string
}

const filterOptions: FilterOption[] = [
  { label: 'Recommended', value: 'RECOMMEND' },
  { label: 'Price Low to High', value: 'PLH' },
  { label: 'Price High to Low', value: 'PHL' },
]

const FilterModal: FC<FilterModalProps> = ({
  visible,
  onClose,
  selectedFilter,
  onFilterSelect,
}) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.modalContainer} onPress={(e) => e.stopPropagation()}>
          {/* Modal Header */}
          <View style={styles.header}>
            <CustomText
              fontFamily={Fonts.SemiBold}
              variant="h5"
              style={styles.headerTitle}
            >
              Filters
            </CustomText>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Icon name="close" size={RFValue(24)} color={Colors.textColor} />
            </TouchableOpacity>
          </View>

          {/* Modal Indicator */}
          <View style={styles.indicator} />

          {/* Filter Options */}
          <View style={styles.optionsContainer}>
            {filterOptions.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={styles.optionRow}
                onPress={() => {
                  onFilterSelect(option.value)
                  onClose()
                }}
                activeOpacity={0.7}
              >
                <View style={styles.radioContainer}>
                  <View
                    style={[
                      styles.radioOuter,
                      selectedFilter === option.value && styles.radioOuterSelected,
                    ]}
                  >
                    {selectedFilter === option.value && (
                      <View style={styles.radioInner} />
                    )}
                  </View>
                </View>
                <CustomText
                  fontFamily={Fonts.Medium}
                  variant="h7"
                  style={styles.optionText}
                >
                  {option.label}
                </CustomText>
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  )
}

export default FilterModal

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: moderateScale(20),
    borderTopRightRadius: moderateScale(20),
    paddingTop: moderateScaleVertical(20),
    paddingBottom: moderateScaleVertical(40),
    maxHeight: '70%',
    ...shadowStyle
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(20),
    paddingBottom: moderateScaleVertical(20),
  },
  headerTitle: {
    color: Colors.textColor,
  },
  closeButton: {
    width: moderateScale(32),
    height: moderateScale(32),
    borderRadius: moderateScale(16),
    backgroundColor: Colors.gray8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicator: {
    width: moderateScale(40),
    height: moderateScale(4),
    backgroundColor: Colors.black,
    borderRadius: moderateScale(2),
    alignSelf: 'center',
    marginBottom: moderateScaleVertical(20),
  },
  optionsContainer: {
    paddingHorizontal: moderateScale(20),
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: moderateScaleVertical(16),
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray8,
  },
  radioContainer: {
    marginRight: moderateScale(16),
  },
  radioOuter: {
    width: moderateScale(20),
    height: moderateScale(20),
    borderRadius: moderateScale(10),
    borderWidth: 2,
    borderColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOuterSelected: {
    borderColor: Colors.primary,
  },
  radioInner: {
    width: moderateScale(10),
    height: moderateScale(10),
    borderRadius: moderateScale(5),
    backgroundColor: Colors.primary,
  },
  optionText: {
    color: Colors.textColor,
    flex: 1,
  },
})
