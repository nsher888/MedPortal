import { useForm } from 'react-hook-form';

import useAppointments from '../hooks/useAppointments';

const MultiDateAvailabilityForm = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { useSetMultipleAvailabilities } = useAppointments();
  const { mutate } = useSetMultipleAvailabilities();

  const onSubmit = (data) => {
    mutate({
      start_date: data.startDate,
      end_date: data.endDate,
      start_time: data.startTime,
      end_time: data.endTime,
    });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
      <div>
        <label className='block mb-2 text-sm font-bold text-gray-700'>
          Start Date:
        </label>
        <input
          type='date'
          {...register('startDate', { required: true })}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-customBlue ${errors.startDate ? 'border-red-500' : ''}`}
        />
        {errors.startDate && (
          <span className='text-sm text-red-500'>Start Date is required</span>
        )}
      </div>
      <div>
        <label className='block mb-2 text-sm font-bold text-gray-700'>
          End Date:
        </label>
        <input
          type='date'
          {...register('endDate', { required: true })}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-customBlue ${errors.endDate ? 'border-red-500' : ''}`}
        />
        {errors.endDate && (
          <span className='text-sm text-red-500'>End Date is required</span>
        )}
      </div>
      <div>
        <label className='block mb-2 text-sm font-bold text-gray-700'>
          Start Time:
        </label>
        <input
          type='time'
          step='1800'
          {...register('startTime', { required: true })}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-customBlue ${errors.startTime ? 'border-red-500' : ''}`}
        />
        {errors.startTime && (
          <span className='text-sm text-red-500'>Start Time is required</span>
        )}
      </div>
      <div>
        <label className='block mb-2 text-sm font-bold text-gray-700'>
          End Time:
        </label>
        <input
          type='time'
          step='1800'
          {...register('endTime', { required: true })}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-customBlue ${errors.endTime ? 'border-red-500' : ''}`}
        />
        {errors.endTime && (
          <span className='text-sm text-red-500'>End Time is required</span>
        )}
      </div>
      <div className='flex items-center justify-center'>
        <button
          type='submit'
          className='px-4 py-2 font-bold text-white rounded-lg bg-customBlue hover:bg-customBlueHover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-customBlue'
        >
          Set Availability
        </button>
      </div>
    </form>
  );
};

export default MultiDateAvailabilityForm;
