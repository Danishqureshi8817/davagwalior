import { Image, StyleSheet, Text, View } from 'react-native'
import React, { FC, useMemo } from 'react'
import AutoScroll from '@homielab/react-native-auto-scroll'
import { Dimensions } from 'react-native'
import { moderateScale, moderateScaleVertical } from '@utils/responsiveSize'

const screenWidth = Dimensions.get('window').width

// Using available product images from assets
const imageData = [
  require('../../assets/images/product1.png'),
  require('../../assets/images/product2.png'),
  require('../../assets/images/product3.png'),
  require('../../assets/images/product1.png'),
  require('../../assets/images/product2.png'),
  require('../../assets/images/product3.png'),
  require('../../assets/images/product1.png'),
  require('../../assets/images/product2.png'),
  require('../../assets/images/product3.png'),
  require('../../assets/images/product1.png'),
  require('../../assets/images/product2.png'),
  require('../../assets/images/product3.png'),
  require('../../assets/images/product1.png'),
  require('../../assets/images/product2.png'),
  require('../../assets/images/product3.png'),
  require('../../assets/images/product1.png'),
]

const ProductSlider = () => {

  const rows = useMemo(() => {
    const result = []
    for (let i = 0; i < imageData.length; i += 4) {
      result.push(imageData.slice(i, i + 4))
    }
    return result
  }, [])

  return (
    <View pointerEvents='none' >
      <AutoScroll duration={10000} endPaddingWidth={0} style={styles.autoScroll} >
        <View style={styles.gridContainer} >
          {
            rows.map((row: any, rowIndex: number) => {
              return (
                <MemoizedRow key={rowIndex} row={row} rowIndex={rowIndex} />
              )
            })
          }
        </View>
      </AutoScroll>
    </View>
  )
}

const Row: FC<{ row: typeof imageData; rowIndex: number }> = ({ row, rowIndex }) => {
  return (
    <View style={styles.row} >
      {
        row.map((image, imageIndex) => {
          const horizontalShift = rowIndex % 2 === 0 ? -18 : 18
          return (
            <View key={imageIndex} style={[styles.itemContainer, { transform: [{ translateX: horizontalShift }] }]}  >
              <Image source={image} style={styles.image} />
            </View>
          )
        })
      }
    </View>
  )
}

const MemoizedRow = React.memo(Row)

export default ProductSlider

const styles = StyleSheet.create({
  autoScroll: {
    position: 'absolute',
    zIndex: -2
  },
  gridContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'visible'
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain'
  },
  row: {
    flexDirection: 'row',
    marginBottom: moderateScaleVertical(10)
  },
  itemContainer: {
    marginBottom: moderateScaleVertical(12),
    marginHorizontal: moderateScale(10),
    width: screenWidth * 0.26,
    height: screenWidth * 0.26,
    backgroundColor: '#f4f4f4',
    borderRadius: moderateScale(25),
    justifyContent: 'center',
    alignItems: 'center',
  }
})

