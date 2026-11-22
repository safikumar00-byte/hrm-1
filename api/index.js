// api/index.js
// Vercel Serverless Function entry point for all /api requests

import { handleMockApiRequest } from '../mockApiPlugin.js';

export default function handler(req, res) {
  // Detect original URL if Vercel rewrote it to /api/index.js
  const originalUrl =
    req.headers['x-forwarded-uri'] ||
    req.headers['x-matched-path'] ||
    req.headers['x-vercel-original-path'] ||
    req.url ||
    '';

  if (originalUrl && !originalUrl.includes('index.js')) {
    req.url = originalUrl;
  }

  return handleMockApiRequest(req, res, () => {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Endpoint not found', url: req.url, originalUrl }));
  });
}
