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
import useGetSettings from '@hooks/auth/get-settings';
import useRefreshToken from '@hooks/auth/refresh-token';

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

  // api
  const useGetSettingsQuery = useGetSettings()
  const refreshTokenMutation = useRefreshToken()

  const tokenCheck = async () => {
    const accessToken = tokenStorage.getString('accessToken') as string
    const refreshToken = tokenStorage.getString('refreshToken') as string

    console.log(accessToken,'accessToken');
    if (accessToken && refreshToken) {
      try {
        const decodedAccessToken = jwtDecode<DecodedToken>(accessToken)
        const decodedRefreshToken = jwtDecode<DecodedToken>(refreshToken)

        const currentTime = Date.now() / 1000; //unix eco formate

        if (decodedRefreshToken?.exp < currentTime) {
          resetAndNavigate(RoutesName.Login)
          showToast(`Session Expired, Please login again`, 'error');
          return false
        }

        if (decodedAccessToken?.exp < currentTime) {
          console.log('accessToken expired, refreshing token...');
          
          // Call refresh token API with refresh token
          refreshTokenMutation.mutate({ refreshToken }, {
            onSuccess: (data) => {
              if (data?.data?.success && data?.data?.result) {
                // Store new tokens
                tokenStorage.set("accessToken", data?.data?.result?.token)
                tokenStorage.set("refreshToken", data?.data?.result?.refreshToken)

                // Update user data if available
                if (data?.data?.result?.user) {
                  const { setUser } = useAuthStore.getState()
                  setUser({
                    expirationTime: data?.data?.result?.expirationTime,
                    userUniqueId: data?.data?.result?.user?.userUniqueId,
                    userMobile: data?.data?.result?.user?.mobile
                  })
                }

                resetAndNavigate(RoutesName?.TabNavigation)
              } else {
                resetAndNavigate(RoutesName.Login)
                showToast(`Session Expired, Please login again`, 'error');
              }
            },
            onError: (error) => {
              console.log('Error refreshing token:', error);
              resetAndNavigate(RoutesName.Login)
              showToast(`Session Expired, Please login again`, 'error');
            }
          })
          return false // Don't navigate yet, wait for refresh token response
        }
        
        resetAndNavigate(RoutesName?.TabNavigation)
        return true
      } catch (error) {
        console.log('Error in token check:', error);
        resetAndNavigate(RoutesName.Login)
        return false
      }
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
    if (useGetSettingsQuery?.data?.data?.success) {
      const { setSettingData } = useAuthStore.getState()
      setSettingData(useGetSettingsQuery?.data?.data?.result?.setting)
    }
  }, [useGetSettingsQuery?.data])

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