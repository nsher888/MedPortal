import instance from '../axios';

const updateProfile = async (data) => {
  const response = await instance.post('/user/profile', data);
  return response;
};

export default updateProfile;
