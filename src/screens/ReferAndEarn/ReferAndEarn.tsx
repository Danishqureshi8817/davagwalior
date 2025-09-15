import { Container } from "@components/global/Container"
import CustomText from "@components/global/CustomText"
import { LessWhiteIcon, ReferCopyIocn } from "@components/Icons"
import PrimaryButton from "@components/ui/PrimaryButton"
import useGetSettings from "@hooks/auth/get-settings"
import useGetUserProfile from "@hooks/profile/get-user-profile"
import { useAuthStore } from "@state/authStore"
import { shadowStyle } from "@styles/GlobalStyles"
import { Colors, Fonts } from "@utils/Constants"
import { goBack } from "@utils/NavigationUtils"
import { moderateScale, moderateScaleVertical } from "@utils/responsiveSize"
import { useContext } from "react"
import { View, StyleSheet, Image, ImageBackground, Pressable, ActivityIndicator } from "react-native"

const ReferAndEarn = () => {

  // init
  const { user } = useAuthStore()

  const { data, isLoading } = useGetUserProfile({ userId: user?.userUniqueId })
  const { data: settingData, isLoading: settingIsLoading } = useGetSettings()

  const Header = () => (
    <View style={styles.headerContainer}>
      <ImageBackground
        source={require('@assets/images/ReferHeaderBg.png')}
        style={styles.imageBackground}
        resizeMode="cover"
      >
        <View style={styles.headerTopRow}>
          <Pressable onPress={() => goBack()}>
            <LessWhiteIcon />
          </Pressable>
          <CustomText variant="h5" fontFamily={Fonts.SemiBold} numberOfLine={1} style={styles.headerTitle}>Refer And Earn</CustomText>
          <View style={{ width: 24 }} />
        </View>
        <Image
          source={require('@assets/icons/referCashIcon.png')}
          style={styles.referIcon}
          resizeMode="contain"
        />
      </ImageBackground>
    </View>
  )

  if (isLoading || settingIsLoading) {
    return (
      <Container statusBarBackgroundColor={Colors.paleGray} statusBarStyle="dark-content">
        <Header />
        <View style={styles.spinnerContainer}>
          <ActivityIndicator size="large" color={Colors.Purple} />
        </View>
      </Container>
    )
  }

  return (
    <Container fullScreen statusBarBackgroundColor="transparent" statusBarStyle="dark-content">
      <Header />
      <View style={styles.cardContainer}>
        <CustomText variant="h4" fontFamily={Fonts.SemiBold} style={styles.bonusText}>
          Invite Friend to get ₹ {settingData?.data?.result?.referalBonus ?? 'N/A'}
        </CustomText>

        <CustomText variant="h7" fontFamily={Fonts.Regular} style={styles.subText}>
          Invite friend and get ₹100 when your friend sends their first payment. They get ₹21
        </CustomText>

        <View style={styles.codeBox}>
          <CustomText variant="h8" fontFamily={Fonts.Medium} style={styles.codeLabel}>
            Copy your Code:
            <CustomText variant="h7" fontFamily={Fonts.SemiBold} style={styles.codeValue}> {data?.data?.result?.userReferalCode ?? 'N/A'}</CustomText>
          </CustomText>
          <ReferCopyIocn />
        </View>

        <Image
          source={require('@assets/images/referCardDotLine.png')}
          style={styles.bottomDots}
          resizeMode="cover"
        />

        <PrimaryButton
          buttonText="Invite"
          borderRadius={10}
          height={moderateScaleVertical(45)}
          width="80%"
        />
      </View>
    </Container>
  )
}

const styles = StyleSheet.create({
  spinnerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerContainer: {
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    overflow: "hidden",
  },
  imageBackground: {
    height: moderateScale(360),
    paddingHorizontal: moderateScale(20),
  },
  headerTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: moderateScaleVertical(60),
  },
  headerTitle: {
    color: Colors.white,
  },
  referIcon: {
    width: moderateScale(200),
    height: moderateScale(120),
    alignSelf: "center",
    marginTop: moderateScaleVertical(45),
  },
  cardContainer: {
    backgroundColor: Colors.white,
    marginHorizontal: moderateScale(20),
    height: moderateScale(350),
    marginTop: moderateScaleVertical(-80),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    overflow: "hidden",
    gap: moderateScaleVertical(20),
    ...shadowStyle
  },
  bonusText: {
    color: Colors.black,
    textAlign: "center",
  },
  subText: {
    color: Colors.mutedPurple,
    textAlign: "center",
    marginHorizontal: moderateScale(20),
  },
  codeBox: {
    backgroundColor: Colors.lavenderBlush,
    width: "90%",
    height: moderateScale(46),
    borderRadius: 7,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  codeLabel: {
    color: Colors.black,
  },
  codeValue: {
    color: Colors.darkViolet,
  },
  bottomDots: {
    width: "100%",
    height: moderateScale(10),
    position: "absolute",
    bottom: 0,
  },
})

export default ReferAndEarn
