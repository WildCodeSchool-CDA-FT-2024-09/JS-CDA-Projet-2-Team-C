import { frenchLargeDate } from './dates.utils';
import { describe, it, expect } from 'vitest';

describe('frenchLargeDate utility', () => {
  // handle correct inputs
  it('should handle a string date input correctly', () => {
    const inputDate = '2023-12-01';
    const expectedOutput = '1 décembre 2023';
    expect(frenchLargeDate(inputDate)).toBe(expectedOutput);
  });

  it('should handle js Date objects', () => {
    const inputDate = new Date('2023-12-01');
    const expectedOutput = '1 décembre 2023';
    expect(frenchLargeDate(inputDate)).toBe(expectedOutput);
  });

  // handle bad inputs
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
});
