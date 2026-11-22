import { BASE_URL, safeJson } from './urls';

export const viewPayslipPDF = async (token, month, year) => {
  const url = `${BASE_URL}/payslips/view?month=${month}&year=${year}`;
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error('Failed to view payslip');
  return await res.blob();
};

export const downloadPayslipPDF = async (token, month, year) => {
  const url = `${BASE_URL}/payslips/download?month=${month}&year=${year}`;
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error('Failed to download payslip');

  const blob = await res.blob();
  const downloadUrl = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = downloadUrl;
  a.download = `Payslip_${month}_${year}.pdf`;
  a.click();
};

export const sendBulkPayslips = async (token, month, year) => {
  const url = `${BASE_URL}/payslips/bulk-email`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ month, year }),
  });

  const data = await safeJson(res, url);
  return data?.message || 'Payslips sent successfully';
};

export const fetchPayslipMonths = async (token) => {
  const url = `${BASE_URL}/payslips/months`;
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await safeJson(res, url);
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.months)) return data.months;
  if (Array.isArray(data?.data)) return data.data;
  return [];
};

export const fetchPayregister = async (token) => {
  const url = `${BASE_URL}/payslips/list`;
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await safeJson(res, url);
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.payslips)) return data.payslips;
  if (Array.isArray(data?.data)) return data.data;
  return [];
};
