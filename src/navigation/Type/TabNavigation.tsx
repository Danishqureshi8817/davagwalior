import React, { FC, Profiler } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeColorIcon, HomeIcon, LabTestsIcon, OrdersIcon, PhoneCallIcon, ProfileIcon, LabTestSColorIcon, OrdersColorIcon, ProfileColorIcon } from '../../components/Icons';
import { Colors, Fonts, RoutesName } from '@utils/Constants';
import Home from '@screens/Home/Home';
import Orders from '@screens/Order/Orders';
import PhoneCall from '@screens/PhoneCall/PhoneCall';
import LabTests from '@screens/LabTests/LabTests';
import Profile from '@screens/Profile/Profile';
import { Platform, Text, View } from 'react-native';
import { moderateScale, moderateScaleVertical, textScale } from '@utils/responsiveSize';

const TabNavigation: FC = () => {
  // init
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator screenOptions={{
      headerShown: false,
      tabBarShowLabel: false,
      tabBarHideOnKeyboard: true,
      lazy: true,
      tabBarStyle: {
        backgroundColor: Colors.white,
        paddingTop: Platform.OS === 'ios' ? moderateScaleVertical(10) : moderateScaleVertical(10)
      },
    }} >
      <Tab.Screen name={RoutesName.Home} component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ justifyContent: 'center', alignItems: 'center', gap: moderateScaleVertical(3), minWidth: moderateScale(60) }}>
              {focused ? <HomeColorIcon /> : <HomeIcon />}
              <Text style={{ fontSize: textScale(10), color: focused ? Colors.deepPurple : Colors.grayish, fontFamily: focused ? Fonts.SemiBold : Fonts.Medium, textAlign: 'center' }}  >Home</Text>
            </View>
          )
        }}
      />
      <Tab.Screen name={RoutesName.Orders} component={Orders}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ justifyContent: 'center', alignItems: 'center', gap: moderateScaleVertical(3), minWidth: moderateScale(60) }}>
              {focused ? <OrdersColorIcon /> : <OrdersIcon />}
              <Text style={{ fontSize: textScale(10), color: focused ? Colors.deepPurple : Colors.grayish, fontFamily: focused ? Fonts.SemiBold : Fonts.Medium, textAlign: 'center' }}  >Orders</Text>
            </View>
          )
        }} />
      <Tab.Screen name={RoutesName.PhoneCall} component={PhoneCall}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ justifyContent: 'center', alignItems: 'center', gap: moderateScaleVertical(3), minWidth: moderateScale(60) }}>
              <View style={{ marginTop: moderateScaleVertical(-45) }}>
                {focused ? <PhoneCallIcon /> : <PhoneCallIcon />}
              </View>
              <Text style={{ fontSize: textScale(10), color: focused ? Colors.deepPurple : Colors.black, fontFamily: focused ? Fonts.SemiBold : Fonts.Medium, position: 'absolute', bottom: 0, marginBottom: moderateScaleVertical(-9), textAlign: 'center' }}  >Phone</Text>
            </View>
          )
        }} />
      <Tab.Screen name={RoutesName.LabsTests} component={LabTests}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ justifyContent: 'center', alignItems: 'center', gap: moderateScaleVertical(3), minWidth: moderateScale(60) }}>
              {focused ? <LabTestSColorIcon /> : <LabTestsIcon />}
              <Text style={{ fontSize: textScale(10), color: focused ? Colors.deepPurple : Colors.grayish, fontFamily: focused ? Fonts.SemiBold : Fonts.Medium, textAlign: 'center' }}  >Lab Tests</Text>
            </View>
          )
        }} />
      <Tab.Screen name={RoutesName.Profile} component={Profile}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ justifyContent: 'center', alignItems: 'center', gap: moderateScaleVertical(3), minWidth: moderateScale(60) }}>
              {focused ? <ProfileColorIcon /> : <ProfileIcon />}
              <Text style={{ fontSize: textScale(10), color: focused ? Colors.deepPurple : Colors.grayish, fontFamily: focused ? Fonts.SemiBold : Fonts.Medium, textAlign: 'center' }}  >Profile</Text>
            </View>
          )
        }} />
    </Tab.Navigator>
  )
}

export default TabNavigation