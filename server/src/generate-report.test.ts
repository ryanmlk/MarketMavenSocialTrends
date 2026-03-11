import { describe, it, expect } from 'vitest';
import { readCsvData } from './generate-report';
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
});
