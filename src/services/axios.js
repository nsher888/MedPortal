import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
    'X-Requested-With': 'XMLHttpRequest',
  },
  withCredentials: true,
  withXSRFToken: true,
});

export const setBearerToken = (token) => {
  instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export default instance;
