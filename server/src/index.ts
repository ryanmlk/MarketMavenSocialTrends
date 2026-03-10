import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs/promises';
import { parse } from 'csv-parse/sync';
import { analyzeSocialData } from './analyzer.js';

const app = express();
const port = process.env.PORT || 5000;
const upload = multer({ dest: 'uploads/' });

app.use(express.json());

// In-memory store for the last analysis result (for MVP simplicity)
let lastAnalysis: any = null;

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.post('/api/upload', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  try {
    const filePath = req.file.path;
    const fileContent = await fs.readFile(filePath, 'utf-8');
    let data: any[] = [];

    if (req.file.originalname.endsWith('.csv')) {
      data = parse(fileContent, { columns: true, skip_empty_lines: true });
    } else if (req.file.originalname.endsWith('.json')) {
      data = JSON.parse(fileContent);
    } else {
      return res.status(400).json({ error: 'Unsupported file format. Please upload CSV or JSON.' });
    }

    lastAnalysis = analyzeSocialData(data);
    
    // Clean up uploaded file
    await fs.unlink(filePath);

    res.status(200).json({
      message: 'File uploaded and analyzed successfully',
      analysis: lastAnalysis
    });
  } catch (error: any) {
    console.error('Processing error:', error);
    res.status(500).json({ error: 'Failed to process file: ' + error.message });
  }
});

app.get('/api/analysis', (req, res) => {
  if (!lastAnalysis) {
    return res.status(404).json({ error: 'No analysis data available. Please upload a file first.' });
  }
  res.json(lastAnalysis);
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

export default app;
