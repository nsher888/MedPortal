import Calendar from 'react-calendar';

import 'react-calendar/dist/Calendar.css';
import AvailabilityForm from '../../../components/AvailabilityForm';
import Modal from '../../../components/Modal';
import MultiDateAvailabilityForm from '../../../components/MultiDateAvailabilityForm';

import useDoctorDashboard from './useDoctorDashboard';
import '../../../css/DoctorDashboard.css';

const DoctorDashboard = () => {
  const {
    date,
    isModalOpen,
    isMultiDateModalOpen,
    setIsMultiDateModalOpen,
    currentAvailabilityId,
    isLoading,
    error,
    handleDateChange,
    handleCloseModal,
    handleCloseMultiDateModal,
    getAvailabilityForDate,
    handleCancelAvailability,
  } = useDoctorDashboard();

  const tileDisabled = ({ date, view }) => {
    return view === 'month' && date < new Date().setHours(0, 0, 0, 0);
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
              tileDisabled={tileDisabled}
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
            footer={
              currentAvailabilityId && (
                <button
                  onClick={handleCancelAvailability}
                  className='px-4 py-2 font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                >
                  Cancel Availability for the Day
                </button>
              )
            }
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
