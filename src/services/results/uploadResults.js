import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'multipart/form-data',
  },
  withCredentials: true,
  withXSRFToken: true,
});

export const storeResult = async (data) => {
  const { data: result } = await instance.post('api/test-results', data);
  return result;
};
