import instance from '../axios';

const registerUser = async (data) => {
  const response = await instance.post('/register', data);
  return response;
};

export default registerUser;
