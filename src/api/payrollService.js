import { BASE_URL, safeJson } from './urls';

export const runPayroll = async (token, body) => {
  try {
    const url = `${BASE_URL}/pay`;
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
    console.error('Payroll run error:', error);
    throw error;
  }
};

export const fetchAllPayrolls = async (token) => {
  try {
    const url = `${BASE_URL}/pay`;
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await safeJson(res, url);
    return Array.isArray(data?.data) ? data.data : (Array.isArray(data) ? data : []);
  } catch (error) {
    console.error('Fetch payroll error:', error);
    throw error;
  }
};

export const getPayrollByEmployee = async (token, employeeId) => {
  try {
    const url = `${BASE_URL}/payroll/employee/${employeeId}`;
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await safeJson(res, url);
    return Array.isArray(data?.data) ? data.data : (Array.isArray(data) ? data : []);
  } catch (error) {
    console.error('Get payroll by employee error:', error);
    throw error;
  }
};

export const updatePayrollStatus = async (token, { payrollId, status }) => {
  try {
    const url = `${BASE_URL}/payroll/update-status`;
    const res = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ payrollId, status }),
    });

    return await safeJson(res, url);
  } catch (error) {
    console.error('Update payroll status error:', error);
    throw error;
  }
};

export const fetchPayrollruns = async (token) => {
  try {
    const url = `${BASE_URL}/pay/payrolls`;
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await safeJson(res, url);
    return Array.isArray(data?.data) ? data.data : (Array.isArray(data) ? data : []);
  } catch (error) {
    console.error('Fetch payroll runs error:', error);
    throw error;
  }
};
