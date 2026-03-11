import { describe, it, expect } from 'vitest';
import { readCsvData, generateCorrelationAnalysis } from './generate-report';
import * as path from 'path';

describe('generate-report', () => {
  it('should read and parse the CSV data', async () => {
    const filePath = path.join(__dirname, '../../scraped_reddit_data.csv');
    const data = await readCsvData(filePath);
    expect(data).toBeDefined();
    expect(data.length).toBeGreaterThan(0);
    expect(data[0]).toHaveProperty('Post text');
    expect(data[0]).toHaveProperty('Hashtags');
    expect(data[0]).toHaveProperty('Timestamp');
    expect(data[0]).toHaveProperty('Likes');
  });

  it('should generate correlation analysis for the PDF', () => {
    const sampleData = [
      { 'Post text': 'react is awesome' },
      { 'Post text': 'react and node are great' },
      { 'Post text': 'node is fun' },
    ];
    const correlationAnalysis = generateCorrelationAnalysis(sampleData);
    expect(correlationAnalysis).toEqual([
      { text: 'Correlation Analysis', style: 'header' },
      { text: 'No significant correlations found.' },
    ]);
  });
});
