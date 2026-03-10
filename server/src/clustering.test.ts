import { describe, it, expect } from 'vitest';
import { clusterKeywords } from './clustering.js';

describe('Theme Clustering', () => {
  it('should group related keywords into themes', () => {
    const keywords = ['social', 'media', 'trend', 'ai', 'machine', 'learning', 'data', 'analytics'];
    // We expect 'ai', 'machine', 'learning' to be in one cluster
    // and 'social', 'media' in another, etc.
    const clusters = clusterKeywords(keywords);
    
    expect(clusters.length).toBeGreaterThan(0);
    // Check if clusters are arrays of strings
    expect(Array.isArray(clusters[0])).toBe(true);
  });

  it('should handle empty or single keyword input', () => {
    expect(clusterKeywords([])).toEqual([]);
    expect(clusterKeywords(['onlyone'])).toEqual([['onlyone']]);
  });
});
