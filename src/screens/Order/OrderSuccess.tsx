import { View, StyleSheet } from 'react-native';
import { Colors, Fonts, RoutesName } from '@utils/Constants';
import { Container } from '@components/global/Container';
import CustomText from '@components/global/CustomText';
import PrimaryButton from '@components/ui/PrimaryButton';
import { moderateScale, moderateScaleVertical } from '@utils/responsiveSize';
import LottieView from 'lottie-react-native'
import { screenWidth } from '@utils/Scaling';
import { useEffect } from 'react';
import { replace } from '@utils/NavigationUtils';

const OrderSuccess = () => {

  useEffect(() => {
   
    const timeout = setTimeout(() => {
      replace(RoutesName.TabNavigation)
    }, 2300);
  
    return () => clearTimeout(timeout);
  }, [])

  return (
    <Container backgroundColor={Colors.white} statusBarBackgroundColor={Colors.white} statusBarStyle="dark-content">
      <View style={styles.container}>
      <LottieView 
       source={require('@assets/animations/confirm.json')}
       autoPlay
       duration={2000}
       loop={false}
       speed={1}
       style={styles.lottieView}
       enableMergePathsAndroidForKitKatAndAbove
       hardwareAccelerationAndroid
      />
        <CustomText variant="h3" fontFamily={Fonts.Bold}>Order Successful!</CustomText>
        <CustomText variant="h8" fontFamily={Fonts.Medium} style={styles.subtitle}>
          Your Order has been successfully completed. You can track the delivery in the order section.
        </CustomText>
        <PrimaryButton
          buttonText="View Order"
          width={moderateScale(320)}
          borderRadius={moderateScale(10)}
          marginTop={moderateScaleVertical(25)}
        />
      </View>
    </Container>
  );
};

export default OrderSuccess;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: moderateScaleVertical(20),
  },
  image: {
    width: moderateScale(250),
    height: moderateScaleVertical(200),
  },
  subtitle: {
    color: Colors.grayish,
    width: moderateScale(280),
    textAlign: 'center',
  },
  lottieView:{
    width:screenWidth*0.6,
    height:moderateScale(150)
  },
});
