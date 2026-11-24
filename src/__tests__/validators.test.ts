import { describe, it, expect } from 'vitest';
import { validateName, validatePhone, validateDate } from '../utils/validators';

describe('Form Validators', () => {
  it('should validate name length', () => {
    expect(validateName('Jo')).toBe(false);
    expect(validateName('João')).toBe(true);
  });

  it('should validate phone format', () => {
    expect(validatePhone('11999999999')).toBe(true);
    expect(validatePhone('123')).toBe(false);
  });

  it('should validate date is in the future', () => {
    expect(validateDate('2000-01-01')).toBe(false);
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 1);
    expect(validateDate(futureDate.toISOString().split('T')[0])).toBe(true);
  });
});