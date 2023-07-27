import * as Haptics from 'expo-haptics';

import rootStore from '../rootStore';

export const useHaptics = () => {
  const { isHapticEnabled } = rootStore;
  const notification = () => {
    if (!isHapticEnabled) {
      return;
    }
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };
  return {
    /**
     * Вызывает обратную свзяь (haptic engine)
     */
    notification,
  };
};
