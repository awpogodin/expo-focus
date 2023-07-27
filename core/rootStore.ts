import { makeAutoObservable } from 'mobx';
import { makePersistable, configurePersistable } from 'mobx-persist-store';

import { getTimerItems } from './helpers/timer';
import { storage } from './storage';

configurePersistable({
  debugMode: true,
  storage: {
    setItem: (key, data) => storage.set(key, data),
    getItem: (key) => storage.getString(key) ?? null,
    removeItem: (key) => storage.delete(key),
  },
});

type UserTheme = 'light' | 'dark' | 'auto';

export type TimerType = 'focus' | 'shortBreak' | 'longBreak';
class RootStore {
  userTheme: UserTheme = 'auto';

  focusDuration: number = 0.1; // 25

  shortBreakDuration: number = 0.2; // 5
  longBreakDuration: number = 0.3; // 20

  focusLoops: number = 2; // 4

  /**
   * Был ли показан онбординг
   */
  isOnboardingAlreadyShown: boolean = false;

  /**
   * Включена ли вибрация
   */
  isHapticEnabled: boolean = true;

  constructor() {
    makeAutoObservable(this);

    makePersistable(this, {
      name: 'RootStore',
      properties: [
        'userTheme',
        'focusDuration',
        'shortBreakDuration',
        'longBreakDuration',
        'focusLoops',
        'isOnboardingAlreadyShown',
        'isHapticEnabled',
      ],
    });
  }

  setIsOnboardingAlreadyShown = (value: boolean) => {
    this.isOnboardingAlreadyShown = value;
  };

  setIsHapticEnabled = (value: boolean) => {
    this.isHapticEnabled = value;
  };

  setUserTheme = (theme: UserTheme) => {
    this.userTheme = theme;
  };

  setFocusDuration = (value: number) => {
    this.focusDuration = value;
  };

  setShortBreakDuration = (value: number) => {
    this.shortBreakDuration = value;
  };

  setLongBreakDuration = (value: number) => {
    this.longBreakDuration = value;
  };

  setFocusLoops = (value: number) => {
    this.focusLoops = value;
  };
}

const rootStore = new RootStore();

export default rootStore;
