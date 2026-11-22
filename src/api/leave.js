import { BASE_URL, safeJson } from './urls';

export const fetchAvailableLeaves = async (token) => {
  try {
    const url = `${BASE_URL}/leaves/my`;
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return await safeJson(res, url);
  } catch (error) {
    console.error('Fetch Available Leaves API error:', error);
    throw error;
  }
};

export const fetchManagerLeaveRequests = async (token) => {
  try {
    const url = `${BASE_URL}/leaves/all`;
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return await safeJson(res, url);
  } catch (error) {
    console.error('Fetch Manager Leave Requests API error:', error);
    throw error;
  }
};

export const fetchManagerAttendanceData = async (token) => {
  try {
    const url = `${BASE_URL}/attendance/team`;
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return await safeJson(res, url);
  } catch (error) {
    console.error('Fetch Manager Attendance Data API error:', error);
    throw error;
  }
};

export const fetchAllLeaveRequests = async (token) => {
  try {
    const url = `${BASE_URL}/leaves`;
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return await safeJson(res, url);
  } catch (error) {
    console.error('Fetch All Leave Requests API error:', error);
    throw error;
  }
};

export const updateLeaveStatus = async (id, status, token, comments = '') => {
  try {
    const url = `${BASE_URL}/leaves/${id}`;
    const res = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        status,
        comments,
      }),
    });

    return await safeJson(res, url);
  } catch (error) {
    console.error(`Update Leave Status API error (${status}):`, error);
    throw error;
  }
};

export const fetchAllLeavesForAdmin = async (token) => {
  try {
    const url = `${BASE_URL}/leaves/admin-leaves`;
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return await safeJson(res, url);
  } catch (error) {
    console.error('Fetch All Leaves for Admin API error:', error);
    throw error;
  }
};
