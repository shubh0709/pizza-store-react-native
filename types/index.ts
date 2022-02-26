import { Platform } from 'react-native';

 const ANDROID = Platform.OS === 'android';
 const IOS = Platform.OS === 'ios';
 const WEB = Platform.OS === 'web';

export const OS = {ANDROID, IOS, WEB};