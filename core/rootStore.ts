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

  focusDuration: number = 1; // 25

  shortBreakDuration: number = 1; // 5
  longBreakDuration: number = 1; // 20

  focusLoops: number = 2; // 4

  currentTimerIndex: number = 0;

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
      ],
    });
  }

  get timerItems(): TimerType[] {
    return getTimerItems(this.focusLoops);
  }

  get timerDuration(): number {
    const type = getTimerItems(this.focusLoops)[this.currentTimerIndex];
    if (type === 'shortBreak') {
      return this.shortBreakDuration;
    }
    if (type === 'longBreak') {
      return this.longBreakDuration;
    }
    return this.focusDuration;
  }

  get currentTimerItem(): TimerType {
    return getTimerItems(this.focusLoops)[this.currentTimerIndex] ?? 'focus';
  }

  nextTimerItem = () => {
    if (this.currentTimerIndex === getTimerItems(this.focusLoops).length - 1) {
      this.currentTimerIndex = 0;
      return;
    }
    this.currentTimerIndex++;
  };

  resetTimerIndex = () => {
    this.currentTimerIndex = 0;
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
