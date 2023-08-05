import sum from './sum';
import { describe, expect, it } from 'vitest';

describe('#sum', () => {
  it('should return 0 when the array is empty', () => {
    expect(sum([])).toBe(0);
  });
});
