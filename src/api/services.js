import { BASE_URL, safeJson } from './urls';

export const loginUser = async (email, password) => {
  try {
    const url = `${BASE_URL}/auth/login`;
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await safeJson(res, url);
    if (data) {
      localStorage.setItem('user', JSON.stringify(data));
    }
    return data;
  } catch (error) {
    console.error('Login API error:', error);
    throw error;
  }
};

export const fetchUsers = async (token) => {
  try {
    const url = `${BASE_URL}/users`;
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return await safeJson(res, url);
  } catch (error) {
    console.error('Fetch Users API error:', error);
    throw error;
  }
};

export const applyLeave = async (token, leaveData) => {
  try {
    const url = `${BASE_URL}/leaves`;
    const formData = new FormData();
    for (const key in leaveData) {
      const value = leaveData[key];
      if (value !== null && value !== '') {
        formData.append(key, value);
      }
    }

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    return await safeJson(res, url);
  } catch (error) {
    console.error('Apply Leave API error:', error);
    throw error;
  }
};

export const fetchProfile = async (token) => {
  try {
    const url = `${BASE_URL}/employee`;
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return await safeJson(res, url);
  } catch (error) {
    console.error('Fetch Profile API error:', error);
    throw error;
  }
};

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

export const fetchAttendanceData = async (token) => {
  try {
    const url = `${BASE_URL}/attendance`;
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return await safeJson(res, url);
  } catch (error) {
    console.error('Fetch Attendance Data API error:', error);
    throw error;
  }
};

export const getTeamAttendance = async (token) => {
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
    console.error('Fetch Attendance Data API error:', error);
    throw error;
  }
};
