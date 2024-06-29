import instance from '../axios';

export const getDoctorsList = async (page = 1, perPage = 10) => {
  const response = await instance.get(
    `api/doctors?page=${page}&per_page=${perPage}`,
  );
  return response.data;
};

export const getAllDoctors = async () => {
  const response = await instance.get('api/doctors/all');
  return response.data;
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
