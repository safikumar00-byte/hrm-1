import { BASE_URL, safeJson } from './urls';

export const submitTimeSheetAPI = async (payload, token) => {
  try {
    const url = `${BASE_URL}/timesheets`;
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    return await safeJson(res, url);
  } catch (error) {
    console.error('Submit Time Sheet API Error:', error);
    throw error;
  }
};

export const fetchMyTimeSheetsAPI = async (token) => {
  try {
    const url = `${BASE_URL}/timesheets/my`;
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return await safeJson(res, url);
  } catch (error) {
    console.error('Fetch Time Sheets API Error:', error);
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

export const fetchTeamTimeSheetsAPI = async (token) => {
  try {
    const url = `${BASE_URL}/timesheets/team`;
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return await safeJson(res, url);
  } catch (error) {
    console.error('Fetch Team Time Sheets API Error:', error);
    throw error;
  }
};

export const updateTimesheetStatusAPI = async (id, { status, reason }, token) => {
  try {
    const url = `${BASE_URL}/timesheets/${id}/approve`;
    const res = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status, reason }),
    });

    return await safeJson(res, url);
  } catch (error) {
    console.error('Update Timesheet Status API Error:', error);
    throw error;
  }
};

export const fetchAllTimeSheetsAPI = async (token) => {
  try {
    const url = `${BASE_URL}/timesheets`;
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return await safeJson(res, url);
  } catch (error) {
    console.error('Fetch All Time Sheets API Error:', error);
    throw error;
  }
};
