import { useEffect, useState } from 'react';
import {
  Easing,
  cancelAnimation,
  runOnJS,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { withPause } from 'react-native-redash';

import { getMsFromMinutes } from '../helpers/timer';

type Timer = {
  /**
   * Управление таймером (play - старт/стоп, reset - сброс)
   */
  controls: { play: (value: boolean) => void; reset: () => void };
  /**
   * Запущен ли таймер
   */
  isPlay: boolean;
  /**
   * Был ли запущен таймер
   */
  isStarted: boolean;
  /**
   * Оставшееся время в секундах
   */
  elapsedTime: number;
};

/**
 * Хук таймера
 *
 * @param {number} duration - продолжительность таймера в минутах
 * @param {() => void} onTimeOver - callback, который будет вызван по истечению времени
 * @returns {Timer}
 */
export const useTimer = (duration: number, onTimeOver: () => void): Timer => {
  // Начальное значение таймера в мс
  const [initialTimer, setInitialTimer] = useState(getMsFromMinutes(duration));

  // запущен ли таймер
  const [isPlay, setIsPlay] = useState(false);
  // был ли запущен таймер
  const [isStarted, setIsStarted] = useState(false);

  // Текущее оставшееся время в секундах
  const [elapsedTime, setElapsedTime] = useState(initialTimer / 1000);

  const animElapsedTime = useSharedValue(initialTimer);
  const animPaused = useSharedValue(false);

  const controls = {
    play: (value: boolean) => {
      setIsPlay(value);
      animPaused.value = !value;
      if (value && !isStarted) {
        startAnimation();
        setIsStarted(true);
      }
    },
    reset: () => {
      animPaused.value = true;
      cancelAnimation(animElapsedTime);
      setIsPlay(false);
      setIsStarted(false);
      animElapsedTime.value = initialTimer;
    },
  };

  const updateElapsedTime = (value: number) => {
    setElapsedTime(value);
  };

  useDerivedValue(() => {
    // Останавливаем таймер, если время вышло
    if (animElapsedTime.value === 0) {
      runOnJS(controls.reset)();
      runOnJS(onTimeOver)();
    }
    runOnJS(updateElapsedTime)(Math.floor(animElapsedTime.value / 1000));
  });

  const startAnimation = () => {
    animElapsedTime.value = withPause(
      withRepeat(
        withTiming(0, {
          duration: initialTimer,
          easing: Easing.linear,
        }),
        1
      ),
      animPaused
    );
  };

  useEffect(() => {
    controls.reset();
  }, [initialTimer]);

  useEffect(() => {
    setInitialTimer(getMsFromMinutes(duration));
  }, [duration]);

  useEffect(() => {
    return () => cancelAnimation(animElapsedTime);
  }, []);

  return {
    controls,
    isPlay,
    isStarted,

    elapsedTime,
  };
};
