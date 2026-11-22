import { BASE_URL, safeJson } from './urls';

export const raiseHRRequest = async (token, { category, subject, description }) => {
  try {
    const res = await fetch(`${BASE_URL}/hr/requests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ category, subject, description }),
    });

    return await safeJson(res, typeof url !== "undefined" ? url : res.url);
  } catch (error) {
    console.error('Raise HR Request API error:', error);
    throw error;
  }
};

export const fetchMyHRRequests = async (token) => {
  try {
    const res = await fetch(`${BASE_URL}/hr/requests/my`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return await safeJson(res, typeof url !== "undefined" ? url : res.url);
  } catch (error) {
    console.error('Fetch My HR Requests API error:', error);
    throw error;
  }
};

export const fetchAllHRRequests = async (token) => {
  try {
    const res = await fetch(`${BASE_URL}/hr/requests`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return await safeJson(res, typeof url !== "undefined" ? url : res.url);
  } catch (error) {
    console.error('Fetch All HR Requests API error:', error);
    throw error;
  }
};

export const updateHRRequestStatus = async (token, requestId, status, resolution = '') => {
  try {
    const res = await fetch(`${BASE_URL}/hr/requests/${requestId}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status, resolution }),
    });

    return await safeJson(res, typeof url !== "undefined" ? url : res.url);
  } catch (error) {
    console.error('Update HR Request Status API error:', error);
    throw error;
  }
};

export const assignHRRequest = async (token, requestId, assignedToEmployeeId) => {
  try {
    const res = await fetch(`${BASE_URL}/hr/requests/${requestId}/assign`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ assignedTo: assignedToEmployeeId }),
    });

    return await safeJson(res, typeof url !== "undefined" ? url : res.url);
  } catch (error) {
    console.error('Assign HR Request API error:', error);
    throw error;
  }
};
