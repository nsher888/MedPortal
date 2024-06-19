import instance from '../axios';

const logOutUser = async () => {
  const response = await instance.post('/logout');
  return response;
};

export default logOutUser;
