import { BASE_URL, safeJson } from './urls';


export const submitReimbursement = async (formData, token) => {
  try {
    const res = await fetch(`${BASE_URL}/rmb`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    });

    return await safeJson(res, typeof url !== "undefined" ? url : res.url);
  } catch (err) {
    console.error('Submit Reimbursement Error:', err);
    throw err;
  }
};

export const getMyReimbursements = async (token) => {
  try {
    const res = await fetch(`${BASE_URL}/rmb/my`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return await safeJson(res, res.url);
  } catch (err) {
    console.error('Fetch My Reimbursements Error:', err);
    throw err;
  }
};

export const getAllReimbursements = async (token) => {
  try {
    const res = await fetch(`${BASE_URL}/rmb/all`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return await safeJson(res, res.url);
  } catch (err) {
    console.error('Fetch All Reimbursements Error:', err);
    throw err;
  }
};


export const getReimbursementById = async (claimId, token) => {
  try {
    const res = await fetch(`${BASE_URL}/rmb/${claimId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return await safeJson(res, res.url);
  } catch (err) {
    console.error('Fetch Reimbursement By ID Error:', err);
    throw err;
  }
};


export const updateReimbursement = async (claimId, updatedData, token) => {
  try {
    const res = await fetch(`${BASE_URL}/rmb/${claimId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedData)
    });

    return await safeJson(res, res.url);
  } catch (err) {
    console.error('Update Reimbursement Error:', err);
    throw err;
  }
};


export const deleteReimbursement = async (claimId, token) => {
  try {
    const res = await fetch(`${BASE_URL}/rmb/${claimId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return await safeJson(res, res.url);
  } catch (err) {
    console.error('Delete Reimbursement Error:', err);
    throw err;
  }
};


export const updateReimbursementStatus = async (claimId, status, remarks, token) => {
  try {
    const res = await fetch(`${BASE_URL}/rmb/${claimId}/status`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status, remarks })
    });

    return await safeJson(res, res.url);
  } catch (err) {
    console.error('Update Reimbursement Status Error:', err);
    throw err;
  }
};


// Components

export const getAllComponents = async (token) => {
  try {
    const res = await fetch(`${BASE_URL}/rmb/components`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    return await safeJson(res, typeof url !== "undefined" ? url : res.url);
  } catch (err) {
    console.error('Get All Components Error:', err);
    throw err;
  }
};

export const getComponentById = async (id, token) => {
  try {
    const res = await fetch(`${BASE_URL}/rmb/components/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    return await safeJson(res, typeof url !== "undefined" ? url : res.url);
  } catch (err) {
    console.error('Get Component Error:', err);
    throw err;
  }
};


export const createComponent = async (data, token) => {
  try {
    const res = await fetch(`${BASE_URL}/rmb/components`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    return await safeJson(res, typeof url !== "undefined" ? url : res.url);
  } catch (err) {
    console.error('Create Component Error:', err);
    throw err;
  }
};

export const updateComponent = async (id, data, token) => {
  try {
    const res = await fetch(`${BASE_URL}/rmb/components/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    return await safeJson(res, typeof url !== "undefined" ? url : res.url);
  } catch (err) {
    console.error('Update Component Error:', err);
    throw err;
  }
};


export const deleteComponent = async (id, token) => {
  try {
    const res = await fetch(`${BASE_URL}/rmb/components/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });

    return await safeJson(res, typeof url !== "undefined" ? url : res.url);
  } catch (err) {
    console.error('Delete Component Error:', err);
    throw err;
  }
};


// eligibility for an employee

export const getEligibilitiesByEmployee = async ( token) => {
  try {
    const res = await fetch(`${BASE_URL}/rmb/eligibilities/employee/${employeeId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    return await safeJson(res, typeof url !== "undefined" ? url : res.url);
  } catch (err) {
    console.error('Get Eligibilities Error:', err);
    throw err;
  }
};

export const getEligibilitiesSelf = async ( token) => {
  try {
    const res = await fetch(`${BASE_URL}/rmb/eligibilities/my`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    return await safeJson(res, typeof url !== "undefined" ? url : res.url);
  } catch (err) {
    console.error('Get Eligibilities Error:', err);
    throw err;
  }
};


export const createEligibility = async (data, token) => {
  try {
    const res = await fetch(`${BASE_URL}/rmb/eligibilities`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    return await safeJson(res, typeof url !== "undefined" ? url : res.url);
  } catch (err) {
    console.error('Create Eligibility Error:', err);
    throw err;
  }
};

export const updateEligibility = async (id, data, token) => {
  try {
    const res = await fetch(`${BASE_URL}/rmb/eligibilities/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    return await safeJson(res, typeof url !== "undefined" ? url : res.url);
  } catch (err) {
    console.error('Update Eligibility Error:', err);
    throw err;
  }
};


export const deleteEligibility = async (id, token) => {
  try {
    const res = await fetch(`${BASE_URL}/rmb/eligibilities/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });

    return await safeJson(res, typeof url !== "undefined" ? url : res.url);
  } catch (err) {
    console.error('Delete Eligibility Error:', err);
    throw err;
  }
};

