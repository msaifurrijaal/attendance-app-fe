import dayjs from 'dayjs';

export const formatDateString = (date?: Date | string, formatString?: string) => {
  if (!date) return '-';
  return dayjs(date).format(formatString ?? 'DD/MM/YYYY');
};

export const formatDateTimeString = (date?: Date | string) => {
  if (!date) return '-';
  return dayjs(date).format('DD/MM/YYYY, HH:mm:ss');
};