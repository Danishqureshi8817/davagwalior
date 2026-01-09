
import { moderateScale } from "@utils/responsiveSize";
import React, { useMemo } from "react";
import { Platform, StyleSheet } from "react-native";
import {
  KeyboardAwareScrollView,
  KeyboardAwareScrollViewProps,
} from "react-native-keyboard-aware-scroll-view";

interface BodyProps extends KeyboardAwareScrollViewProps {
  backgroundColor?: string;
  children?: any;
}

function Body(props: BodyProps) {
  const { style, backgroundColor } = props;

  const styles = useMemo(
    () =>
      StyleSheet.create({
        containerStyle: {
          flexGrow: 1,
          backgroundColor: backgroundColor ?? "transparent",
        },
      }),
    [backgroundColor]
  );

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={[styles.containerStyle, style]}
      keyboardShouldPersistTaps={"handled"}
      enableOnAndroid={true}
      showsVerticalScrollIndicator={false}
      nestedScrollEnabled={true}
      showsHorizontalScrollIndicator={false}
      extraScrollHeight={Platform.OS === 'android' ? moderateScale(150) : moderateScale(80)}
      enableAutomaticScroll={true}
      enableResetScrollToCoords={Platform.OS === 'ios'}
      keyboardOpeningTime={Platform.OS === 'ios' ? 250 : 0}
      {...props}
    />
  );
}

export default Body;
