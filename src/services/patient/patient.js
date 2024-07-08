import instance from '../axios';

export const getPatientResults = async (params) => {
  const { data } = await instance.get('api/patients/results', { params });
  return data.data;
};

export const getAllClinics = async () => {
  const { data } = await instance.get('api/patient/clinics');
  return data;
};
