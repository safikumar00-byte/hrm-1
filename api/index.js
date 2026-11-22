// api/index.js
// Vercel Serverless Function entry point for root /api requests

import { handleMockApiRequest } from '../mockApiPlugin.js';

export default function handler(req, res) {
  return handleMockApiRequest(req, res, () => {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Endpoint not found', url: req.url }));
  });
}
