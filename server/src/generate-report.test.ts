import { describe, it, expect } from 'vitest';
import { readCsvData, generateCorrelationAnalysis, generateTimeSeriesData, generateChartImage, generatePdfContent } from './generate-report';
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
      { text: 'Correlation Analysis', style: 'header', margin: [0, 20, 0, 10] },
      { text: 'No significant correlations found.' },
    ]);
  });

  it('should generate time-series data for the graph', () => {
    const sampleData = [
      { Timestamp: '2024-01-01T12:00:00Z' },
      { Timestamp: '2024-01-01T13:00:00Z' },
      { Timestamp: '2024-01-02T10:00:00Z' },
    ];
    const timeSeriesData = generateTimeSeriesData(sampleData);
    expect(timeSeriesData).toEqual({
      '2024-01-01': 2,
      '2024-01-02': 1,
    });
  });

  it('should generate a chart image as a base64 string', async () => {
    const timeSeriesData = {
      '2024-01-01': 2,
      '2024-01-02': 1,
    };
    // @ts-ignore
    const chartImage = await generateChartImage(timeSeriesData);
    expect(chartImage).toMatch(/^data:image\/png;base64,/);
  });

  it('should generate the full PDF content including the chart', async () => {
    const sampleData = [
      { 'Post text': 'react node', Timestamp: '2024-01-01T12:00:00Z', Hashtags: '#react', Likes: '10' },
    ];
    // @ts-ignore
    const pdfContent = await generatePdfContent(sampleData);
    expect(pdfContent).toEqual(expect.arrayContaining([
      expect.objectContaining({ text: 'Correlation Analysis' }),
      expect.objectContaining({ image: expect.stringMatching(/^data:image\/png;base64,/) }),
    ]));
  });

  it('should include hashtags and likes in the PDF content', async () => {
    const sampleData = [
      { 'Post text': 'post 1', Hashtags: '#tag1 #tag2', Likes: '10', Timestamp: '2024-01-01T12:00:00Z' },
      { 'Post text': 'post 2', Hashtags: '#tag2 #tag3', Likes: '20', Timestamp: '2024-01-01T13:00:00Z' },
    ];
    // @ts-ignore
    const pdfContent = await generatePdfContent(sampleData);
    expect(pdfContent).toEqual(expect.arrayContaining([
      expect.objectContaining({ text: 'Hashtags Summary' }),
      expect.objectContaining({ text: 'Likes Summary' }),
    ]));
  });
});
