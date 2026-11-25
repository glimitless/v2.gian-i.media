import type { EightDigitDate } from '@/types/archive';

const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

/** 20260506 → "06 MAY 2026" (mono metadata). */
export function formatArchiveDate(date: EightDigitDate): string {
  const str = String(date);
  const month = Number(str.slice(4, 6)) - 1;
  return `${str.slice(6, 8)} ${MONTHS[month] ?? ''} ${str.slice(0, 4)}`;
}
