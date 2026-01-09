import React, { useCallback } from 'react';
import { Platform, StatusBar, StatusBarStyle, View } from 'react-native';

import { useFocusEffect } from '@react-navigation/core';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '@utils/Constants';


export interface ContainerProps {
  children?: React.ReactNode;
  backgroundColor?: string;
  statusBarBackgroundColor?: string;
  statusBarStyle?: StatusBarStyle;
  fullScreen?: boolean;
};

export function Container(props: ContainerProps) {
  // init
  const {
    children,
    backgroundColor = Colors.white,
    fullScreen,
    statusBarBackgroundColor,
    statusBarStyle = "light-content",
  } = props;
  const screenBackgroundColor = backgroundColor;
  const insets = useSafeAreaInsets();

  useFocusEffect(
    useCallback(() => {
      if (Platform.OS === 'android') {
        StatusBar.setTranslucent(fullScreen ?? false);
        StatusBar.setBackgroundColor(statusBarBackgroundColor ?? 'white');
      }
      StatusBar.setBarStyle(statusBarStyle);
    }, [fullScreen, statusBarBackgroundColor, statusBarStyle]),
  );

  // For iOS, we need to handle status bar background color separately
  if (Platform.OS === 'ios' && !fullScreen) {
    return (
      <View style={{ flex: 1, backgroundColor: statusBarBackgroundColor ?? screenBackgroundColor }}>
        <StatusBar barStyle={statusBarStyle} />
        <View style={{ height: insets.top, backgroundColor: statusBarBackgroundColor ?? screenBackgroundColor }} />
        <SafeAreaView 
          edges={['left', 'right', 'bottom']}
          style={{ 
            flex: 1, 
            backgroundColor: screenBackgroundColor,
          }}
        >
          {children}
        </SafeAreaView>
      </View>
    );
  }

  return (
    <SafeAreaView 
      edges={fullScreen ? [] : ['left', 'right', 'bottom', 'top']}
      style={{ 
        flex: 1, 
        backgroundColor: screenBackgroundColor,
      }}
    >
      <StatusBar barStyle={statusBarStyle} />
      {children}
    </SafeAreaView>
  );
}
