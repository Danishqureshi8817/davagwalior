import { Image, ImageBackground, StyleSheet, TextInput, View } from 'react-native'
import { moderateScale, moderateScaleVertical, textScale } from '../../utils/responsiveSize'
import { useState } from 'react'
import { useToast } from '@masumdev/rn-toast'
import { Container } from '@components/global/Container'
import CustomText from '@components/global/CustomText'
import { RFValue } from 'react-native-responsive-fontsize'
import { Colors, Fonts, RoutesName } from '@utils/Constants'
import PrimaryButton from '@components/ui/PrimaryButton'
import useUserLogin from '@hooks/auth/user-login'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Body from '@components/global/Body'
import { navigate } from '@utils/NavigationUtils'


const Login = () => {

  // init
  const { showToast } = useToast();
  const insets = useSafeAreaInsets()

  // state
  const [mobile, setMobile] = useState('')
  const [referCode, setReferCode] = useState<string>('')

  // api 
  const useUserLoginMutation = useUserLogin()

  const onLogin = () => {

    if (!mobile) {
      showToast('Please enter mobile number', 'error');
      return;
    }

    const payload = {
      mobile: Number(mobile),
      referCode: referCode
    }

    useUserLoginMutation.mutate(payload, {
      onSuccess: (data) => {
        if (data?.data?.success) {
          showToast(`${data?.data?.message}${data?.data?.result?.otp}`, 'success');
          console.log(data?.data?.result);
          navigate(RoutesName?.OtpVerify, { mobile, otp: data?.data?.result?.otp })
        } else {
          showToast(`Something went wrong, please try again later`, 'error');
        }

      }
    })
  }

  return (
    <Container fullScreen={true} statusBarBackgroundColor='transparent' statusBarStyle='dark-content'>
      <Body contentContainerStyle={{}} >
        {/* <ImageBackground alt='loginBg' source={require('@assets/images/loginBg.png')} style={{ width: '100%', justifyContent: 'center', paddingTop: moderateScaleVertical(insets.top + 40) }} resizeMode='cover'> */}
        


        {/* </ImageBackground> */}
        <View style={{ width: '100%', justifyContent: 'center', paddingTop: moderateScaleVertical(insets.top + 40) }}>
          <View style={{ alignItems: 'center', justifyContent: 'center', gap: moderateScaleVertical(5) }}>
            <Image source={require('@assets/icons/loginLogo.png')} resizeMode='contain' style={{ width: moderateScale(90), height: moderateScale(90),marginBottom:moderateScaleVertical(40) }} />
            <CustomText fontSize={RFValue(16)} fontFamily={Fonts.SemiBold} numberOfLine={2} style={{ textAlign: 'center' }} >Enter your mobile number</CustomText>
            <CustomText variant='h6' fontFamily={Fonts.Regular} numberOfLine={1} style={{ textAlign: 'center' }} >We will send you a verification code</CustomText>
          </View>
        </View>
        {/* <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center', height: moderateScale(70), overflow: 'hidden', marginVertical: moderateScaleVertical(20),width:'100%',justifyContent:'center' }} >
          <CustomText fontSize={RFValue(14)} fontFamily={Fonts.Medium} numberOfLine={1} >+91</CustomText>
          <View style={styles.divider} />
          <View style={{ backgroundColor: Colors.white, borderRadius: moderateScale(8), overflow: 'hidden', paddingLeft: moderateScale(5), flex: 1, height: moderateScale(70) }} >
          <TextInput
            placeholder='(000) 000-00-00'
            value={mobile}
            maxLength={10}
            onChangeText={(t) => setMobile(t)}
            placeholderTextColor={Colors.grayish}
            keyboardType='number-pad'
            style={{ color: Colors.black, fontSize: RFValue(18), fontFamily: Fonts.Medium,width:'40%',alignSelf:'center' }}
          />
          </View>
        </View> */}

        <View style={{ marginVertical: moderateScaleVertical(15) }}>
          <TextInput
            placeholder='(000) 000-00-00'
            value={mobile}
            maxLength={10}
            onChangeText={(t) => setMobile(t)}
            placeholderTextColor={Colors.grayish}
            keyboardType='number-pad'
            style={{ color: Colors.black, fontSize: RFValue(16), fontFamily: Fonts.Medium, alignSelf: 'center' }}
          />
        </View>


        <View style={{ backgroundColor: Colors.lavenderBlush, height: moderateScale(190), borderRadius: moderateScale(10), marginHorizontal: moderateScale(25) }} >

          <View style={{ backgroundColor: Colors.white, flexDirection: 'row', alignItems: 'center', marginHorizontal: moderateScale(15), marginTop: moderateScaleVertical(10), borderWidth: 1, borderRadius: moderateScale(5), height: moderateScale(53), justifyContent: 'space-between', paddingHorizontal: moderateScale(10), borderStyle: 'dashed', borderColor: Colors.deepLavende }}>
            <CustomText fontSize={RFValue(10)} fontFamily={Fonts.Medium} numberOfLine={1} style={{ color: Colors.deepLavende }} >Apply Referral Code Below</CustomText>

            <Image alt='loginRefer' source={require('@assets/images/loginRefer.png')} resizeMode='contain' style={{ width: moderateScale(33), height: moderateScale(33) }} />
          </View>

          <View style={{ marginHorizontal: moderateScale(15), marginTop: moderateScaleVertical(30), gap: moderateScaleVertical(8) }}>
            <CustomText fontSize={RFValue(10)} fontFamily={Fonts.Medium} numberOfLine={1} >Refer Code</CustomText>

            <View style={{ backgroundColor: Colors.white, justifyContent: 'center', borderRadius: moderateScale(8), overflow: 'hidden', paddingLeft: moderateScale(5), height: moderateScale(45) }}>
              <TextInput
                placeholder='Enter Refer Code'
                placeholderTextColor={Colors.grayish}
                style={{ color: Colors.black, fontSize: RFValue(12), fontFamily: Fonts.Regular }}
              />
            </View>
          </View>
        </View>

        <PrimaryButton onPress={onLogin} disabled={useUserLoginMutation?.isPending} loading={useUserLoginMutation.isPending} buttonText='Continue' marginHorizontal={moderateScale(20)} borderRadius={moderateScale(10)} marginTop={moderateScaleVertical(30)} />

        <CustomText variant='h7' fontFamily={Fonts.Medium} numberOfLine={2} style={{ color: Colors.grayish, textAlign: 'center', marginHorizontal: moderateScale(20), marginTop: moderateScaleVertical(30) }} >By clicking on “Continue” you are agreeing to our
          <CustomText variant='h7' fontFamily={Fonts.SemiBold} numberOfLine={1} style={{ color: Colors.primary2 }} > terms of use</CustomText>
        </CustomText>
      </Body>
    </Container>
  )
}

export default Login


const styles = StyleSheet.create({
  divider: {
    height: '40%',
    width: 1,
    backgroundColor: Colors.black3,
    marginHorizontal: moderateScale(10)
  }

})