import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { moderateScale, textScale } from '@utils/responsiveSize';
import { goBack } from '@utils/NavigationUtils';
import { Colors, Fonts } from '@utils/Constants';
import Icon from "react-native-vector-icons/Ionicons";
import { RFValue } from 'react-native-responsive-fontsize';
import { SafeAreaView } from 'react-native-safe-area-context';

type AppBarProps = {
  left?: React.ReactNode;
  back?: boolean;
  right?: React.ReactNode;
  title?: string;
  elevation?: number;
  onCustomBackPress?: () => void;
  whiteBack?: boolean;
  fontFamily?: string;
  backgroundColor?: string;
  textColor?: string;
};

export function AppBar(props: AppBarProps) {
  const {
    left,
    right,
    back,
    title,
    onCustomBackPress,
    fontFamily,
    backgroundColor = Colors.paleGray,
    textColor = '#000000'
  } = props;

  return (
    <View style={[styles.container, { backgroundColor }]}>
      {back ? (
        <Pressable
          onPress={onCustomBackPress || goBack}
          style={styles.leftContainer}>
          {/* <BackBlackIcon /> */}
          <Icon name="chevron-back" size={RFValue(20)} color={Colors.black} />
          {/* </Pressable> */}
        </Pressable>
      ) : (
        left
      )}
      <View style={[styles.titleContainer, { marginLeft: !back ? moderateScale(25) : 0 }]}>
        <Text style={[styles.titleText, { color: textColor, fontFamily: fontFamily || Fonts.SemiBold }]}>
          {title}
        </Text>
      </View>
      <View style={styles.rightContainer}>
        {right}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: moderateScale(50),
  },
  leftContainer: {
    marginLeft: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  titleContainer: {
    flex: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: textScale(16),
    // lineHeight: textScale(18),
  },
  rightContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});