import { View, StyleSheet, Image, ImageBackground, Pressable, ActivityIndicator } from 'react-native'
import { format } from 'date-fns'
import { useAuthStore } from '@state/authStore'
import useGetUserProfile from '@hooks/profile/get-user-profile'
import useGetWalletTransactions from '@hooks/wallet/get-wallet-transaction'
import { goBack, navigate } from '@utils/NavigationUtils'
import { Greater19Icon, LessWhiteIcon, UpArrowIconPurple } from '@components/Icons'
import CustomText from '@components/global/CustomText'
import { Colors, Fonts, RoutesName } from '@utils/Constants'
import { moderateScale, moderateScaleVertical } from '@utils/responsiveSize'
import { RFValue } from 'react-native-responsive-fontsize'
import { Container } from '@components/global/Container'
import PrimaryButton from '@components/ui/PrimaryButton'
import Body from '@components/global/Body'
import { shadowStyle } from '@styles/GlobalStyles'

interface WALLET_CARD {
  id: number
  userId: number
  userName: string
  amount: number
  type: string
  description: string
  createdAt: string
  source: string
}

const Wallet = () => {
  // init
  const { user } = useAuthStore()

  // API Calls
  const { data, isLoading } = useGetWalletTransactions({ userId: user?.userUniqueId })
  const { data: profileData, isLoading: profileIsLoading } = useGetUserProfile({ userId: user?.userUniqueId })

  // Flatten all pages data - only get first 4 for recent transactions
  const allTransactions = data?.pages?.flatMap(page => page?.data?.result?.wallettxn || []) || []
  const recentTransactions = allTransactions.slice(0, 4)

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
          <CustomText variant="h5" fontFamily={Fonts.SemiBold} numberOfLine={1} style={styles.headerTitle}>Wallet</CustomText>
          <View style={{ width: moderateScale(24) }} />
        </View>

        <View style={styles.walletInfo}>
          <CustomText fontSize={RFValue(20)} fontFamily={Fonts.SemiBold} style={styles.walletBalance}>₹ {profileData?.data?.result?.user?.wallet}</CustomText>
          <CustomText variant='h4' fontFamily={Fonts.Regular} style={styles.walletLabel}>Total Balance</CustomText>
        </View>
      </ImageBackground>
    </View>
  )

  if (isLoading || profileIsLoading) {
    return (
      <Container fullScreen statusBarBackgroundColor="transparent" statusBarStyle="dark-content">
        <Header />
        <View style={styles.spinnerContainer}>
          <ActivityIndicator size="large" color={Colors.Purple} />
        </View>
      </Container>
    )
  }

  return (
    <Container fullScreen statusBarBackgroundColor="transparent" statusBarStyle="dark-content">
      <Body>
        <Header />
        <View style={styles.walletCard}>
          <View style={styles.recentTransactionsHeader}>
            <CustomText variant="h7" fontFamily={Fonts.SemiBold} numberOfLine={1} >Recent Transactions</CustomText>
            <Pressable onPress={() => navigate(RoutesName.ViewAllWalletTransactions)} style={styles.viewAll}>
              <CustomText variant="h7" fontFamily={Fonts.SemiBold} style={styles.viewAllText}>View All</CustomText>
              <Greater19Icon />
            </Pressable>
          </View>

          {isLoading ? (
            <View style={styles.spinnerContainer}>
              <ActivityIndicator size="large" color={Colors.Purple} />
            </View>
          ) : (
            <View style={styles.transactionList}>
              {recentTransactions.map((item: WALLET_CARD) => {
                const date = new Date(item?.createdAt)
                return (
                  <View key={item?.id?.toString()} style={styles.transactionCard}>
                    <View style={styles.transactionInfo}>
                      <View style={styles.transactionIconContainer}>
                        <View style={styles.transactionIcon}>
                          {item.type === 'DEBIT' ? (
                            <UpArrowIconPurple style={styles.transactionArrowIcon} />
                          ) : (
                            <UpArrowIconPurple />
                          )}
                        </View>
                      </View>

                      <View style={styles.transactionDetails}>
                        <CustomText variant='h7' fontFamily={Fonts.Medium} numberOfLine={1}>{item?.type}</CustomText>
                        <CustomText variant='h8' fontFamily={Fonts.Medium} style={styles.transactionDate}>
                          {format(date, 'dd MMM yyyy')}, {format(date, 'hh:mm a')}
                        </CustomText>
                        <CustomText variant='h8' fontFamily={Fonts.Medium} style={styles.transactionId}>ID: {item?.id}</CustomText>
                      </View>
                    </View>

                    <CustomText variant='h6' fontFamily={Fonts.SemiBold} style={styles.transactionAmount}>₹ {item?.amount}</CustomText>
                  </View>
                )
              })}
            </View>
          )}

      
        </View>

        <PrimaryButton
            buttonText="Add Balance"
            marginHorizontal={moderateScale(25)}
            marginVertical={moderateScaleVertical(20)}
          />
      </Body>
    </Container>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    borderBottomRightRadius: moderateScale(15),
    borderBottomLeftRadius: moderateScale(15),
    overflow: 'hidden',
  },
  imageBackground: {
    height: moderateScale(370),
    paddingHorizontal: moderateScale(20),
  },
  headerTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: moderateScaleVertical(60),
  },
  headerTitle: {
    color: Colors.white,
  },
  walletInfo: {
    alignItems: 'center',
    marginTop: moderateScaleVertical(70),
    gap: moderateScaleVertical(4),
  },
  walletBalance: {
    color: Colors.white,
  },
  walletLabel: {
    color: Colors.white,
  },
  spinnerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  walletCard: {
    backgroundColor: Colors.white,
    marginHorizontal: moderateScale(25),
    height: moderateScale(485),
    marginTop: moderateScaleVertical(-110),
    alignItems: 'center',
    borderRadius: moderateScale(10),
    ...shadowStyle,
    overflow: 'hidden',
  },
  recentTransactionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: moderateScaleVertical(20),
    width: '90%',
  },
  viewAll: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    color: Colors.grayish,
  },
  transactionList: {
    flexDirection: 'column',
    gap: moderateScaleVertical(10),
    marginBottom: moderateScaleVertical(15),
  },
  transactionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    height: moderateScale(80),
    borderColor: Colors.brightGray,
    width: '90%',
    borderRadius: moderateScale(10),
    paddingHorizontal: moderateScale(15),
  },
  transactionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(10),
  },
  transactionIconContainer: {
    backgroundColor: Colors.lavenderBlush,
    height: moderateScale(46),
    width: moderateScale(46),
    borderRadius: moderateScale(23),
    justifyContent: 'center',
    alignItems: 'center',
  },
  transactionIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  transactionArrowIcon: {
    transform: [{ rotate: '180deg' }],
  },
  transactionDetails: {
    gap: 4,
  },
  transactionDate: {
    color: Colors.mutedPurple,
  },
  transactionId: {
    color: Colors.mutedPurple,
  },
  transactionAmount: {
    color: Colors.darkViolet,
  },
})

export default Wallet
