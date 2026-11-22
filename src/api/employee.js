import { BASE_URL, safeJson } from './urls';

export const getAllEmployees = async (token) => {
  try {
    const url = `${BASE_URL}/employee/all`;
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return await safeJson(res, url);
  } catch (error) {
    console.error('Fetch Employees API error:', error);
    throw error;
  }
};

export const updateEmployee = async (token, employeeId, updatedData) => {
  try {
    const url = `${BASE_URL}/employee/${employeeId}`;
    const res = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedData),
    });
    return await safeJson(res, url);
  } catch (error) {
    console.error('Update Employee API error:', error);
    throw error;
  }
};

export const getUpcomingBirthdays = async (token) => {
  try {
    const url = `${BASE_URL}/feature/dob`;
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return await safeJson(res, url);
  } catch (error) {
    console.error('Fetch Birthdays API error:', error);
    throw error;
  }
};

export const getFilteredEmployees = async (token, roles = [], search = '') => {
  try {
    const query = new URLSearchParams();
    if (roles.length > 0) query.append('role', roles.join(','));
    if (search) query.append('search', search);

    const url = `${BASE_URL}/employee/filtered?${query.toString()}`;
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return await safeJson(res, url);
  } catch (error) {
    console.error('Fetch Filtered Employees API error:', error);
    throw error;
  }
};
