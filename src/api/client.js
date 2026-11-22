// src/api/client.js
// Centralized, resilient HTTP response handler and API client for CVM-HRMS (V1 & V2)

import { BASE_URL } from './urls';

/**
 * Validates Content-Type and parses JSON safely without crashing on HTML responses.
 * Detects HTML fallbacks (SPA rewrites, 404/502 web server pages) and produces descriptive,
 * controlled error states rather than unhandled SyntaxError exceptions.
 *
 * @param {Response} res - Fetch Response object
 * @param {string} [url=''] - Request URL for diagnostics
 * @returns {Promise<any>} Parsed JSON data or null for empty bodies
 */
export async function safeJson(res, url = '') {
  const status = res.status;
  const contentType = res.headers ? (res.headers.get('content-type') || '') : '';
  const requestUrl = url || res.url || 'API Endpoint';

  // 1. Detect and cleanly handle HTML responses (e.g. from SPA rewrites or web server error pages)
  if (contentType.toLowerCase().includes('text/html')) {
    const rawHtml = await res.text().catch(() => '');
    const snippet = rawHtml.substring(0, 150).replace(/\s+/g, ' ').trim();
    const errorMsg = `[API Connectivity Error] Endpoint "${requestUrl}" returned HTML (${contentType}, HTTP ${status}) instead of JSON. The backend server may be offline, unreachable, or intercepted by an SPA rewrite. Response snippet: ${snippet}`;
    console.error(errorMsg);
    const err = new Error(errorMsg);
    err.status = status;
    err.isHtmlResponse = true;
    err.url = requestUrl;
    throw err;
  }

  // 2. Handle empty response (204 No Content or empty text)
  if (status === 204) {
    return null;
  }

  let text = '';
  try {
    text = await res.text();
  } catch (readErr) {
    throw new Error(`Failed to read response body from "${requestUrl}": ${readErr.message}`);
  }

  if (!text || text.trim() === '') {
    if (!res.ok) {
      const err = new Error(`API Error [HTTP ${status}]: Empty response body from ${requestUrl}`);
      err.status = status;
      err.url = requestUrl;
      throw err;
    }
    return null;
  }

  // 3. Safe JSON parsing with diagnostic syntax error reporting
  let data;
  try {
    data = JSON.parse(text);
  } catch (parseErr) {
    const snippet = text.substring(0, 120).replace(/\s+/g, ' ').trim();
    const errorMsg = `[API Format Error] Expected JSON from "${requestUrl}" (HTTP ${status}), but parsing failed: ${parseErr.message}. Response preview: "${snippet}"`;
    console.error(errorMsg);
    const err = new Error(errorMsg);
    err.status = status;
    err.url = requestUrl;
    err.rawResponse = text;
    throw err;
  }

  // 4. Handle HTTP error status codes (4xx / 5xx) with preserved backend messages
  if (!res.ok) {
    const backendMessage =
      data?.message ||
      data?.error ||
      data?.msg ||
      data?.detail ||
      `HTTP Error ${status}: Request to "${requestUrl}" failed`;
    const err = new Error(backendMessage);
    err.status = status;
    err.url = requestUrl;
    err.data = data;
    throw err;
  }

  return data;
}

/**
 * Centralized API fetch wrapper for V1 and V2 services.
 * Auto-resolves BASE_URL, injects Bearer token, sets JSON headers, and guarantees safe response handling.
 *
 * @param {string} endpoint - Relative path (e.g. '/employee') or absolute URL
 * @param {RequestInit & { token?: string }} [options={}] - Fetch options
 * @returns {Promise<any>}
 */
export async function apiFetch(endpoint, options = {}) {
  const url = endpoint.startsWith('http://') || endpoint.startsWith('https://')
    ? endpoint
    : `${BASE_URL.replace(/\/$/, '')}/${endpoint.replace(/^\//, '')}`;

  const headers = {
    Accept: 'application/json',
    ...options.headers,
  };

  // Stringify object bodies and set application/json
  let body = options.body;
  if (body && typeof body === 'object' && !(body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
    body = JSON.stringify(body);
  }

  // Auto-inject Bearer token
  const token = options.token || (typeof localStorage !== 'undefined' ? localStorage.getItem('token') : null);
  if (token && !headers.Authorization && !headers.authorization) {
    headers.Authorization = `Bearer ${token}`;
  }

  const finalOptions = {
    ...options,
    headers,
    body,
  };

  const res = await fetch(url, finalOptions);
  return safeJson(res, url);
}

export default apiFetch;
