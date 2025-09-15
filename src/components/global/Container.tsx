import React, { Fragment, useCallback } from 'react';
import { Platform, StatusBar, StatusBarStyle, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/core';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export interface ContainerProps {
  children?: React.ReactNode;
  backgroundColor?: string;
  statusBarBackgroundColor?: string;
  statusBarStyle?: StatusBarStyle;
  fullScreen?: boolean;
}

export function Container(props: ContainerProps) {
  const insets = useSafeAreaInsets();

  const {
    children,
    backgroundColor = '#fff',
    fullScreen,
    statusBarBackgroundColor = 'white',
    statusBarStyle = 'dark-content',
  } = props;

  useFocusEffect(
    useCallback(() => {
      if (Platform.OS === 'android') {
        StatusBar.setTranslucent(true);
        StatusBar.setBackgroundColor('transparent'); // let the View behind control the color
      }
      StatusBar.setBarStyle(statusBarStyle);
    }, [statusBarStyle]),
  );

  return (
    <View style={{ flex: 1, backgroundColor }}>
      {!fullScreen && (
        <View
          style={{
            height: insets.top,
            backgroundColor: statusBarBackgroundColor,
          }}
        />
      )}
      <View
        style={{
          flex: 1,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
          backgroundColor,
        }}
      >
        {children}
      </View>
    </View>
  );
}
