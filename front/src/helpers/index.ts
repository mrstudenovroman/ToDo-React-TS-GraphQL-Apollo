import dayjs from 'dayjs';

export function formattingDate(date: string): string {
  return dayjs(date).format('YYYY-MM-DD');
}
