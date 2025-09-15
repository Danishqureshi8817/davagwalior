import React from 'react';
import { Modal, View, StyleSheet, ActivityIndicator } from 'react-native';
import { moderateScale, moderateScaleVertical } from '@utils/responsiveSize';
import CustomText from '@components/global/CustomText';
import { Colors, Fonts } from '@utils/Constants';

const CenterModalLoader = ({ loading }: { loading: boolean }) => {
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={loading}
      >
        <View style={styles.overlay}>
          <View style={styles.loaderContainer}>
            <CustomText
              fontFamily={Fonts.SemiBold}
              variant="h6"
              numberOfLine={1}
            >
              Please wait
            </CustomText>
            <ActivityIndicator size="large" color={Colors.deepPurple} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CenterModalLoader;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  loaderContainer: {
    backgroundColor: '#fff',
    borderRadius: moderateScale(10),
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    width: '55%',
    height: '15%',
    gap: moderateScaleVertical(15),
  },
});
