import CustomText from '@components/global/CustomText';
import { Colors, Fonts } from '@utils/Constants';
import { moderateScale, moderateScaleVertical } from '@utils/responsiveSize';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import StepIndicator from 'react-native-step-indicator';

const labels = ["", "", ""];
const customStyles = {
  stepIndicatorSize: moderateScale(35),
  currentStepIndicatorSize: moderateScale(35),
  separatorStrokeWidth: 1.5,
  currentStepStrokeWidth: 0,
  stepStrokeCurrentColor: Colors.lightOrchid,
  stepStrokeWidth: 0,
  stepStrokeFinishedColor: Colors.lightOrchid,
  stepStrokeUnFinishedColor: '#D3D5D6',
  separatorFinishedColor: Colors.lightOrchid,
  separatorUnFinishedColor: '#E7DFDF',
  stepIndicatorFinishedColor: Colors.lightOrchid,
  stepIndicatorUnFinishedColor: '#EBD7F3',
  stepIndicatorCurrentColor: '#EBD7F3',
  stepIndicatorLabelFontSize: 14,
  currentStepIndicatorLabelFontSize: 16,
  stepIndicatorLabelCurrentColor: Colors.darkViolet,
  stepIndicatorLabelFinishedColor: Colors.darkViolet,
  stepIndicatorLabelUnFinishedColor: Colors.darkViolet,
  labelColor: Colors.darkViolet,
  labelSize: 16,
  currentStepLabelColor: Colors.black,
}

const LabTestProcess = () => {
  return (
    <LinearGradient
    colors={['#F6EDF9', '#F6EDF9','rgba(255,255,255, 0)']} 
    locations={[0.5, 0.6, 1]}
      style={styles.gradient}
    >
      <CustomText variant='h4' fontFamily={Fonts.SemiBold} style={styles.title}>Lab Test Process</CustomText>

      <View style={styles.contentWrapper}>
        <View style={styles.indicatorContainer}>
          <StepIndicator
            stepCount={3}
            direction="vertical"
            customStyles={customStyles}
            currentPosition={-1} // hides active highlight
            labels={labels}
          />
        </View>

        <View style={styles.stepsContent}>
          <View style={styles.step}>
            <CustomText variant='h7' fontFamily={Fonts.Medium}>Book our Labtest</CustomText>
            <CustomText variant='h8' fontFamily={Fonts.Regular}>Schedule your lab test with us today.</CustomText>
          </View>

          <View style={styles.step}>
            <CustomText variant='h7' fontFamily={Fonts.Medium}>We'll collect your sample</CustomText>
            <CustomText variant='h8' fontFamily={Fonts.Regular}>We'll collect your sample.</CustomText>
          </View>

          <View style={styles.step}>
            <CustomText variant='h7' fontFamily={Fonts.Medium}>You'll receive your health report</CustomText>
            <CustomText variant='h8' fontFamily={Fonts.Regular}>Get your health report delivered promptly.</CustomText>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    height: moderateScale(270),
    marginTop: moderateScaleVertical(20),
  },
  title: {
    color: Colors.black,
    textAlign: 'center',
    marginTop: moderateScaleVertical(20),
  },
  contentWrapper: {
    flexDirection: 'row',
    marginHorizontal: moderateScale(20),
    marginTop: moderateScaleVertical(10),
    // justifyContent: 'space-between',
    alignItems: 'center',
  },
  indicatorContainer: {
    width: moderateScale(55),
    height: moderateScale(210),
  },
  stepsContent: {
    marginTop: moderateScaleVertical(-12),
    gap: moderateScaleVertical(25),
  },
  step: {
   // maxWidth: moderateScale(220),
  },
});

export default LabTestProcess;
