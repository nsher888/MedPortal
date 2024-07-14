import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

import {
  cancelAppointment,
  fetchAppointments,
} from '../services/booking/availabilities';

const ViewAppointments = () => {
  const queryClient = useQueryClient();

  const {
    data: appointments,
    isLoading,
    error,
  } = useQuery('appointments', fetchAppointments);

  const deleteAppointmentMutation = useMutation(cancelAppointment, {
    onSuccess: () => {
      queryClient.invalidateQueries('appointments');
    },
  });

  const handleCancelAppointment = async (id) => {
    try {
      deleteAppointmentMutation.mutate(id);
      toast.success('Appointment cancelled successfully');
    } catch (error) {
      console.error('Error cancelling appointment:', error);
      toast.error('Failed to cancel appointment');
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading appointments</div>;

  const now = new Date();

  const futureAppointments = appointments.filter((appointment) => {
    const appointmentDate = new Date(
      `${appointment.date} ${appointment.start_time}`,
    );
    return appointmentDate >= now;
  });

  if (futureAppointments.length === 0) {
    return (
      <div className='text-center text-gray-700'>No upcoming appointments</div>
    );
  }

  return (
    <div className='mt-8'>
      <h2 className='mb-4 text-2xl font-bold text-gray-800'>
        Your Appointments
      </h2>
      <div className='grid grid-cols-1 gap-6 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4'>
        {futureAppointments.map((appointment) => (
          <div
            key={appointment.id}
            className='p-6 bg-white border rounded-md shadow-sm max-w-72'
          >
            <div className='mb-2 text-gray-700'>
              <span className='font-semibold'>Date:</span> {appointment.date}
            </div>
            <div className='mb-2 text-gray-700'>
              <span className='font-semibold'>Time:</span>{' '}
              {appointment.start_time}
            </div>
            <div className='mb-2 text-gray-700'>
              <span className='font-semibold'>Doctor:</span>{' '}
              {appointment.doctor}
            </div>
            <div className='mb-2 text-gray-700'>
              <span className='font-semibold'>Status:</span>{' '}
              {appointment.status}
            </div>
            <button
              onClick={() => handleCancelAppointment(appointment.id)}
              className='px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600'
            >
              Cancel Appointment
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewAppointments;
