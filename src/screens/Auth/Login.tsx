import { Animated, Image, Keyboard, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { moderateScale, moderateScaleVertical } from '../../utils/responsiveSize'
import { useEffect, useRef, useState } from 'react'
import { useToast } from '@masumdev/rn-toast'
import { Container } from '@components/global/Container'
import CustomText from '@components/global/CustomText'
import { RFValue } from 'react-native-responsive-fontsize'
import { Colors, Fonts, RoutesName, lightColors } from '@utils/Constants'
import PrimaryButton from '@components/ui/PrimaryButton'
import useUserLogin from '@hooks/auth/user-login'
import { navigate } from '@utils/NavigationUtils'
import ProductSlider from '@components/login/ProductSlider'
import CustomInput from '@components/ui/CustomInput'
import LinearGradient from 'react-native-linear-gradient'
import useKeyboardOffsetHeight from '@utils/useKeyboardOffsetHeight'


const bottomColors = [...lightColors].reverse()

const Login = () => {

  // init
  const { showToast } = useToast();
  const animatedValue = useRef(new Animated.Value(0)).current
  const keyboardOffsetHeight = useKeyboardOffsetHeight()

  // state
  const [mobile, setMobile] = useState('')

  // api 
  const useUserLoginMutation = useUserLogin()

  useEffect(() => {
    if (keyboardOffsetHeight === 0) {
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false
      }).start()
    } else {
      Animated.timing(animatedValue, {
        toValue: -keyboardOffsetHeight * 0.84,
        duration: 1000,
        useNativeDriver: false
      }).start()
    }
  }, [keyboardOffsetHeight])

  const onLogin = () => {
    Keyboard.dismiss()
    
    if (!mobile) {
      showToast('Please enter mobile number', 'error');
      return;
    }

    const payload = {
      mobile: Number(mobile),
      mobilecountrycode: 91,
      fcmToken: '',
      deviceInfo: '',
    }

    useUserLoginMutation.mutate(payload, {
      onSuccess: (data) => {
        if (data?.data?.success) {
          showToast(`${data?.data?.message}${data?.data?.result?.otp}`, 'success');
          console.log(data?.data?.result);
          navigate(RoutesName?.OtpVerify, { mobile, otp: data?.data?.result?.otp })
        } else {
          console.log(data?.data?.message,'kl');
          showToast(`Something went wrong, please try again later`, 'error');
        }

      }
    })
  }

  return (
    <Container fullScreen={true} statusBarBackgroundColor={'transparent'} statusBarStyle='dark-content'>
      <View style={styles.container} >
        <ProductSlider />

        <Animated.ScrollView
          bounces={false}
          style={{ transform: [{ translateY: animatedValue }] }}
          keyboardDismissMode='on-drag'
          keyboardShouldPersistTaps='handled'
          contentContainerStyle={styles.subContainer}
        >
          <LinearGradient colors={bottomColors} style={styles.gradient} />
          <View style={styles.content} >
            <Image source={require('@assets/icons/loginLogo.png')} resizeMode='contain' style={styles.logo} />

            <CustomText variant='h2' fontFamily={Fonts.Bold} >Dava Gwalior</CustomText>
            <CustomText variant='h5' fontFamily={Fonts.SemiBold} style={styles.text} >Login in or sign up</CustomText>

            <CustomInput
              onChangeText={(text) => setMobile(text.slice(0, 10))}
              onClear={() => setMobile('')}
              value={mobile}
              placeholder='Enter mobile number'
              inputMode='numeric'
              right={true}
              left={
                <CustomText style={styles.phoneText} variant='h6' fontFamily={Fonts.SemiBold}  >
                  +91
                </CustomText>
              }
            />

            <PrimaryButton
              disabled={mobile?.length != 10}
              onPress={onLogin}
              loading={useUserLoginMutation?.isPending}
              buttonText='Continue'
              style={styles.button}
            />
          </View>
        </Animated.ScrollView>

        <View style={styles.footer} >
          <CustomText fontSize={RFValue(6)} >
            By Continuing, you agree to our <Text style={{ color: Colors.primary }} >Terms of Service</Text> and <Text style={{ color: Colors.primary }} >Privacy Policy</Text>
          </CustomText>
        </View>
      </View>
    </Container>
  )
}

export default Login


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  subContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: moderateScaleVertical(20),
  },
  footer: {
    borderTopWidth: 0.8,
    borderColor: Colors.border,
    paddingBottom: moderateScaleVertical(10),
    zIndex: 22,
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    padding: moderateScale(10),
    backgroundColor: '#f8f9fc',
    width: '100%'
  },
  gradient: {
    paddingTop: moderateScaleVertical(10),
    width: '100%'
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'white',
    paddingHorizontal: moderateScale(20),
    paddingBottom: moderateScaleVertical(20)
  },
  logo: {
    height: moderateScale(50),
    width: moderateScale(50),
    borderRadius: moderateScale(20),
    marginVertical: moderateScaleVertical(10)
  },
  text: {
    marginTop: moderateScaleVertical(2),
    marginBottom: moderateScaleVertical(25),
    opacity: 0.8
  },
  phoneText: {
    marginLeft: moderateScale(10)
  },
  button: {
    width: '100%',
    marginVertical: moderateScaleVertical(15)
  }
})