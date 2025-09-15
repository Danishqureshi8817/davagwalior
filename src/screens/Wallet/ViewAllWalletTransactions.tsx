import { FlatList, View, StyleSheet, ActivityIndicator, RefreshControl } from 'react-native';
import { format } from 'date-fns';
import useGetWalletTransactions from '@hooks/wallet/get-wallet-transaction';
import { useAuthStore } from '@state/authStore';
import { Colors, Fonts } from '@utils/Constants';
import { Container } from '@components/global/Container';
import { AppBar } from '@components/global/AppBar';
import { UpArrowIconPurple } from '@components/Icons';
import CustomText from '@components/global/CustomText';
import { moderateScale, moderateScaleVertical } from '@utils/responsiveSize';


interface WALLET_CARD {
  id: number;
  userId: number;
  userName: string;
  amount: number;
  type: string;
  description: string;
  createdAt: string;
  source: string;
}

const ViewAllWalletTransactions = () => {

  // init
  const { user } = useAuthStore()

  // api
  const { data, isLoading, refetch, isRefetching } = useGetWalletTransactions({ userId: user?.userUniqueId });

  if (isLoading) {
    return (
      <Container statusBarBackgroundColor={Colors.paleGray} statusBarStyle='dark-content'>
        <AppBar back title={'Wallet Transactions'} />
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={Colors.Purple} />
        </View>
      </Container>
    );
  }

  return (
    <Container statusBarBackgroundColor={Colors.paleGray} statusBarStyle='dark-content'>
      <AppBar back title={'Wallet Transactions'} />

      <FlatList
        data={data?.data?.result}
        renderItem={({ item }: { item: WALLET_CARD }) => {
          const date = new Date(item?.createdAt);
          return (
            <View key={item?.id?.toString()} style={styles.card}>
              <View style={styles.cardLeft}>
                <View style={styles.iconCircle}>
                  {item.type === 'DEBIT' ? (
                    <UpArrowIconPurple style={{ transform: [{ rotate: '180deg' }] }} />
                  ) : (
                    <UpArrowIconPurple />
                  )}
                </View>

                <View style={styles.cardText}>
                  <CustomText variant='h7' fontFamily={Fonts.Medium} numberOfLine={1}>{item?.type}</CustomText>
                  <CustomText variant='h8' fontFamily={Fonts.Medium} style={styles.dateText}>
                    {format(date, 'dd MMM yyyy')}, {format(date, 'hh:mm a')}
                  </CustomText>
                  <CustomText variant='h8' fontFamily={Fonts.Medium} style={styles.dateText}>ID : {item?.id}</CustomText>
                </View>
              </View>

              <CustomText variant='h6' fontFamily={Fonts.SemiBold} style={styles.amountText}>₹ {item?.amount}</CustomText>
            </View>
          );
        }}
        refreshControl={<RefreshControl
          refreshing={isRefetching}
          onRefresh={async () => await refetch()}
          colors={[Colors.Purple, Colors.Purple]}
          tintColor={Colors.Purple}
        />}
        keyExtractor={(item: WALLET_CARD) => item?.id?.toString()}
        contentContainerStyle={styles.flatListContent}
        showsVerticalScrollIndicator={false}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatListContent: {
    gap: moderateScaleVertical(10),
    alignItems: 'center',
    paddingVertical: moderateScaleVertical(15),
  },
  card: {
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
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(10),
  },
  iconCircle: {
    backgroundColor: Colors.lavenderBlush,
    height: moderateScale(46),
    width: moderateScale(46),
    borderRadius: moderateScale(23),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  cardText: {
    gap: 4,
  },
  dateText: {
    color: Colors.mutedPurple,
  },
  amountText: {
    color: Colors.darkViolet,
  },
});

export default ViewAllWalletTransactions;
