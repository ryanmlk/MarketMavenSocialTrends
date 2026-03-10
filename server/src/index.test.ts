import { describe, it, expect } from 'vitest';
import express from 'express';
import request from 'supertest';

const app = express();
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

describe('GET /api/health', () => {
  it('should return 200 and status ok', async () => {
    const response = await request(app).get('/api/health');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: 'ok' });
  });
});
