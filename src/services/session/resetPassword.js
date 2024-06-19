import instance from '../axios';

export const forgotPassword = async (email) => {
  const response = await instance.post('/forgot-password', { email });
  return response;
};

export const resetPassword = async (data) => {
  const response = await instance.post('/reset-password', data);
  return response;
};
