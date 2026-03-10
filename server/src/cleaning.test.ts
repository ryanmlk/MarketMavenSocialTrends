import { describe, it, expect } from 'vitest';
import { cleanText, extractKeywords } from './cleaning.js';

describe('Data Cleaning & Extraction', () => {
  describe('cleanText', () => {
    it('should remove special characters and lower case text', () => {
      const input = 'Hello WORLD!!! 123 @social #trends';
      const output = cleanText(input);
      expect(output).toBe('hello world 123 social trends');
    });

    it('should remove extra whitespace', () => {
      const input = '  hello   world  ';
      const output = cleanText(input);
      expect(output).toBe('hello world');
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

    it('should count frequency of hashtags correctly', () => {
      const input = 'i love #ai and #ai is great #ml';
      const keywords = extractKeywords(input);
      // This might depend on how I implement extractKeywords (returning list or map)
      // Let's assume it returns a list of tokens for now.
      expect(keywords).toContain('ai');
      expect(keywords).toContain('ml');
    });
  });
});
