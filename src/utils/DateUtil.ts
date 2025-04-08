import dayjs from 'dayjs';

/**
 * Date 객체를 YYYY.MM.DD 형태로 반환
 * @param date
 * @param format - YYYY.MM.DD
 * @returns YYYY.MM.DD 형태의 문자열
 */
export function formatDate(date: Date, format: string = 'YYYY.MM.DD'): string {
  return dayjs(date).format(format);
}

