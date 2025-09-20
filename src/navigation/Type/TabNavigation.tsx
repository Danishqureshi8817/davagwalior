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
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

const TabNavigation: FC = () => {
  // init
  const Tab = createBottomTabNavigator();
  const insets = useSafeAreaInsets();

  return (
    // <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }} edges={['bottom']}>
    <Tab.Navigator screenOptions={{
      headerShown: false,
      // tabBarShowLabel: false,
      tabBarHideOnKeyboard: true,
      lazy: true,
      tabBarStyle: {
        backgroundColor: Colors.white,
        height: Platform.OS === 'ios' ? moderateScaleVertical(80) : moderateScaleVertical(60),
        // marginBottom: insets.bottom ? insets.bottom : 0,
        // paddingTop: Platform.OS === 'ios' ? moderateScaleVertical(10) : moderateScaleVertical(10)
      },
      // tabBarLabelStyle: {
      //   position: 'absolute',
      //   top: moderateScaleVertical(35)
      // }

    }} >
      <Tab.Screen name={RoutesName.Home} component={Home}
        options={{
          tabBarIcon: ({ focused }) => (<>{focused ? <HomeColorIcon /> : <HomeIcon />}</>),
          tabBarLabel: ({ focused }) => (<Text style={{ fontSize: textScale(10), color: focused ? Colors.deepPurple : Colors.grayish, fontFamily: focused ? Fonts.SemiBold : Fonts.Medium, position: 'absolute', top: moderateScaleVertical(34) }} >Home</Text>)
        }}
      />
      <Tab.Screen name={RoutesName.Orders} component={Orders}
        options={{
          tabBarIcon: ({ focused }) => (<>{focused ? <OrdersColorIcon /> : <OrdersIcon />}</>),
          tabBarLabel: ({ focused }) => (<Text style={{ fontSize: textScale(10), color: focused ? Colors.deepPurple : Colors.grayish, fontFamily: focused ? Fonts.SemiBold : Fonts.Medium, position: 'absolute', top: moderateScaleVertical(34) }}  >Orders</Text>),
        }}
      />
      <Tab.Screen name={RoutesName.PhoneCall} component={PhoneCall}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ marginTop: moderateScaleVertical(-25) }}>
              {focused ? <PhoneCallIcon /> : <PhoneCallIcon />}
            </View>
          ),
          tabBarLabel: ({ focused }) => (<Text style={{ fontSize: textScale(10), color: focused ? Colors.deepPurple : Colors.grayish, fontFamily: focused ? Fonts.SemiBold : Fonts.Medium, position: 'absolute', top: moderateScaleVertical(34) }}  >Phone</Text>),
        }}
      />
      <Tab.Screen name={RoutesName.LabsTests} component={LabTests}
        options={{
          tabBarIcon: ({ focused }) => (<>{focused ? <LabTestSColorIcon /> : <LabTestsIcon />}</>),
          tabBarLabel: ({ focused }) => (<Text style={{ fontSize: textScale(10), color: focused ? Colors.deepPurple : Colors.grayish, fontFamily: focused ? Fonts.SemiBold : Fonts.Medium, position: 'absolute', top: moderateScaleVertical(34) }}  >Lab Tests</Text>),
        }}
      />
      <Tab.Screen name={RoutesName.Profile} component={Profile}
        options={{
          tabBarIcon: ({ focused }) => (<>{focused ? <ProfileColorIcon /> : <ProfileIcon />}</>),
          tabBarLabel: ({ focused }) => (<Text style={{ fontSize: textScale(10), color: focused ? Colors.deepPurple : Colors.grayish, fontFamily: focused ? Fonts.SemiBold : Fonts.Medium, position: 'absolute', top: moderateScaleVertical(34) }}  >Profile</Text>),
        }}
      />
    </Tab.Navigator>
    // </SafeAreaView>
  )
}

export default TabNavigation