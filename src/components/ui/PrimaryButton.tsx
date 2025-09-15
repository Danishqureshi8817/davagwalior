import { TouchableOpacity, Text, ActivityIndicator, ViewStyle, StyleSheet, View } from 'react-native';
import { Colors, Fonts } from '@utils/Constants';
import { moderateScale } from '@utils/responsiveSize';
import React, { FC } from 'react';
import LinearGradient from 'react-native-linear-gradient';

export type ButtonProps = {
  onPress?: () => void;
  buttonText: string;
  disabled?: boolean;
  loading?: boolean;
  fontSize?: number;
  textColor?: string;
  loaderColor?: string;
} & ViewStyle & { style?: ViewStyle };

const PrimaryButton: FC<ButtonProps> = (props) => {
  const {
    onPress,
    buttonText,
    disabled = false,
    loaderColor = Colors.white,
    loading = false,
    fontSize = 16,
    textColor = Colors.white,
    style,
    ...styleProps
  } = props;

  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      colors={disabled ? ['gray', 'gray'] : ['#A74AC7', '#690DAC']}
      style={[styleProps, styles.button]}>
      <TouchableOpacity activeOpacity={0.8} onPress={onPress} disabled={disabled} style={styles.contentWrapper}>
          {loading ? (
            <ActivityIndicator color={loaderColor} size="small" />
          ) : (
            <Text
              style={[
                styles.buttonText,
                { fontSize, color: textColor },
              ]}
              numberOfLines={1}
            >
              {buttonText}
            </Text>
          )}
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: moderateScale(6),
    height: moderateScale(56),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: Fonts.Medium,
    textAlign: 'center',
  },
  spinner: {
    // marginLeft: 8,
  },
  contentWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
});

export default PrimaryButton;
