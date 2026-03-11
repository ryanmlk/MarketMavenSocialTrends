import * as fs from 'fs';
import { parse } from 'csv-parse';
import { detectCorrelations } from './correlation';

export async function readCsvData(filePath: string): Promise<any[]> {
  const records: any[] = [];
  const parser = fs
    .createReadStream(filePath)
    .pipe(parse({
      columns: true,
      skip_empty_lines: true
    }));

  for await (const record of parser) {
    records.push(record);
  }
  return records;
}

export function generateCorrelationAnalysis(data: any[]): any[] {
  const posts = data.map(row => row['Post text'].toLowerCase().split(/\s+/));
  const correlations = detectCorrelations(posts);

  const content: any[] = [
    { text: 'Correlation Analysis', style: 'header' },
  ];

  if (correlations.length > 0) {
    const ul = correlations.map(c => `${c.pair.join(' & ')}: ${c.score}`);
    content.push({ ul });
  } else {
    content.push({ text: 'No significant correlations found.' });
  }

  return content;
}
