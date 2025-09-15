import CustomText from '@components/global/CustomText';
import { Greater19Icon } from '@components/Icons';
import { Colors, Fonts } from '@utils/Constants';
import { moderateScale, moderateScaleVertical } from '@utils/responsiveSize';
import React from 'react';
import { View, Pressable, Image, ImageBackground, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';


const healthPackages = [
  {
    id: 0,
    title: 'Full Body Checkup',
    image: require('@assets/images/healthPackage1.png'),
  },
  {
    id: 1,
    title: 'Senior Citizen',
    image: require('@assets/images/healthPackage2.png'),
  },
  {
    id: 2,
    title: 'Women’s Health',
    image: require('@assets/images/healthPackage3.png'),
  },
];

const HealthPackages = ({ selectedHealthPackage = 0, shadowStyle = {} }) => {
  return (
    <View style={{ marginBottom: moderateScaleVertical(20) }}>
      <View style={styles.headerRow}>
        <CustomText variant='h6' fontFamily={Fonts.SemiBold} style={styles.title}>Health Packages</CustomText>
        <Pressable style={styles.viewAllRow}>
          <CustomText variant='h7' fontFamily={Fonts.SemiBold} style={styles.viewAll}>View All</CustomText>
          <Greater19Icon />
        </Pressable>
      </View>

      <View style={styles.packageRow}>
        {healthPackages.map((pkg) => {
          const isSelected = selectedHealthPackage === pkg.id;
          return (
            <LinearGradient
              key={pkg.id}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              colors={isSelected ? ['#C9BFFF', '#E9DEF4'] : [Colors.white, Colors.white]}
              style={[styles.packageCard, shadowStyle]}
            >       
              <View style={styles.cardTopRow}>
                <ImageBackground
                  source={require('@assets/images/healthPackageItembg.png')}
                  style={styles.iconBg}
                  imageStyle={styles.iconBgImage}
                >
                  <Image source={pkg.image} style={styles.iconImage} resizeMode="contain" />
                </ImageBackground>
                <Image
                  source={require('@assets/images/circleGo.png')}
                  style={[styles.goIcon, { tintColor: isSelected ? Colors.white : Colors.brightGray }]}
                  resizeMode="contain"
                />
              </View>
              <CustomText variant='h8' fontFamily={Fonts.Medium} style={styles.cardTitle} numberOfLine={2}>{pkg.title}</CustomText>
            </LinearGradient>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: moderateScale(20),
    marginVertical: moderateScaleVertical(30),
  },
  title: {
    color: Colors.black,
  },
  viewAllRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAll: {
    color: Colors.grayish,
    marginRight: moderateScale(4),
  },
  packageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(15),
    marginHorizontal: moderateScale(20),
  },
  packageCard: {
    flex: 1,
    height: moderateScale(115),
    borderRadius: moderateScale(15),
    gap: moderateScale(25),
    overflow: 'hidden',
    borderWidth:0.6,
    borderColor:'#F6EDF9'

  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(10),
    paddingTop: moderateScaleVertical(10),
  },
  iconBg: {
    height: moderateScale(45),
    width: moderateScale(45),
    borderRadius: moderateScale(22),
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconBgImage: {
    borderRadius: moderateScale(22),
  },
  iconImage: {
    height: moderateScale(25),
    width: moderateScale(25),
  },
  goIcon: {
    height: moderateScale(22),
    width: moderateScale(22),
    alignSelf: 'flex-start',
  },
  cardTitle: {
    color: Colors.black,
    flex:1,
    paddingHorizontal:moderateScale(10),
    paddingBottom:moderateScaleVertical(3),
    
    
  },
});

export default HealthPackages;
