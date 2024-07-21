import instance from '../axios';

export const getDoctorsList = async (page = 1, perPage = 10, search) => {
  const response = await instance.get('api/doctors', {
    params: {
      page,
      per_page: perPage,
      search,
    },
  });
  return response.data;
};

export const getAllDoctors = async (search = '') => {
  const response = await instance.get('api/doctors/all', {
    params: { search },
  });
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

export const getDoctorsSuggestions = async (search) => {
  const response = await instance.get('api/doctors/suggestions', {
    params: {
      search,
    },
  });
  return response;
};

export const doctorsList = async () => {
  try {
    const response = await instance.get('api/doctor-list');
    return response.data;
  } catch (error) {
    console.error('Error fetching doctors list:', error);
    throw error;
  }
};

export const getClinicDoctors = async (clinicId) => {
  const response = await instance.get(`api/clinics/${clinicId}/doctors`);
  return response.data;
};
