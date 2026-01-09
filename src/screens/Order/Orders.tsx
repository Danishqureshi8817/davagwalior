import { useState } from "react";
import {
  View,
  FlatList,
  ImageBackground,
  Pressable,
  Text,
  ActivityIndicator,
  StyleSheet,
  RefreshControl,
} from "react-native";
import { LinearGradient } from "react-native-linear-gradient";
import { format } from "date-fns";
import useGetUserOrders from "@hooks/order/get-user-orders";
import { useAuthStore } from "@state/authStore";
import { LessIcon, OrderCardPastIcon } from "@components/Icons";
import { goBack, navigate } from "@utils/NavigationUtils";
import { Colors, Fonts, RoutesName } from "@utils/Constants";
import { Container } from "@components/global/Container";
import { moderateScale, moderateScaleVertical } from "@utils/responsiveSize";
import CustomText from "@components/global/CustomText";
import { RFValue } from "react-native-responsive-fontsize";
import OrderCardItem from "@components/Order/OrderCardItem";
import { AppBar } from "@components/global/AppBar";

const Orders = () => {

  // init
  const { user } = useAuthStore()
  const [selectedOrderViewOption, setSelectedOrderViewOption] = useState<string>('O');

  // api
  const { data, isLoading, isRefetching, refetch, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetUserOrders({ userId: user?.userUniqueId, status: selectedOrderViewOption });

  // Flatten all pages data
  const allOrders = data?.pages?.flatMap(page => page?.data?.result?.orders || []) || []

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }


  const OrderCategory = () => {
    return (
      <FlatList
        data={['In-Progress', 'Delivered', 'Cancelled', 'In-Trans']}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryList}
        renderItem={({ item }) => {
          const title = item === 'In-Progress' ? 'O' : item === 'Delivered' ? 'DL' : item === 'Cancelled' ? 'C' : 'IT';
          const isSelected = selectedOrderViewOption === title;
          return (
            <Pressable onPress={() => setSelectedOrderViewOption(title)}>
              <LinearGradient
                colors={isSelected ? ['#A74AC7', '#690DAC'] : ['transparent', 'transparent']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[styles.categoryItem, { borderWidth: isSelected ? 0 : 1 }]}
              >
                <CustomText variant="h7" fontFamily={Fonts.Medium} style={[{ color: isSelected ? Colors.white : Colors.mutedPurple, paddingHorizontal: moderateScale(15) }]}>{item}</CustomText>
              </LinearGradient>
            </Pressable>
          );
        }}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  };

  // const Header = () => {
  //   return (
  //     <ImageBackground source={require('@assets/images/topBg.png')} style={styles.headerBg}>
  //       <View style={styles.headerRow}>
  //         <Pressable onPress={() => goBack()}>
  //           <LessIcon />
  //         </Pressable>
  //         <Text style={styles.headerTitle}>My Orders</Text>
  //         <View />
  //       </View>
  //     </ImageBackground>
  //   );
  // };

  if (isLoading) {
    return (
      <Container statusBarBackgroundColor={Colors.paleGray} statusBarStyle='dark-content'>
        <AppBar back title='My Orders' />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size={'large'} color={Colors.Purple} />
        </View>
      </Container>
    )
  }

  return (
    <Container statusBarBackgroundColor={Colors.paleGray} statusBarStyle="dark-content">
      {/* <Header /> */}
      <AppBar back title='My Orders' />

      <View style={{ height: '7%' }} >
        <OrderCategory />
      </View>
      <FlatList
        data={allOrders}
        renderItem={({ item }) => <OrderCardItem item={item} />}
        keyExtractor={(item) => item?.id?.toString()}
        contentContainerStyle={styles.listContainer}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={() => {
          if (isFetchingNextPage) {
            return (
              <View style={{ height: moderateScale(50), justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="small" color={Colors.Purple} />
              </View>
            )
          }
          return null
        }}
        refreshControl={<RefreshControl
          refreshing={isRefetching}
          onRefresh={async () => await refetch()}
          colors={[Colors.Purple, Colors.Purple]}
          tintColor={Colors.Purple}
        />}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            {(isLoading) ? <ActivityIndicator size="large" color={Colors.deepPurple} /> : <Text style={styles.noOrders}>No Orders Found</Text>}
          </View>
        )}
        showsVerticalScrollIndicator={false}
      />
    </Container>
  );
};

export default Orders;

const styles = StyleSheet.create({
  headerBg: {
    height: moderateScale(110),
    paddingHorizontal: moderateScale(20),
    justifyContent: 'flex-end',
    paddingBottom: moderateScaleVertical(10),
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: moderateScaleVertical(40),
  },
  headerTitle: {
    fontFamily: 'Poppins-SemiBold',
    color: Colors.black,
    fontSize: RFValue(16),
  },
  categoryList: {
    gap: moderateScale(10),
    marginVertical: moderateScaleVertical(10),
    paddingHorizontal: moderateScale(15),
    height: moderateScale(40),
    alignItems: 'center',
  },
  categoryItem: {
    height: moderateScale(30),
    borderRadius: moderateScale(15),
    borderColor: Colors.brightGray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContainer: {
    gap: moderateScaleVertical(15),
    flexGrow: 1,
    paddingVertical: moderateScaleVertical(15),
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noOrders: {
    fontFamily: 'Poppins-SemiBold',
    color: Colors.black,
    fontSize: RFValue(16),
  },
});
