import { BASE_URL, safeJson } from './urls';
import { getToken } from '../utils/auth';

export const fetchSelfPayroll = async (month, year) => {
  const token = getToken();
  try {
    const res = await fetch(`${BASE_URL}/payroll/self?month=${month}&year=${year}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return await safeJson(res, typeof url !== "undefined" ? url : res.url);
  } catch (error) {
    console.error('Fetch Self Payroll API error:', error);
    throw error;
  }
};
