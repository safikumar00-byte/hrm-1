import { BASE_URL, safeJson } from './urls';

export const fetchProfile = async (token) => {
  try {
    const url = `${BASE_URL}/profile/me`;
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

export const updateProfile = async (token, profileData) => {
  try {
    const isFormData = profileData instanceof FormData;
    const url = `${BASE_URL}/profile/me`;

    const res = await fetch(url, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
      },
      body: isFormData ? profileData : JSON.stringify(profileData),
    });

    return await safeJson(res, url);
  } catch (error) {
    console.error('Update Profile API error:', error);
    throw error;
  }
};

export const fetchEmergencyContacts = async (token) => {
  try {
    const url = `${BASE_URL}/emergencycontacts`;
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return await safeJson(res, url);
  } catch (error) {
    console.error('Fetch Emergency Contacts API error:', error);
    throw error;
  }
};

export const updateEmergencyContact = async (token, contactId, contactData) => {
  try {
    const url = `${BASE_URL}/emergencycontacts/${contactId}`;
    const res = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(contactData),
    });

    return await safeJson(res, url);
  } catch (error) {
    console.error('Update Emergency Contact API error:', error);
    throw error;
  }
};

export const fetchHRRequests = async (token) => {
  try {
    const url = `${BASE_URL}/hr-requests/my`;
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return await safeJson(res, url);
  } catch (error) {
    console.error('Fetch HR Requests API error:', error);
    throw error;
  }
};

export const fetchAllHRRequests = async (token) => {
  try {
    const url = `${BASE_URL}/hr-requests/all`;
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return await safeJson(res, url);
  } catch (error) {
    console.error('Fetch All HR Requests API error:', error);
    throw error;
  }
};

export const addEmergencyContact = async (token, contactData) => {
  try {
    const url = `${BASE_URL}/emergencycontacts`;
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(contactData),
    });

    return await safeJson(res, url);
  } catch (error) {
    console.error('Add Emergency Contact API error:', error);
    throw error;
  }
};
