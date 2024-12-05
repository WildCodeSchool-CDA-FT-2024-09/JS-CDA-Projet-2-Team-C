import { frenchLargeDate } from './dates.utils';
import { describe, it, expect } from 'vitest';

describe('frenchLargeDate utility', () => {
  it('should return a formatted French date string for a valid Date', () => {
    const inputDate = new Date('2023-12-01');
    const expectedOutput = '1 décembre 2023';
    expect(frenchLargeDate(inputDate)).toBe(expectedOutput);
  });

  it('should return "date inconnue" for an undefined input', () => {
    const inputDate = undefined;
    const expectedOutput = 'date inconnue';
    expect(frenchLargeDate(inputDate)).toBe(expectedOutput);
  });

  it('should handle invalid date input gracefully', () => {
    const inputDate = new Date('invalid-date');
    const expectedOutput = 'date inconnue';
    expect(frenchLargeDate(inputDate)).toBe(expectedOutput);
  });

  it('should handle a string date input correctly', () => {
    const inputDate = '2023-12-01';
    const expectedOutput = '1 décembre 2023';
    expect(frenchLargeDate(inputDate)).toBe(expectedOutput);
  });
});
