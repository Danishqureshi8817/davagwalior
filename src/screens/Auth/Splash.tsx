import { useEffect } from 'react'
import { resetAndNavigate } from '@utils/NavigationUtils'
import { Container } from '@components/global/Container';
import { Alert, Image, ImageBackground, View } from 'react-native';
import { moderateScale } from '@utils/responsiveSize';
import { Colors, RoutesName } from '@utils/Constants';
import { useAuthStore } from '@state/authStore';
import GeoLocation from '@react-native-community/geolocation'
import { jwtDecode } from 'jwt-decode'
import { tokenStorage } from '@state/storage';
import { useToast } from '@masumdev/rn-toast';
import { isLocationEnabled, promptForEnableLocationIfNeeded } from 'react-native-android-location-enabler';

GeoLocation.setRNConfiguration({
  skipPermissionRequests: false,
  authorizationLevel: 'always',
  enableBackgroundLocationUpdates: true,
  locationProvider: 'auto'
})

interface DecodedToken {
  exp: number;
}
const Splash = () => {

  // init
  const { user, setUser } = useAuthStore()
  const { showToast } = useToast();

  const tokenCheck = async () => {
    const accessToken = tokenStorage.getString('accessToken') as string
    const refreshToken = tokenStorage.getString('refreshToken') as string

    if (accessToken) {
      const decodedAccessToken = jwtDecode<DecodedToken>(accessToken)
      const decodedRefreshToken = jwtDecode<DecodedToken>(refreshToken)

      const currentTime = Date.now() / 1000; //unix eco formate

      if (decodedRefreshToken?.exp < currentTime) {
        resetAndNavigate(RoutesName.Login)
        showToast(`Session Expired, Please login again`, 'error');
        return false
      }

      if (decodedAccessToken?.exp < currentTime) {
        // try {
        //   refresh_tokens()
        //   await refetchUser(setUser)
        // } catch (error) {
        //   console.log(error);
        //   Alert.alert('There was an error refreshing token!')
        //   return false
        // }
      }
      resetAndNavigate(RoutesName?.TabNavigation)
      return true
    }

    resetAndNavigate(RoutesName.Login)
    return false
  }

  const ensureLocationEnabled = async () => {
    const enabled = await isLocationEnabled();
    if (!enabled) {
      await promptForEnableLocationIfNeeded();
    }
  };

  useEffect(() => {
    const initialStart = () => {
      try {
        ensureLocationEnabled()
        GeoLocation.requestAuthorization()
        tokenCheck()
      } catch (error) {
        Alert.alert("Sorry we need location service to give you better shopping experience")
      }
    }

    const timeout = setTimeout(initialStart, 1000)

    return () => {
      clearTimeout(timeout)
    }
  }, [])

  return (
    <Container fullScreen={true} statusBarBackgroundColor='transparent' statusBarStyle='light-content'>
      {/* <ImageBackground alt='bgIcon' source={require('@assets/images/splashBG.png')} style={{ width:'100%', height:'100%', justifyContent:'center', alignItems:'center' }} > */}
      {/* </ImageBackground> */}

      <View style={{ flex: 1, backgroundColor: Colors.primary, justifyContent: 'center', alignItems: 'center' }}>

        <Image source={require('@assets/icons/splashLogo.png')} style={{ width: moderateScale(235), height: moderateScale(140) }} resizeMode='contain' />
      </View>

    </Container>
  )
}

export default Splash