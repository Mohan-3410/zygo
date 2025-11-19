import {useCallback} from 'react';
import {Platform, Vibration} from 'react-native';

export type HapticType = 'light' | 'medium' | 'heavy' | 'success' | 'error';

export const useHaptics = () => {
  const trigger = useCallback((type: HapticType = 'light') => {
    if (Platform.OS === 'ios') {
      // iOS haptic feedback patterns
      const patterns: Record<HapticType, number[]> = {
        light: [10],
        medium: [20],
        heavy: [30],
        success: [10, 50, 10],
        error: [20, 100, 20],
      };
      Vibration.vibrate(patterns[type]);
    } else if (Platform.OS === 'android') {
      // Android haptic feedback patterns
      const patterns: Record<HapticType, number[]> = {
        light: [0, 10],
        medium: [0, 20],
        heavy: [0, 30],
        success: [0, 10, 50, 10],
        error: [0, 20, 100, 20],
      };
      Vibration.vibrate(patterns[type]);
    }
  }, []);

  return {trigger};
};
