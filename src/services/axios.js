import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
  withCredentials: true,
  withXSRFToken: true,
});

export default instance;
