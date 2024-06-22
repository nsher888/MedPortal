import instance from '../axios';

export const getDoctorsList = async () => {
  const response = await instance.get('api/doctors');
  return response;
};

export const destroyDoctor = async (id) => {
  const response = await instance.delete(`api/doctors/${id}`);
  return response;
};

export const getDoctorById = async (id) => {
  const response = await instance.get(`api/doctors/${id}`);
  return response;
};

export const updateDoctor = async (doctor) => {
  const response = await instance.post(`api/doctors/${doctor.id}`, doctor);
  return response;
};

export const addDoctor = async (doctor) => {
  const response = await instance.post('api/doctors', doctor);
  return response;
};
