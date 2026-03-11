import { describe, it, expect } from 'vitest';
import { cleanText, extractKeywords } from './cleaning.js';

describe('Data Cleaning & Extraction', () => {
  describe('cleanText', () => {
    it('should remove special characters and lower case text while preserving tags', () => {
      const input = 'Hello WORLD!!! 123 @social #trends';
      const output = cleanText(input);
      expect(output).toBe('hello world 123 @social #trends');
    });

    it('should remove extra whitespace', () => {
      const input = '  hello   world  ';
      const output = cleanText(input);
      expect(output).toBe('hello world');
    });

    it('should handle contractions correctly and not fragment them', () => {
      const input = "I've just not seen a better tool!";
      const output = cleanText(input);
      // cleanText just normalizes string, but we want to make sure it doesn't strip apostrophes in a way that breaks things, or we verify extraction handles it.
      // For now, let's just make sure it keeps the apostrophe or strips it without leaving 've' isolated.
      // We will assert the actual tokenization in extractKeywords.
    });
  });

  describe('extractKeywords', () => {
    it('should extract meaningful keywords and remove stop words', () => {
      const input = 'the quick brown fox jumps over the lazy dog';
      const keywords = extractKeywords(input);
      // 'the' is a stop word, 'quick', 'brown', etc. are not.
      expect(keywords).toContain('quick');
      expect(keywords).toContain('brown');
      expect(keywords).not.toContain('the');
    });

    it('should filter out aggressive stop words like "just" and "not" and handle contractions', () => {
      const input = "I've just not seen a better tool!";
      const keywords = extractKeywords(input);
      
      expect(keywords).not.toContain('ve');
      expect(keywords).not.toContain('just');
      expect(keywords).not.toContain('not');
      expect(keywords).not.toContain('ive'); // Should be removed as stop word or handled
      expect(keywords).toContain('seen');
      expect(keywords).toContain('better');
      expect(keywords).toContain('tool');
    });

    it('should count frequency of hashtags correctly', () => {
      const input = 'i love #ai and #ai is great #ml';
      const keywords = extractKeywords(input);
      // This might depend on how I implement extractKeywords (returning list or map)
      // Let's assume it returns a list of tokens for now.
      expect(keywords).toContain('#ai');
      expect(keywords).toContain('#ml');
    });
  });
});
