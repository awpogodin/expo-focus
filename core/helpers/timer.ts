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
