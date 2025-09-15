import { View, Text } from 'react-native'
import React, { FC } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from './Type/StackNavigation';
import { navigationRef } from '@utils/NavigationUtils';


const AppNavigator:FC = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <StackNavigation />
    </NavigationContainer>
  )
}

export default AppNavigator