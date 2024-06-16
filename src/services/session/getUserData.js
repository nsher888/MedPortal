import instance from '../axios';

const getUserData = async () => {
  const response = await instance.get('/api/user');
  return response;
};

export default getUserData;
