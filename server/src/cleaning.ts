import natural from 'natural';

const tokenizer = new natural.WordTokenizer();
const baseStopwords = natural.stopwords;
// Add aggressive stop words that are often missed
const additionalStopwords = ['just', 'not', 've', 're', 'll', 'd', 'm', 's', 't', 'don', 'ain', 'aren', 'couldn', 'didn', 'doesn', 'hadn', 'hasn', 'haven', 'isn', 'mightn', 'mustn', 'needn', 'shan', 'shouldn', 'wasn', 'weren', 'won', 'wouldn', 'ive'];
const allStopwords = new Set([...baseStopwords, ...additionalStopwords]);

/**
 * Cleans text by removing special characters and standardizing whitespace.
 */
export function cleanText(text: string): string {
  return text
    .toLowerCase()
    // Remove apostrophes from common contractions first so they don't get split into standalone letters if tokenized purely by non-alpha
    .replace(/'(?=s|re|ve|ll|d|m|t)/g, '')
    // Also remove the "n't"
    .replace(/n't/g, 'nt')
    // Replace non-alphanumeric (except # and @ for tags/mentions) with space
    .replace(/[^a-z0-9#@]/g, ' ') 
    .replace(/\s+/g, ' ')        // Normalize whitespace
    .trim();
}

/**
 * Extracts keywords by tokenizing, removing stop words, and potentially stemming.
 */
export function extractKeywords(text: string): string[] {
  const cleaned = cleanText(text);
  // We use a simple split by space since we preserved # and @ in cleanText
  // natural.WordTokenizer strips out symbols like #, so we do it manually.
  const rawTokens = cleaned.split(' ');
  
  const tokens = rawTokens.filter(token => {
    const isHashtagOrMention = token.startsWith('#') || token.startsWith('@');
    // Strip # or @ for stop word checking just in case
    const cleanTokenForCheck = isHashtagOrMention ? token.substring(1) : token;
    
    if (allStopwords.has(cleanTokenForCheck)) return false;
    
    // Minimum length check (unless it's a hashtag/mention which could be short like #ai)
    if (!isHashtagOrMention && token.length < 3) return false;
    
    return token.length > 0;
  });

  return tokens;
}
