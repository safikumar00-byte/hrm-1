import { BASE_URL, safeJson } from './urls';

export const fetchPayrollSummary = async (token) => {
  try {
    const url = `${BASE_URL}/pay`;
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await safeJson(res, url);
    return Array.isArray(result?.data) ? result.data : (Array.isArray(result) ? result : []);
  } catch (error) {
    console.error('Fetch Payroll Summary API error:', error);
    return [];
  }
};

export const fetchRecentPayslips = async (token) => {
  try {
    const url = `${BASE_URL}/payslips/pdf`;
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return await safeJson(res, url);
  } catch (error) {
    console.error('Fetch Recent Payslips API error:', error);
    throw error;
  }
};

export const fetchFAQs = async (token) => {
  try {
    const url = `${BASE_URL}/helpdesk/faqs`;
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return await safeJson(response, url);
  } catch (error) {
    console.error('Fetch FAQs API error:', error);
    throw error;
  }
};

export const submitTicket = async (token, subject) => {
  try {
    const url = `${BASE_URL}/helpdesk/tickets`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ subject }),
    });

    return await safeJson(response, url);
  } catch (error) {
    console.error('Submit Ticket API error:', error);
    throw error;
  }
};

export const fetchTickets = async (token) => {
  try {
    const url = `${BASE_URL}/helpdesk/tickets`;
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return await safeJson(response, url);
  } catch (error) {
    console.error('Fetch Tickets API error:', error);
    throw error;
  }
};

export const fetchBankDetails = async (token) => {
  try {
    const url = `${BASE_URL}/banks/my`;
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status === 404) {
      return null;
    }

    return await safeJson(res, url);
  } catch (error) {
    console.error('Fetch BankDetails API error:', error);
    throw error;
  }
};

export const addBankDetails = async (token, bankDetails) => {
  try {
    const url = `${BASE_URL}/banks`;
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(bankDetails),
    });

    return await safeJson(res, url);
  } catch (error) {
    console.error('Update BankDetails API error:', error);
    throw error;
  }
};
