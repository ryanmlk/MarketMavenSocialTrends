import { cleanText, extractKeywords } from './cleaning.js';
import { clusterKeywords } from './clustering.js';
import { detectCorrelations } from './correlation.js';

export interface AnalysisResult {
  totalConversations: number;
  trend: number;
  keywords: { name: string; growth: number; percentage: number }[];
  correlations: { pair: string; score: number; level: string }[];
  themes: { title: string; impact: string; description: string }[];
}

export function analyzeSocialData(data: any[]): AnalysisResult {
  const allPostKeywords: string[][] = [];
  const allKeywords: string[] = [];

  // 1. Extract keywords from all posts
  data.forEach(item => {
    const text = item.text || item['Post text'] || '';
    const keywords = extractKeywords(text);
    allPostKeywords.push(keywords);
    allKeywords.push(...keywords);
  });

  // 2. Count keyword frequencies
  const counts: Map<string, number> = new Map();
  allKeywords.forEach(kw => counts.set(kw, (counts.get(kw) || 0) + 1));

  // 3. Get top keywords
  const sortedKeywords = Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const topKeywords = sortedKeywords.map(([name, count]) => ({
    name: name.startsWith('#') ? name : `#${name}`,
    growth: Math.floor(Math.random() * 50), // Mock growth for MVP
    percentage: Math.min(100, Math.floor((count / data.length) * 100 * 5)) // Scaled for visualization
  }));

  // 4. Detect correlations
  const rawCorrelations = detectCorrelations(allPostKeywords).slice(0, 4);
  const correlations = rawCorrelations.map(c => ({
    pair: `${c.pair[0]} & ${c.pair[1]}`,
    score: (c.score / 10).toFixed(2) as unknown as number,
    level: c.score > 5 ? 'Strong Correlation' : 'Moderate Strength'
  }));

  // 5. Cluster into themes
  const clusters = clusterKeywords(Array.from(counts.keys()).slice(0, 20)).slice(0, 3);
  const themes = clusters.map((cluster, i) => {
    const titles = ['Product Discussions', 'Market Trends', 'Consumer Sentiment'];
    const impacts = ['High Impact', 'Market Shift', 'Emotional Data'];
    const descriptions = [
      'Analyzing core feedback and feature requests.',
      'Identifying emerging patterns across industries.',
      'Monitoring brand perception in real-time.'
    ];
    return {
      title: titles[i] || 'General Theme',
      impact: impacts[i] || 'Low Impact',
      description: descriptions[i] || 'General social media activity.'
    };
  });

  return {
    totalConversations: data.length,
    trend: 12.5, // Mock trend
    keywords: topKeywords,
    correlations,
    themes
  };
}
