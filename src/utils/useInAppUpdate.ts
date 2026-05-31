import React, { useEffect } from 'react';
import { Platform, Alert, Linking } from 'react-native';
import InAppUpdates, { IAUUpdateKind, StartUpdateOptions } from 'sp-react-native-in-app-updates';
import DeviceInfo from 'react-native-device-info';
import axios from 'axios';

// iOS App Store Bundle ID - Update this with your actual bundle identifier
const IOS_BUNDLE_ID = 'com.sushain.marketplace';

/**
 * Compare two version strings
 * @param currentVersion - Current app version (e.g., "1.0.0")
 * @param storeVersion - App Store version (e.g., "1.0.1")
 * @returns true if storeVersion is greater than currentVersion
 */
const compareVersions = (currentVersion: string, storeVersion: string): boolean => {
  const current = currentVersion.split('.')?.map(Number);
  const store = storeVersion.split('.')?.map(Number);
  
  for (let i = 0; i < Math.max(current.length, store.length); i++) {
    const currentPart = current[i] || 0;
    const storePart = store[i] || 0;
    
    if (storePart > currentPart) return true;
    if (storePart < currentPart) return false;
  }
  
  return false;
};

/**
 * Check iOS App Store for updates
 */
const checkIOSUpdate = async () => {
  try {
    const currentVersion = DeviceInfo.getVersion();
    
    // Query iTunes Search API for app information
    const response = await axios.get(
      `https://itunes.apple.com/lookup?bundleId=${IOS_BUNDLE_ID}`,
      { timeout: 10000 }
    );

    if (response.data?.results && response.data.results.length > 0) {
      const appInfo = response.data.results[0];
      const storeVersion = appInfo.version;
      const appStoreUrl = appInfo.trackViewUrl;

      if (compareVersions(currentVersion, storeVersion)) {
        Alert.alert(
          'Update Available',
          `A new version (${storeVersion}) is available on the App Store. Please update to continue using the app.`,
          [
            {
              text: 'Update Now',
              onPress: () => {
                if (appStoreUrl) {
                  Linking.openURL(appStoreUrl);
                }
              },
            },
            {
              text: 'Later',
              style: 'cancel',
            },
          ],
          { cancelable: false }
        );
      }
    }
  } catch (error) {
    console.log('iOS Update Check Error: ', error);
    // Silently fail - don't interrupt user experience
  }
};

/**
 * Check Android Play Store for updates
 */
const checkAndroidUpdate = async () => {
  try {
    const inAppUpdates = new InAppUpdates(false); // false = not debug mode

    // Check for available updates on Google Play
    const result = await inAppUpdates.checkNeedsUpdate();
    
    if (result.shouldUpdate) {
      const updateOptions: StartUpdateOptions = {
        updateType: IAUUpdateKind.IMMEDIATE, // or FLEXIBLE
      };
      inAppUpdates.startUpdate(updateOptions);
    }
  } catch (err) {
    console.log('Android In-App Update Error: ', err);
    // Silently fail - don't interrupt user experience
  }
};

const useInAppUpdate = () => {
  useEffect(() => {
    // Check for updates based on platform
    if (Platform.OS === 'android') {
      checkAndroidUpdate();
    } else if (Platform.OS === 'ios') {
      // checkIOSUpdate();
    }
  }, []);
};

export default useInAppUpdate;
