import instance, { setBearerToken } from '../axios';

const logInUser = async (data) => {
  const response = await instance.post('/login', data);
  setBearerToken(response.data.token);
  return response;
};

export default logInUser;
