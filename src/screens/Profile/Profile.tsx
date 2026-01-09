import { useContext, useState } from "react"
import { View, Image, StyleSheet, Pressable, ScrollView, ActivityIndicator } from "react-native"
import { ParamListBase, useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { ChangePasswordIcon, GreaterProfileIcon, ProfileCallIcon, ProfileHelpIcon, ProfileMailIcon, ProfileRateUsIcon, ProfileReferIcon, ProfileWalletIcon } from '@components/Icons'
import { useAuthStore } from "@state/authStore"
import useGetUserProfile from "@hooks/profile/get-user-profile"
import { useCartStore } from "@state/cartStore"
import { navigate, resetAndNavigate } from "@utils/NavigationUtils"
import { Colors, RoutesName } from "@utils/Constants"
import { Container } from "@components/global/Container"
import { AppBar } from "@components/global/AppBar"
import { moderateScale, moderateScaleVertical } from "@utils/responsiveSize"
import PrimaryButton from "@components/ui/PrimaryButton"
import CustomText from "@components/global/CustomText"
import Avatar from "@components/global/Avatar"
import MIcon from 'react-native-vector-icons/MaterialIcons';
import { RFValue } from "react-native-responsive-fontsize"
import { storage, tokenStorage } from "@state/storage"
import Body from "@components/global/Body"

const Profile = () => {
  // init
  const { user, logout } = useAuthStore()
  const { clearCart } = useCartStore();

  const [load, setLoad] = useState(false)

  // api
  const { data, isLoading } = useGetUserProfile({ userId: user?.userUniqueId })

  console.log(data?.data?.result);
  

  const onLogOut = () => {
    // setLoad(true);
    // setTimeout(() => setLoad(false), 1500);
    logout()
    clearCart()
    tokenStorage.clearAll();
    storage.clearAll();
    resetAndNavigate(RoutesName.Login)

  }

  if (isLoading) {
    return (
      <Container statusBarBackgroundColor={Colors.paleGray} backgroundColor={Colors.white} statusBarStyle='dark-content'>
        <AppBar back title='Profile' />
        <View style={styles.spinnerContainer}>
          <ActivityIndicator size={'large'} color={Colors.Purple} />
        </View>
      </Container>
    )
  }

  return (
    <Container statusBarBackgroundColor={Colors.paleGray} statusBarStyle='dark-content'>
      <AppBar back title='Profile' />
      <Body contentContainerStyle={styles.body}>
        <View style={styles.profileCard}>
          {!!data?.data?.result?.user?.avatarUrl ?
            <Image source={{ uri: data?.data?.result?.user?.avatarUrl }} style={styles.profileImage} /> :
            !!data?.data?.result?.user?.displayName ?
              <Avatar bgColor={Colors.Purple} fallbackText={data?.data?.result?.user?.displayName} containerStyle={{ alignSelf: 'center' }} />
              :
              <Image source={require('@assets/images/savemoneyHome.png')} style={styles.profileImage} />
          }

          <View style={styles.profileDetails}>
            <CustomText style={styles.name}>{data?.data?.result?.user?.displayName ?? 'N/A'}</CustomText>
            <View style={styles.infoRow}>
              <ProfileMailIcon />
              <CustomText style={styles.infoText}>{data?.data?.result?.user?.email ?? 'N/A'}</CustomText>
            </View>
            <View style={styles.infoRow}>
              <ProfileCallIcon />
              <CustomText style={styles.infoText}>{data?.data?.result?.user?.mobile ?? 'N/A'}</CustomText>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Pressable onPress={() => navigate(RoutesName.EditProfile)} style={styles.settingRow}>
            <View style={styles.rowContent}>
              <MIcon name="edit" size={RFValue(20)} color={Colors.primary} />
              <CustomText style={styles.optionText}>Edit Profile</CustomText>
            </View>
            <GreaterProfileIcon />
          </Pressable>

          <Pressable onPress={() => navigate(RoutesName.Wallet)} style={styles.settingRow}>
            <View style={styles.rowContent}>
              <ProfileWalletIcon />
              <CustomText style={styles.optionText}>Wallet</CustomText>
            </View>
            <GreaterProfileIcon />
          </Pressable>

          <Pressable onPress={() => navigate(RoutesName.ReferAndEarn)} style={styles.settingRow}>
            <View style={styles.rowContent}>
              <ProfileReferIcon />
              <CustomText style={styles.optionText}>Refer and Earn</CustomText>
            </View>
            <GreaterProfileIcon />
          </Pressable>

          <View style={styles.settingRow}>
            <View style={styles.rowContent}>
              <ProfileRateUsIcon />
              <CustomText style={styles.optionText}>Rate Us</CustomText>
            </View>
            <GreaterProfileIcon />
          </View>

          <View style={styles.settingRow}>
            <View style={styles.rowContent}>
              <ProfileHelpIcon />
              <CustomText style={styles.optionText}>Help</CustomText>
            </View>
            <GreaterProfileIcon />
          </View>
        </View>

        <PrimaryButton buttonText="Logout" onPress={onLogOut} loading={load} disabled={load} marginHorizontal={moderateScale(20)} borderRadius={moderateScale(10)} marginVertical={moderateScaleVertical(20)} />
      </Body>
    </Container>
  )
}

const styles = StyleSheet.create({
  spinnerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    paddingBottom: moderateScaleVertical(30),
  },
  profileCard: {
    backgroundColor: Colors.lavenderBlush,
    marginHorizontal: moderateScale(20),
    height: moderateScale(190),
    borderWidth: 1,
    borderColor: Colors.lightOrchid,
    borderRadius: moderateScale(10),
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateScaleVertical(15),
    marginTop: moderateScaleVertical(30),
  },
  profileImage: {
    width: moderateScale(65),
    height: moderateScale(65),
    borderRadius: moderateScale(32),
    alignSelf: 'center',
  },
  profileDetails: {
    marginTop: moderateScaleVertical(20),
    alignItems: 'center',
    gap: 7,
  },
  name: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    lineHeight: 16,
    color: Colors.black,
    textAlign: 'center',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  infoText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    lineHeight: 14,
    color: Colors.mutedPurple,
  },
  section: {
    marginTop: moderateScaleVertical(30),
    gap: 10,
  },
  settingRow: {
    backgroundColor: Colors.paleGray,
    marginHorizontal: moderateScale(20),
    height: moderateScale(50),
    borderWidth: 1,
    borderRadius: 8,
    borderColor: Colors.lavenderGray,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(20),
  },
  rowContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  optionText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    lineHeight: 16,
    color: Colors.black,
  },
})

export default Profile
