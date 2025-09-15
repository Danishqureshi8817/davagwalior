import { useContext, useState } from 'react'
import CountDown from 'react-native-countdown-component';
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { ParamListBase, useNavigation, useRoute } from '@react-navigation/native'
import { OtpInput, OtpInputProps } from 'react-native-otp-entry'
import { moderateScale, moderateScaleVertical } from '../../utils/responsiveSize';
import { EditIcon, LessIcon } from '@components/Icons';
import useOtpResend from '@hooks/auth/otp-resend';
import useOtpVerifing from '@hooks/auth/otp-verifing';
import { Colors, Fonts, RoutesName } from '@utils/Constants';
import { Container } from '@components/global/Container';
import PrimaryButton from '@components/ui/PrimaryButton';
import { useToast } from '@masumdev/rn-toast';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { navigate, resetAndNavigate } from '@utils/NavigationUtils';
import { ActivityIndicator, Image, ImageBackground, Pressable, StyleSheet, View } from 'react-native';
import CustomText from '@components/global/CustomText';
import { RFValue } from 'react-native-responsive-fontsize';
import { tokenStorage } from '@state/storage';
import { useAuthStore } from '@state/authStore';

interface ExtendedOtpInputProps extends OtpInputProps {
  pinCodeContainerStyle?: object; // Add missing property
}

const OtpVerify = () => {

  // init
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const route: any = useRoute()
  const { mobile, otp } = route?.params
  const { showToast } = useToast();
  const insets = useSafeAreaInsets()

  // states
  const [otpInput, setOtpInput] = useState<string>('');
  const [isTimeOver, setIsTimeOver] = useState(true);

  // api
  const useOtpVerifingMutation = useOtpVerifing()
  const useOtpResendMutation = useOtpResend()

  const onFinishTimer = () => {
    setIsTimeOver(false)
    // navigation.navigate(StackNav.TabNavigation)
  };

  const onOTPVerifing = () => {
    const payload = {
      mobile: mobile,
      otp: Number(otpInput)
    }
    useOtpVerifingMutation.mutate(payload, {
      onSuccess: async (data) => {
        if (data?.data?.success) {
          showToast(`Login successfully`, 'success');
          console.log(data?.data?.result);

          tokenStorage.set("accessToken", data?.data?.result?.token)
          tokenStorage.set("refreshToken", data?.data?.result?.refreshToken)

          const { setUser } = useAuthStore.getState()
          setUser({
            expirationTime: data?.data?.result?.ExpirationTime,
            userUniqueId: data?.data?.result?.userUniqueId,
            userMobile: data?.data?.result?.mobile
          })

          resetAndNavigate(RoutesName?.TabNavigation)
        } else {
          showToast(`Something went wrong, please try again later`, 'error');
        }
      }
    })
  }

  const onOTPResend = () => {
    const payload = {
      mobile: mobile,
    }
    useOtpResendMutation.mutate(payload, {
      onSuccess: (data) => {
        console.log(data?.data);

        if (data?.data?.success) {
          showToast(`${data?.data?.message}${data?.data?.result?.otp}`, 'success');
        } else {
          showToast(`Something went wrong, please try again later`, 'error');
        }
      }
    })
  }

  return (
    <Container fullScreen={true} statusBarBackgroundColor='transparent' statusBarStyle='dark-content'>
      <ImageBackground alt='loginBg' source={require('@assets/images/loginBg.png')} style={[styles.topBgContainer, { paddingTop: moderateScaleVertical(20) }]} resizeMode='cover'>
        <Pressable onPress={() => navigation.goBack()} style={styles.backButton}  >
          <LessIcon />
        </Pressable>
        <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: moderateScaleVertical(10), gap: moderateScaleVertical(10) }}>
          <Image alt='loginLogo' source={require('@assets/icons/loginLogo.png')} resizeMode='contain' style={{ width: moderateScale(120), height: moderateScale(120) }} />
          <CustomText variant='h3' style={{ textAlign: 'center', width: moderateScale(250) }} fontFamily={Fonts.SemiBold} numberOfLine={2} >Please verify your mobile number</CustomText>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: moderateScale(10) }}>
            <CustomText variant='h7' style={{ textAlign: 'center', width: moderateScale(300), color: Colors.grayish }} fontFamily={Fonts.Regular} numberOfLine={2} >Please enter {otp} the 4-digit code sent to your mobile number
              <CustomText variant='h7' style={{ textAlign: 'center', color: Colors.black }} fontFamily={Fonts.SemiBold} numberOfLine={2} > +91 {mobile}</CustomText>
            </CustomText>
            <Pressable style={{ alignSelf: 'flex-end', marginBottom: moderateScaleVertical(6) }}>
              <EditIcon />
            </Pressable>
          </View>
        </View>
      </ImageBackground>

      <View style={{ marginHorizontal: moderateScale(25), marginBottom: moderateScaleVertical(20) }} >
        <OtpInput
          numberOfDigits={4}
          onTextChange={(text) => setOtpInput(text)}
          focusColor={Colors.deepLavende}
          focusStickBlinkingDuration={400}
          theme={{
            pinCodeContainerStyle: {
              backgroundColor: Colors.white,
              width: moderateScale(70),
              height: moderateScale(70),
            },
            containerStyle: {
              marginHorizontal: moderateScale(0),
              marginVertical: moderateScaleVertical(30)
            }
          }}
        />
      </View>


      {isTimeOver ? (<View style={{ flexDirection: 'row', alignSelf: 'center' }}>
        <CustomText variant='h7' style={{ textAlign: 'center', color: Colors.grayish }} fontFamily={Fonts.Regular} numberOfLine={1} >Resend code in</CustomText>
        <View style={{ height: moderateScale(3), marginTop: moderateScaleVertical(-3) }}>
          <CountDown
            id={'1'}
            until={15}
            onFinish={onFinishTimer}
            digitStyle={{ backgroundColor: Colors.white }}
            digitTxtStyle={{ color: Colors.deepLavende, fontFamily: Fonts.SemiBold, fontSize: RFValue(14) }}
            timeToShow={['M', 'S']}
            timeLabels={{ m: undefined, s: undefined }}
            showSeparator
          />
        </View>
      </View>) : (<Pressable onPress={onOTPResend}>
        {useOtpResendMutation?.isPending ? (<ActivityIndicator color={Colors.Purple} size={'small'} />) : (<CustomText variant='h7' style={{ textAlign: 'center', color: Colors.Purple }} fontFamily={Fonts.SemiBold} numberOfLine={1} >Resend OTP</CustomText>)}
      </Pressable>)}


      <PrimaryButton onPress={onOTPVerifing} buttonText='Verify OTP' disabled={useOtpVerifingMutation.isPending} loading={useOtpVerifingMutation.isPending} marginHorizontal={moderateScale(10)} borderRadius={moderateScale(10)} marginTop={moderateScaleVertical(30)} />

    </Container>
  )
}

export default OtpVerify

const styles = StyleSheet.create({
  topBgContainer: {
    width: '100%',
    justifyContent: 'center',
  },
  backButton: {
    height: moderateScale(30),
    width: moderateScale(30),
    borderRadius: moderateScale(15),
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: moderateScale(20),
    marginTop: moderateScaleVertical(50)
  }
})