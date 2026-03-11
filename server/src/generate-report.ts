import * as fs from 'fs';
import { parse } from 'csv-parse';

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
