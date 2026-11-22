// api/[...path].js
// Vercel Serverless Function wildcard catch-all for all /api/* requests

import { handleMockApiRequest } from '../mockApiPlugin.js';

export default function handler(req, res) {
  const originalUrl =
    req.headers['x-forwarded-uri'] ||
    req.headers['x-matched-path'] ||
    req.headers['x-vercel-original-path'] ||
    req.url ||
    '';

  if (originalUrl && !originalUrl.includes('[...path].js')) {
    req.url = originalUrl;
  }

  return handleMockApiRequest(req, res, () => {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Endpoint not found', url: req.url, originalUrl }));
  });
}
