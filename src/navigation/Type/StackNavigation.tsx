import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { FC } from 'react'
import OrderSuccess from '@screens/Order/OrderSuccess';
import Splash from '@screens/Auth/Splash';
import Login from '@screens/Auth/Login';
import OtpVerify from '@screens/Auth/OtpVerify';
import TabNavigation from './TabNavigation';
import ProductListing from '@screens/Product/ProductListing';
import ProductDetails from '@screens/Product/ProductDetails';
import Cart from '@screens/Cart/Cart';
import Address from '@screens/Address/Address';
import AddAddress from '@screens/Address/AddAddress';
import OrderDetails from '@screens/Order/OrderDetails';
import ReferAndEarn from '@screens/ReferAndEarn/ReferAndEarn';
import EditProfile from '@screens/Profile/EditProfile';
import Wallet from '@screens/Wallet/Wallet';
import ViewAllWalletTransactions from '@screens/Wallet/ViewAllWalletTransactions';
import { RoutesName } from '@utils/Constants';

const StackNavigation:FC = () => {
  // init
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={RoutesName.Splash}>
      <Stack.Screen name={RoutesName.Splash} component={Splash} />
      <Stack.Screen name={RoutesName.Login} component={Login} />
      <Stack.Screen name={RoutesName.OtpVerify} component={OtpVerify} />
      <Stack.Screen name={RoutesName.TabNavigation} component={TabNavigation} />
      <Stack.Screen name={RoutesName.ProductListing} component={ProductListing} />
      <Stack.Screen name={RoutesName.ProductDetails} component={ProductDetails} />
      <Stack.Screen name={RoutesName.Cart} component={Cart} />
      <Stack.Screen name={RoutesName.Address} component={Address} />
      <Stack.Screen name={RoutesName.AddAddress} component={AddAddress} />
      <Stack.Screen name={RoutesName.OrderSuccess} component={OrderSuccess} />
      <Stack.Screen name={RoutesName.OrderDetails} component={OrderDetails} />
      <Stack.Screen name={RoutesName.ReferAndEarn} component={ReferAndEarn} />
      <Stack.Screen name={RoutesName.EditProfile} component={EditProfile} />
      <Stack.Screen name={RoutesName.Wallet} component={Wallet} />
      <Stack.Screen name={RoutesName.ViewAllWalletTransactions} component={ViewAllWalletTransactions} />



    </Stack.Navigator>
  )
}

export default StackNavigation