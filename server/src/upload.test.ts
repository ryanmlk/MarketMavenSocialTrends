import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from './index.js';

describe('POST /api/upload', () => {
  it('should upload a CSV file successfully', async () => {
    const csvContent = 'Post text,Hashtags,Timestamp,Likes\nHello world,#social,2026-03-10,10';
    const response = await request(app)
      .post('/api/upload')
      .attach('file', Buffer.from(csvContent), 'test.csv');

    expect(response.status).toBe(200);
    expect(response.body.filename).toBe('test.csv');
    expect(response.body.mimetype).toBe('text/csv');
  });

  it('should upload a JSON file successfully', async () => {
    const jsonContent = JSON.stringify([{ text: 'Hello', hashtags: ['#social'] }]);
    const response = await request(app)
      .post('/api/upload')
      .attach('file', Buffer.from(jsonContent), 'test.json');

    expect(response.status).toBe(200);
    expect(response.body.filename).toBe('test.json');
    expect(response.body.mimetype).toBe('application/json');
  });

  it('should return 400 if no file is uploaded', async () => {
    const response = await request(app).post('/api/upload');
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('No file uploaded');
  });
});
