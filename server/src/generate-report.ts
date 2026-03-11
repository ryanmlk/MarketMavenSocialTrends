import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { parse } from 'csv-parse';
import { detectCorrelations } from './correlation';
import { createCanvas } from 'canvas';
import { Chart, registerables } from 'chart.js';
import pdfmake from 'pdfmake';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

Chart.register(...registerables);

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
    { text: 'Correlation Analysis', style: 'header', margin: [0, 20, 0, 10] },
  ];

  if (correlations.length > 0) {
    const ul = correlations.map(c => `${c.pair.join(' & ')}: ${c.score}`);
    content.push({ ul });
  } else {
    content.push({ text: 'No significant correlations found.' });
  }

  return content;
}

export function generateTimeSeriesData(data: any[]): Record<string, number> {
  const timeSeries: Record<string, number> = {};
  for (const row of data) {
    const date = new Date(row.Timestamp).toISOString().split('T')[0];
    if (date) {
      timeSeries[date] = (timeSeries[date] || 0) + 1;
    }
  }
  return timeSeries;
}

export async function generateChartImage(timeSeriesData: Record<string, number>): Promise<string> {
  const width = 800;
  const height = 400;
  const canvas = createCanvas(width, height);
  // @ts-ignore
  const ctx = canvas.getContext('2d');

  const labels = Object.keys(timeSeriesData).sort();
  const data = labels.map(label => timeSeriesData[label]);

  new Chart(ctx as any, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: 'Conversations Over Time',
        data,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }]
    },
    options: {
      devicePixelRatio: 1,
      scales: {
        y: {
          beginAtZero: true
        }
      },
      plugins: {
        legend: {
          display: true
        }
      }
    }
  });

  return canvas.toDataURL();
}

export function generateHashtagsSummary(data: any[]): any[] {
  const hashtagCounts: Record<string, number> = {};
  data.forEach(row => {
    const hashtags = row.Hashtags ? row.Hashtags.split(/\s+/) : [];
    hashtags.forEach((tag: string) => {
      if (tag.startsWith('#')) {
        hashtagCounts[tag] = (hashtagCounts[tag] || 0) + 1;
      }
    });
  });

  const sortedHashtags = Object.entries(hashtagCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10);

  const content: any[] = [
    { text: 'Hashtags Summary', style: 'header', margin: [0, 20, 0, 10] },
  ];

  if (sortedHashtags.length > 0) {
    content.push({
      table: {
        headerRows: 1,
        widths: ['*', 'auto'],
        body: [
          ['Hashtag', 'Count'],
          ...sortedHashtags.map(([tag, count]) => [tag, count.toString()])
        ]
      }
    });
  } else {
    content.push({ text: 'No hashtags found.' });
  }

  return content;
}

export function generateLikesSummary(data: any[]): any[] {
  const postLikes = data
    .map(row => ({
      text: row['Post text'].substring(0, 100) + (row['Post text'].length > 100 ? '...' : ''),
      likes: parseInt(row.Likes) || 0
    }))
    .sort((a, b) => b.likes - a.likes)
    .slice(0, 10);

  const content: any[] = [
    { text: 'Likes Summary', style: 'header', margin: [0, 20, 0, 10] },
  ];

  if (postLikes.length > 0) {
    content.push({
      table: {
        headerRows: 1,
        widths: ['*', 'auto'],
        body: [
          ['Post Preview', 'Likes'],
          ...postLikes.map(p => [p.text, p.likes.toString()])
        ]
      }
    });
  } else {
    content.push({ text: 'No likes data found.' });
  }

  return content;
}

export async function generatePdfContent(data: any[]): Promise<any[]> {
  const correlationAnalysis = generateCorrelationAnalysis(data);
  const timeSeriesData = generateTimeSeriesData(data);
  const chartImage = await generateChartImage(timeSeriesData);
  const hashtagsSummary = generateHashtagsSummary(data);
  const likesSummary = generateLikesSummary(data);

  return [
    { text: 'Social Media Analysis Report', style: 'title', alignment: 'center', margin: [0, 0, 0, 20] },
    ...correlationAnalysis,
    { text: 'Conversations Over Time', style: 'header', margin: [0, 20, 0, 10] },
    { image: chartImage, width: 500 },
    ...hashtagsSummary,
    ...likesSummary
  ];
}

async function run() {
  const csvPath = path.join(__dirname, '../../scraped_reddit_data.csv');
  const outputPath = path.join(__dirname, '../../social_analysis_report.pdf');

  console.log(`Reading CSV from: ${csvPath}`);
  const data = await readCsvData(csvPath);

  console.log('Generating PDF content...');
  const content = await generatePdfContent(data);

  const fonts = {
    Roboto: {
      normal: 'Helvetica',
      bold: 'Helvetica-Bold',
      italics: 'Helvetica-Oblique',
      bolditalics: 'Helvetica-BoldOblique'
    }
  };

  pdfmake.setFonts(fonts);

  const docDefinition = {
    content,
    styles: {
      title: {
        fontSize: 22,
        bold: true
      },
      header: {
        fontSize: 18,
        bold: true
      }
    },
    defaultStyle: {
      font: 'Roboto'
    }
  };

  console.log('Writing PDF file...');
  await pdfmake.createPdf(docDefinition).write(outputPath);

  console.log(`PDF report generated successfully at: ${outputPath}`);
}

// Check if run as a script
if (process.argv[1] === __filename || process.argv[1]?.endsWith('generate-report.ts')) {
  run().catch(err => {
    console.error('Error generating report:', err);
    process.exit(1);
  });
}
