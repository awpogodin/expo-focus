import { format, parse } from 'date-fns';

const DATE_FORMAT_1 = 'd.MM.yyyy';

export const formatDate = (date: Date | number) => format(date, DATE_FORMAT_1);

export const parseDate = (date: string) => parse(date, DATE_FORMAT_1, new Date());
