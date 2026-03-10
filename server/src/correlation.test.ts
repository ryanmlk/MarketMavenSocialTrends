import { describe, it, expect } from 'vitest';
import { detectCorrelations } from './correlation.js';

describe('Correlation Detection', () => {
  it('should detect highly correlated keywords', () => {
    const posts = [
      ['ai', 'future', 'technology'],
      ['ai', 'future', 'robotics'],
      ['social', 'media', 'marketing'],
      ['ai', 'technology', 'innovation']
    ];
    
    const correlations = detectCorrelations(posts);
    
    // We expect 'ai' and 'future' to be highly correlated
    expect(correlations).toContainEqual(expect.objectContaining({
      pair: expect.arrayContaining(['ai', 'future']),
      score: expect.any(Number)
    }));
  });

  it('should return empty list for no co-occurrences', () => {
    const posts = [['a'], ['b'], ['c']];
    expect(detectCorrelations(posts)).toEqual([]);
  });
});
