import instance from '../axios';

export const fetchAvailabilities = async () => {
  const { data } = await instance.get('/api/availabilities');
  return data;
};

export const setAvailability = async (availability) => {
  const { data } = await instance.post('/api/availabilities', availability);
  return data;
};

export const setMultipleAvailabilities = async (availability) => {
  const { data } = await instance.post(
    '/api/availabilities/multiple',
    availability,
  );
  return data;
};

export const cancelAppointment = async (id) => {
  const response = await instance.delete(`/api/appointments/${id}`);
  return response;
};

export const getAvailableDates = async (id) => {
  const response = await instance.get(`/api/appointments/dates/${id}`);
  return response.data;
};

export const fetchTimeSlots = async (doctorId, date) => {
  const response = await instance.get('/api/time-slots', {
    params: { doctor_id: doctorId, date },
  });
  return response.data;
};

export const fetchDoctorTimeslots = async (date) => {
  const response = await instance.get('/api/time-slots/doctor', {
    params: { date },
  });
  return response.data;
};

export const cancelTimeSlot = async (id) => {
  const response = await instance.delete(`/api/time-slots/${id}`);
  return response;
};

export const toggleTimeSlotAvailability = async (id) => {
  const response = await instance.post(`/api/time-slots/${id}`);
  return response;
};

export const fetchAppointments = async () => {
  const response = await instance.get('/api/appointments');
  return response.data;
};

export const bookAppointment = async ({ timeSlotId, doctorId, userId }) => {
  await instance.post('/api/appointments', {
    time_slot_id: timeSlotId,
    doctor_id: doctorId,
    user_id: userId,
  });
};

export const cancelAvailability = async (id) => {
  const response = await instance.delete(`/api/availabilities/${id}`);
  return response;
};
