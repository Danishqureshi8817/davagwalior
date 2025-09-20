import React, { Fragment, useCallback } from 'react';
import { Platform, SafeAreaView, StatusBar, StatusBarStyle, View } from 'react-native';

import { useFocusEffect } from '@react-navigation/core';
import { Colors } from '@utils/Constants';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


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
  const statusBarBackgroundColorIos = statusBarBackgroundColor
  const screenBackgroundColor = backgroundColor

  const init = useSafeAreaInsets();


  useFocusEffect(
    useCallback(() => {
      if (Platform.OS === 'android') {
        StatusBar.setTranslucent(fullScreen ?? false);
        StatusBar.setBackgroundColor(statusBarBackgroundColor ?? 'white');
      }
      StatusBar.setBarStyle(statusBarStyle);
    }, [fullScreen, statusBarBackgroundColor, statusBarStyle]),
  );

  return (
    <View style={{ flex: 1, backgroundColor: screenBackgroundColor }}>
      {fullScreen ? (
        <Fragment>{children}</Fragment>
      ) : (
        <Fragment>
          <SafeAreaView  style={{ flex: 0, backgroundColor: statusBarBackgroundColorIos }} />
          <SafeAreaView style={{ flex: 1, backgroundColor: screenBackgroundColor,paddingBottom:init.bottom }}>
            {children}
          </SafeAreaView>
        </Fragment>
      )}
    </View>
  );
}
