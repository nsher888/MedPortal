import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import useAppointments from '../hooks/useAppointments';

const AvailabilityForm = ({ selectedDate, onClose }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const { useSetAvailability } = useAppointments();
  const { mutate } = useSetAvailability();

  const toLocalISOString = (date) => {
    const tzoffset = date.getTimezoneOffset() * 60000;
    const localISOTime = new Date(date - tzoffset).toISOString().slice(0, -1);
    return localISOTime.split('T')[0];
  };

  useEffect(() => {
    if (selectedDate) {
      console.log('Original selected date:', selectedDate);
      setValue('date', toLocalISOString(selectedDate));
    }
  }, [selectedDate, setValue]);

  const onSubmit = (data) => {
    console.log('Form data before mutation:', data);
    mutate({
      date: data.date,
      start_time: data.startTime,
      end_time: data.endTime,
    });
    if (onClose) onClose();
  };

  return (
    <div className='max-w-lg p-6 mx-auto bg-white rounded-lg shadow-md'>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        <div className='mb-4 text-lg font-semibold text-center'>
          Selected Date: {selectedDate.toDateString()}
        </div>
        <div className='flex flex-col'>
          <label className='mb-2 font-medium text-gray-700'>Date:</label>
          <input
            type='date'
            {...register('date', { required: true })}
            className={`px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.date ? 'border-red-500' : ''}`}
          />
          {errors.date && (
            <span className='text-sm text-red-500'>Date is required</span>
          )}
        </div>
        <div className='flex flex-col'>
          <label className='mb-2 font-medium text-gray-700'>Start Time:</label>
          <input
            type='time'
            step='1800'
            {...register('startTime', { required: true })}
            className={`px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.startTime ? 'border-red-500' : ''}`}
          />
          {errors.startTime && (
            <span className='text-sm text-red-500'>Start Time is required</span>
          )}
        </div>
        <div className='flex flex-col'>
          <label className='mb-2 font-medium text-gray-700'>End Time:</label>
          <input
            type='time'
            step='1800'
            {...register('endTime', { required: true })}
            className={`px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.endTime ? 'border-red-500' : ''}`}
          />
          {errors.endTime && (
            <span className='text-sm text-red-500'>End Time is required</span>
          )}
        </div>
        <button
          type='submit'
          className='w-full py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
        >
          Set Availability
        </button>
      </form>
    </div>
  );
};

export default AvailabilityForm;
