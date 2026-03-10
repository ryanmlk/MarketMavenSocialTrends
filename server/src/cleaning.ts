import natural from 'natural';

const tokenizer = new natural.WordTokenizer();
const stopwords = natural.stopwords;

/**
 * Cleans text by removing special characters and standardizing whitespace.
 */
export function cleanText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, ' ') // Replace non-alphanumeric with space
    .replace(/\s+/g, ' ')        // Normalize whitespace
    .trim();
}

/**
 * Extracts keywords by tokenizing, removing stop words, and potentially stemming.
 */
export function extractKeywords(text: string): string[] {
  const cleaned = cleanText(text);
  const tokens = tokenizer.tokenize(cleaned) || [];
  
  // Remove stop words
  return tokens.filter(token => !stopwords.includes(token) && token.length > 1);
}
