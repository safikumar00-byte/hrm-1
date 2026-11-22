
import { BASE_URL, safeJson } from './urls';

export const createEmployee = async (employeeData, token) => {
  try {
    const res = await fetch(`${BASE_URL}/employee/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(employeeData),
    });

    return await safeJson(res, typeof url !== "undefined" ? url : res.url);
  } catch (error) {
    console.error('Create Employee API error:', error);
    throw error;
  }
};


export const getAllonboarding = async (token) => {
  try {
    const res = await fetch(`${BASE_URL}/onboarding/all`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });

    return await safeJson(res, typeof url !== "undefined" ? url : res.url);
  } catch (error) {
    console.error('Get All Employees API error:', error);
    throw error;
  }
};

