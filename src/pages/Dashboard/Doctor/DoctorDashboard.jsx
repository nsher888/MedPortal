import { useState } from 'react';
import Calendar from 'react-calendar';

import 'react-calendar/dist/Calendar.css';
import AvailabilityForm from '../../../components/AvailabilityForm';
import Modal from '../../../components/Modal';
import MultiDateAvailabilityForm from '../../../components/MultiDateAvailabilityForm';

import '../../../css/DoctorDashboard.css';
import { fetchAvailabilities } from '../../../services/booking/availabilities';

import { useQuery } from 'react-query';

const DoctorDashboard = () => {
  const [date, setDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMultiDateModalOpen, setIsMultiDateModalOpen] = useState(false);

  const {
    data: availabilities,
    isLoading,
    error,
  } = useQuery('availabilities', fetchAvailabilities);

  const handleDateChange = (date) => {
    setDate(date);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCloseMultiDateModal = () => {
    setIsMultiDateModalOpen(false);
  };

  const getAvailabilityForDate = (date) => {
    if (!availabilities) return null;
    const dateString = date.toISOString().split('T')[0];
    const availability = availabilities.find(
      (avail) => avail.date === dateString,
    );
    return availability
      ? `${availability.start_time.slice(0, 5)} - ${availability.end_time.slice(0, 5)}`
      : null;
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading availabilities</div>;

  return (
    <>
      <div className='px-4 sm:px-6 lg:px-4'>
        <div className='sm:flex sm:items-center'>
          <div className='sm:flex-auto'>
            <h1 className='text-base font-semibold leading-6 text-gray-900'>
              Doctor Dashboard
            </h1>
            <p className='mt-2 text-sm text-gray-700'>
              Set your availability for the selected date
            </p>
          </div>

          <button
            onClick={() => setIsMultiDateModalOpen(true)}
            className='px-4 py-2 mt-4 font-bold text-white rounded-lg bg-customBlue hover:bg-customBlueHover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-customBlue'
          >
            Set Availability for Multiple Dates
          </button>
        </div>
        <div className='flex flex-col items-center justify-center w-full h-screen mt-2'>
          <div className='w-full h-full p-4'>
            <Calendar
              onChange={handleDateChange}
              value={date}
              tileContent={({ date }) => {
                const availabilityTime = getAvailabilityForDate(date);
                return availabilityTime ? (
                  <div className='text-xs font-semibold text-green-600 availability-indicator'>
                    {availabilityTime}
                  </div>
                ) : null;
              }}
              className='w-full h-full'
              tileClassName='calendar-tile'
            />
          </div>

          <Modal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            title='Set Availability'
            footer={null}
            className='p-6 bg-white rounded-lg shadow-lg'
          >
            <AvailabilityForm selectedDate={date} onClose={handleCloseModal} />
          </Modal>
          <Modal
            isOpen={isMultiDateModalOpen}
            onClose={handleCloseMultiDateModal}
            title='Set Availability for Multiple Dates'
            footer={null}
            className='p-6 bg-white rounded-lg shadow-lg'
          >
            <MultiDateAvailabilityForm onClose={handleCloseMultiDateModal} />
          </Modal>
        </div>
      </div>
    </>
  );
};

export default DoctorDashboard;
