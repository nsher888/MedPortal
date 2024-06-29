import instance from '../axios';

export const getClinicStatistics = async () => {
  const response = await instance.get('api/clinics/statistics');
  return response;
};
