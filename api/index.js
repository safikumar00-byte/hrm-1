// api/index.js
// Vercel Serverless Function entry point for all /api requests

import { handleMockApiRequest } from '../mockApiPlugin.js';

export default function handler(req, res) {
  let endpoint = req.url || '';

  // 1. Check if Vercel path parameter was passed from rewrite /api/:path*
  if (req.query && req.query.path) {
    const subPath = Array.isArray(req.query.path) ? req.query.path.join('/') : req.query.path;
    endpoint = `/api/${subPath}`;
  } else if (req.headers['x-forwarded-uri'] && !req.headers['x-forwarded-uri'].includes('index.js')) {
    endpoint = req.headers['x-forwarded-uri'];
  } else if (req.headers['x-matched-path'] && !req.headers['x-matched-path'].includes('index.js')) {
    endpoint = req.headers['x-matched-path'];
  }

  // Ensure query parameters are preserved if present in original request
  const queryIndex = (req.url || '').indexOf('?');
  if (queryIndex !== -1 && !endpoint.includes('?')) {
    endpoint += req.url.substring(queryIndex);
  }

  req.url = endpoint;

  return handleMockApiRequest(req, res, () => {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/json');
    res.end(
      JSON.stringify({
        error: 'Endpoint not found',
        url: req.url,
        query: req.query,
      })
    );
  });
}
