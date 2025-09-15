import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import { moderateScale, moderateScaleVertical } from '../../utils/responsiveSize'
import { Container } from '@components/global/Container';
import { AppBar } from '@components/global/AppBar';
import { Colors, RoutesName } from '@utils/Constants';
import PrimaryButton from '@components/ui/PrimaryButton';
import { navigate } from '@utils/NavigationUtils';
import { queryClient } from '@utils/react-query-config';
import CenterModalLoader from '@components/ui/CenterModalLoader';
import addressService from '@services/address-service';
import useGetUserAddresses from '@hooks/address/get-user-addresses';
import useDeleteUserAddress from '@hooks/address/delete-user-address';
import { useAuthStore } from '@state/authStore';
import AddressCardItem from '@components/Address/AddressCardItem';

interface ADDRESS_CARD_TYPE {
  id: number;
  userId: number;
  userName: string;
  userMobile: string;
  Address: string;
  landmark: string;
  pincode: number;
  cityId: number;
  cityName: string;
  Country: string;
  stateId: number;
  stateName: string;
  createdAt: string;
}

const Address = () => {

  // init
  const { user, setUser } = useAuthStore()

  // apis
  const { data, isLoading, refetch, isRefetching } = useGetUserAddresses({ userId: user?.userUniqueId })
  const useDeleteUserAddressMutation = useDeleteUserAddress()

  const onHandleDeleteAddress = (id: number) => {
    if (user?.saveAddressLocal?.id === id) {
      setUser({
        ...user,
        saveAddressLocal: {}
      })
    }
    useDeleteUserAddressMutation.mutate({ userId: user?.userUniqueId, addressId: id }, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [addressService.queryKeys.getUserAddresses + Number(user?.userUniqueId)]
        })
      }
    })
  }

  if (isLoading) {
    return (
      <Container statusBarBackgroundColor={Colors.paleGray} statusBarStyle='dark-content'>
        <AppBar back title='Address Listing' />
        <View style={styles.loaderContainer}>
          <ActivityIndicator size={'large'} color={Colors.Purple} />
        </View>
      </Container>
    )
  }

  return (
    <Container statusBarBackgroundColor={Colors.paleGray} statusBarStyle='dark-content'>
      <AppBar back title={'Address Listing'} />
      <FlatList
        data={data?.data?.result as ADDRESS_CARD_TYPE[] ?? []}
        renderItem={({ item }: { item: ADDRESS_CARD_TYPE }) => (
          <AddressCardItem item={item} onDeleteAddress={(id) => onHandleDeleteAddress(id)} />
        )}
        keyExtractor={(item: ADDRESS_CARD_TYPE) => item?.id?.toString()}
        refreshControl={<RefreshControl
          refreshing={isRefetching}
          onRefresh={async () => await refetch()}
          colors={[Colors.Purple, Colors.Purple]}
          tintColor={Colors.Purple}

        />}
        contentContainerStyle={styles.flatListContainer}
      />
      <PrimaryButton
        onPress={() => navigate(RoutesName.AddAddress, { editData: '' })}
        buttonText='Add New Address'
        borderRadius={moderateScale(10)}
        marginVertical={moderateScaleVertical(20)}
        marginHorizontal={moderateScale(10)}
      />
      <CenterModalLoader loading={useDeleteUserAddressMutation.isPending} />
    </Container>
  )
}

export default Address

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cardContainer: {
    borderWidth: 1,
    borderColor: Colors.brightGray,
    borderRadius: moderateScale(10),
    paddingVertical: moderateScaleVertical(20),
    paddingHorizontal: moderateScale(20)
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  leftRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(15)
  },
  radioOuter: {
    borderColor: Colors.darkViolet,
    borderWidth: 2,
    height: moderateScale(24),
    width: moderateScale(24),
    borderRadius: moderateScale(12),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start'
  },
  radioInner: {
    height: moderateScale(16),
    width: moderateScale(16),
    borderRadius: moderateScale(8),
    backgroundColor: Colors.white
  },
  radioActive: {
    backgroundColor: Colors.darkViolet
  },
  infoTextContainer: {
    gap: moderateScale(6)
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(15),
    alignSelf: 'flex-start'
  },
  flatListContainer: {
    marginHorizontal: moderateScale(10),
    gap: moderateScaleVertical(20),
    marginTop: moderateScaleVertical(10),
    paddingBottom: moderateScaleVertical(20)
  }
});
