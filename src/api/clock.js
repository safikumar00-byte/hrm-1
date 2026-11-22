import { BASE_URL, safeJson } from './urls';

// Clock In API
export const clockIn = async (token, body) => {
  try {
    const url = `${BASE_URL}/clock/clockin`;
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    return await safeJson(res, url);
  } catch (error) {
    console.error('Clock In API error:', error);
    throw error;
  }
};

// Clock Out API
export const clockOut = async (token, body) => {
  try {
    const url = `${BASE_URL}/clock/clockout`;
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    return await safeJson(res, url);
  } catch (error) {
    console.error('Clock Out API error:', error);
    throw error;
  }
};

export const fetchTodaySessions = async (token) => {
  try {
    const url = `${BASE_URL}/clock/today-sessions`;
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return await safeJson(res, url);
  } catch (error) {
    console.error('Fetch Today Sessions API error:', error);
    throw error;
  }
};

export const fetchClockStatus = async (token) => {
  try {
    const url = `${BASE_URL}/attendance/my`;
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return await safeJson(res, url);
  } catch (error) {
    console.error('Fetch Clock Status API error:', error);
    throw error;
  }
};

export const fetchMyAttendanceLogsByDate = async (token, date) => {
  try {
    const url = `${BASE_URL}/attendance/logs/my?date=${encodeURIComponent(date)}`;
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return await safeJson(res, url);
  } catch (error) {
    console.error('Fetch My Attendance Logs API error:', error);
    throw error;
  }
};

export const fetchAllAttendanceLogsByDate = async (token, date) => {
  try {
    const url = `${BASE_URL}/attendance/logs?date=${encodeURIComponent(date)}`;
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return await safeJson(res, url);
  } catch (error) {
    console.error('Fetch All Attendance Logs API error:', error);
    throw error;
  }
};
