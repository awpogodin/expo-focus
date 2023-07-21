import { TimerType } from '../rootStore';

// возвращает true, если число нечётное
const isOdd = (num: number): boolean => num % 2 !== 0;

export const getTimerItems = (num: number): TimerType[] => {
  const result: TimerType[] = new Array(num * 2 - 1)
    .fill('focus')
    .map((item, index) => (isOdd(index) ? 'shortBreak' : item));
  result.push('longBreak');
  return result;
};

export const getMsFromMinutes = (minutes: number): number => minutes * 60 * 1000;

/**
 * Форматирует секунды в формат min:sec
 *
 * @param {number} value - Значение в секундах
 * @returns {string} - min:sec
 */
export const formatTimerValue = (value: number): string => {
  const getTime = (v: number) => {
    const min = Math.floor((v / 60) << 0).toString();
    const sec = Math.floor(v % 60).toString();
    return { min: min.length === 1 ? `0${min}` : min, sec: sec.length === 1 ? `0${sec}` : sec };
  };

  const { min, sec } = getTime(value);
  return `${min}:${sec}`;
};
