import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
  withCredentials: true,
  withXSRFToken: true,
});

export default instance;
