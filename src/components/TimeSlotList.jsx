import { useQuery } from 'react-query';

import { fetchTimeSlots } from '../services/booking/availabilities';

import BookAppointment from './BookAppointment';

const TimeSlotList = ({ doctorId, date, onClose }) => {
  const {
    data: timeSlots,
    isLoading,
    error,
  } = useQuery(
    ['timeSlots', doctorId, date],
    () => fetchTimeSlots(doctorId, date),
    {
      enabled: !!doctorId && !!date,
    },
  );

  if (isLoading)
    return <div className='text-center text-gray-600'>Loading...</div>;
  if (error)
    return (
      <div className='text-center text-red-500'>Error loading time slots</div>
    );

  return (
    <div className='mt-2'>
      {timeSlots && timeSlots.length > 0 ? (
        <div className='overflow-y-auto max-h-80'>
          <div className='grid grid-cols-2 gap-2'>
            {timeSlots.map((slot) => (
              <div
                key={slot.id}
                className='flex items-center justify-between p-2 bg-white rounded-lg shadow-sm hover:shadow-md'
              >
                <span className='text-sm text-gray-700'>{slot.start_time}</span>
                <BookAppointment timeSlotId={slot.id} onClose={onClose} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className='text-center text-gray-700'>No available time slots</div>
      )}
    </div>
  );
};

export default TimeSlotList;
