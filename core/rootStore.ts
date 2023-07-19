import { makeAutoObservable } from 'mobx';
import { makePersistable, configurePersistable } from 'mobx-persist-store';

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

class RootStore {
  userTheme: UserTheme = 'auto';

  focusDuration: number = 25;

  shortBreakDuration: number = 5;
  longBreakDuration: number = 20;

  focusLoops: number = 4;

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
