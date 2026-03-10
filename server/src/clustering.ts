import natural from 'natural';

/**
 * Clusters keywords into groups based on their string similarity.
 * This is a simple implementation of clustering for MVP.
 */
export function clusterKeywords(keywords: string[]): string[][] {
  if (keywords.length === 0) return [];
  if (keywords.length === 1) return [[keywords[0]!]];

  const clusters: string[][] = [];
  const processed = new Set<string>();

  for (const keyword of keywords) {
    if (processed.has(keyword)) continue;

    const currentCluster: string[] = [keyword];
    processed.add(keyword);

    for (const other of keywords) {
      if (processed.has(other)) continue;

      // Jaro-Winkler distance: 1 = exact match, 0 = no similarity
      const distance = natural.JaroWinklerDistance(keyword, other);
      
      // Threshold for similarity (arbitrary for MVP)
      if (distance > 0.8) {
        currentCluster.push(other);
        processed.add(other);
      }
    }
    clusters.push(currentCluster);
  }

  return clusters;
}
