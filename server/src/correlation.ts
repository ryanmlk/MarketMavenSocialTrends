/**
 * Detects correlations between keywords by counting co-occurrences in posts.
 */
export function detectCorrelations(posts: string[][]): { pair: [string, string], score: number }[] {
  const coOccurrences: Map<string, number> = new Map();
  const counts: Map<string, number> = new Map();

  for (const post of posts) {
    // Unique keywords in post to avoid double counting
    const uniqueKeywords = Array.from(new Set(post));

    for (let i = 0; i < uniqueKeywords.length; i++) {
      const k1 = uniqueKeywords[i]!;
      counts.set(k1, (counts.get(k1) || 0) + 1);

      for (let j = i + 1; j < uniqueKeywords.length; j++) {
        const k2 = uniqueKeywords[j]!;
        const pair = [k1, k2].sort().join(',');
        coOccurrences.set(pair, (coOccurrences.get(pair) || 0) + 1);
      }
    }
  }

  const result: { pair: [string, string], score: number }[] = [];

  for (const [pairStr, count] of coOccurrences.entries()) {
    const pair = pairStr.split(',') as [string, string];
    // Simple score: co-occurrence count
    // In more advanced version, we could use Jaccard index or Pearson correlation
    if (count > 1) {
      result.push({ pair, score: count });
    }
  }

  return result.sort((a, b) => b.score - a.score);
}
