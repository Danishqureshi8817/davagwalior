
import { useFocusEffect } from "@react-navigation/native";
import { moderateScaleVertical } from "@utils/responsiveSize";
import React, { useCallback, useMemo } from "react";
import { StyleSheet } from "react-native";
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
      enableOnAndroid={false}
      showsVerticalScrollIndicator={false}
      // extraScrollHeight={moderateScaleVertical(80)}
      {...props}
    />
  );
}

export default Body;
