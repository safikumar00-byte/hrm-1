import { BASE_URL, safeJson } from './urls';

export const fetchTaxSlabs = async (token) => {
  const url = `${BASE_URL}/tax/slabs`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await safeJson(res, url);
  return Array.isArray(data) ? data : [];
};

export const createTaxSlabs = async (token, body) => {
  const url = `${BASE_URL}/tax/slabs`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  return await safeJson(res, url);
};

export const deleteTaxSlabs = async (token, id) => {
  const url = `${BASE_URL}/tax/slabs/${id}`;
  const res = await fetch(url, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return await safeJson(res, url);
};

export const fetchTaxConfigs = async (token) => {
  const url = `${BASE_URL}/tax/config`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await safeJson(res, url);
  return Array.isArray(data) ? data : [];
};

export const createTaxConfig = async (token, body) => {
  const url = `${BASE_URL}/tax/config`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  return await safeJson(res, url);
};

export const deleteTaxConfig = async (token, id) => {
  const url = `${BASE_URL}/tax/config/${id}`;
  const res = await fetch(url, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return await safeJson(res, url);
};

export const fetchTaxSlabsByRegimeYear = async (token, taxRegime, financialYear) => {
  const url = `${BASE_URL}/tax/slabs/search?taxRegime=${taxRegime}&financialYear=${financialYear}`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return await safeJson(res, url);
};

export const fetchTaxConfigSingle = async (token, taxRegime, financialYear) => {
  const url = `${BASE_URL}/tax/config/single?taxRegime=${taxRegime}&financialYear=${financialYear}`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return await safeJson(res, url);
};
