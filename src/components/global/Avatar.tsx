import { Fonts } from '@utils/Constants';
import { moderateScale } from '@utils/responsiveSize';
import React from 'react';
import { View, Text, Image, StyleSheet, ImageStyle, ViewStyle, TextStyle } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

interface AvatarProps {
  imageUrl?: string;
  fallbackText: string; // full name like "danish qureshi"
  size?: number;
  bgColor?: string;
  textColor?: string;
  textStyle?: TextStyle;
  containerStyle?: ViewStyle;
  imageStyle?: ImageStyle;
}

const Avatar: React.FC<AvatarProps> = ({
  imageUrl,
  fallbackText,
  size = moderateScale(60),
  bgColor = '#FFC107',
  textColor = '#fff',
  textStyle,
  containerStyle,
  imageStyle,
}) => {
  const getInitials = (name: string) => {
    if (!name) return '';
    const words = name.trim().split(' ');
    const initials = words.slice(0, 2).map(word => word[0]?.toUpperCase());
    return initials.join('');
  };

  return (
    <View
      style={[
        styles.container,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: bgColor,
        },
        containerStyle,
      ]}
    >
      {imageUrl ? (
        <Image
          source={{ uri: imageUrl }}
          style={[
            {
              width: '100%',
              height: '100%',
              borderRadius: size / 2,
            },
            imageStyle,
          ]}
          resizeMode="cover"
        />
      ) : (
        <Text
          style={[
            styles.fallbackText,
            {
              color: textColor,
              fontSize: RFValue(10),
            },
            textStyle,
          ]}
        >
          {getInitials(fallbackText)}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  fallbackText: {
    fontFamily:Fonts.Medium
  },
});

export default Avatar;
