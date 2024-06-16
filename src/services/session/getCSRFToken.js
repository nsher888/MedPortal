import instance from '../axios';

const getCSRFToken = async () => {
  const response = await instance.get('/sanctum/csrf-cookie');
  return response;
};

export default getCSRFToken;
