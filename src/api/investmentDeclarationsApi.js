import { BASE_URL, safeJson } from './urls';

export const createDeclaration = async (formData, token) => {
  try {
    const res = await fetch(`${BASE_URL}/declarations`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    });

    return await safeJson(res, typeof url !== "undefined" ? url : res.url);
  } catch (err) {
    console.error('Create Declaration Error:', err);
    throw err;
  }
};


export const getMyDeclarations = async (token) => {
  try {
    const res = await fetch(`${BASE_URL}/declarations/my`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    return await safeJson(res, typeof url !== "undefined" ? url : res.url);
  } catch (err) {
    console.error('Fetch My Declarations Error:', err);
    throw err;
  }
};


export const getAllDeclarations = async (token) => {
  try {
    const res = await fetch(`${BASE_URL}/declarations`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    return await safeJson(res, typeof url !== "undefined" ? url : res.url);
  } catch (err) {
    console.error('Fetch All Declarations Error:', err);
    throw err;
  }
};


export const getDeclarationById = async (id, token) => {
  try {
    const res = await fetch(`${BASE_URL}/declarations/${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    return await safeJson(res, typeof url !== "undefined" ? url : res.url);
  } catch (err) {
    console.error('Get Declaration By ID Error:', err);
    throw err;
  }
};


export const updateDeclaration = async (id, formData, token) => {
  try {
    const res = await fetch(`${BASE_URL}/declarations/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    });

    return await safeJson(res, typeof url !== "undefined" ? url : res.url);
  } catch (err) {
    console.error('Update Declaration Error:', err);
    throw err;
  }
};


export const deleteDeclaration = async (id, token) => {
  try {
    const res = await fetch(`${BASE_URL}/declarations/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return await safeJson(res, typeof url !== "undefined" ? url : res.url);
  } catch (err) {
    console.error('Delete Declaration Error:', err);
    throw err;
  }
};

export const approveDeclaration = async (id, approvalData, token) => {
  try {
    const res = await fetch(`${BASE_URL}/declarations/${id}/approve`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(approvalData)
    });

    return await safeJson(res, typeof url !== "undefined" ? url : res.url);
  } catch (err) {
    console.error('Approve Declaration Error:', err);
    throw err;
  }
};
