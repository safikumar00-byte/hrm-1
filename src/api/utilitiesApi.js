import { BASE_URL, safeJson } from './urls';

export const fetchAadharPanLink = async (token) => {
  const url = `${BASE_URL}/utilities/aadhar-pan-link`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return await safeJson(response, url);
};
