import { frenchLargeDate, getAge } from './dates.utils';
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

describe('getAge utility', () => {
  // handle correct inputs
  it('should handle a js Date input correctly', () => {
    const inputDate = new Date('2020-12-01');
    const expectedOutput = '4 ans';
    expect(getAge(inputDate)).toBe(expectedOutput);
  });

  it('should handle string input correctly', () => {
    const inputDate = '2020-12-01';
    const expectedOutput = '4 ans';
    expect(getAge(inputDate)).toBe(expectedOutput);
  });

  it('should handle 1 year old case', () => {
    const inputDate = new Date('2023-12-01');
    const expectedOutput = '1 an';
    expect(getAge(inputDate)).toBe(expectedOutput);
  });
  // handle bad inputs
  it('should handle bad strings', () => {
    const inputDate = 'de janvié';
    const expectedOutput = 'age inconnu';
    expect(getAge(inputDate)).toBe(expectedOutput);
  });

  it('should handle undefined', () => {
    const inputDate = undefined;
    const expectedOutput = 'age inconnu';
    expect(getAge(inputDate)).toBe(expectedOutput);
  });
});
