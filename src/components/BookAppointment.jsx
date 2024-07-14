import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

import { bookAppointment } from '../services/booking/availabilities';

const BookAppointment = ({ timeSlotId, onClose }) => {
  const queryClient = useQueryClient();
  const mutation = useMutation(bookAppointment, {
    onSuccess: () => {
      queryClient.invalidateQueries('timeSlots');
      queryClient.invalidateQueries('appointments');
      onClose();
      toast.success('Appointment booked successfully');
    },
  });

  return (
    <button
      onClick={() => mutation.mutate({ timeSlotId })}
      className='px-2 py-1 text-xs text-white bg-green-500 rounded-md hover:bg-green-600'
    >
      Book
    </button>
  );
};

export default BookAppointment;
