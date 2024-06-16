import instance from '../axios';

const logInUser = async (data) => {
  const response = await instance.post('/login', data);
  return response;
};

export default logInUser;
