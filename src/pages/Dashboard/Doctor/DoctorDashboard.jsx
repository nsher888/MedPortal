import { useEffect } from 'react';
import Calendar from 'react-calendar';

import 'react-calendar/dist/Calendar.css';
import AvailabilityForm from '../../../components/AvailabilityForm';
import Modal from '../../../components/Modal';
import MultiDateAvailabilityForm from '../../../components/MultiDateAvailabilityForm';
import '../../../css/DoctorDashboard.css';
import useEcho from '../../../hooks/echo';
import { useAuth } from '../../../hooks/useAuth';

import useDoctorDashboard from './useDoctorDashboard';

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
    timeSlots,
    availabilityModal,
    toggleTimeSlotStatus,
    handleCancelBooking,
    setAvailabilityModal,
    handleAvailablityModal,
    handleCloseMultiDateModal,
    getAvailabilityForDate,
    handleCancelAvailability,
  } = useDoctorDashboard();

  const tileDisabled = ({ date, view }) => {
    return view === 'month' && date < new Date().setHours(0, 0, 0, 0);
  };

  const { profile } = useAuth();
  const echo = useEcho();

  useEffect(() => {
    if (echo && profile) {
      const channel = echo.private(`appointment.${profile.id}`);

      channel.listen('AppointmentBooked', (e) => {
        console.log('Appointment booked:', e);
      });

      return () => {
        channel.stopListening('AppointmentBooked');
        echo.leave(`appointment.${profile.id}`);
      };
    }
  }, [echo, profile]);

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
          <div className='flex items-center justify-between gap-8 mt-4 md:mt-0'>
            <button
              onClick={() => setIsMultiDateModalOpen(true)}
              className='px-4 py-2 font-bold text-white rounded-lg bg-customBlue hover:bg-customBlueHover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-customBlue'
            >
              Set Availability for Multiple Dates
            </button>
          </div>
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
                <div className='flex items-center justify-between gap-8'>
                  <button
                    onClick={handleAvailablityModal}
                    className='px-4 py-2 font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                  >
                    View Time Slots
                  </button>
                  <button
                    onClick={handleCancelAvailability}
                    className='px-4 py-2 font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                  >
                    Cancel Availability for the Day
                  </button>
                </div>
              )
            }
            className='p-6 bg-white rounded-lg shadow-lg'
          >
            <AvailabilityForm selectedDate={date} onClose={handleCloseModal} />
          </Modal>

          <Modal
            isOpen={availabilityModal}
            onClose={() => setAvailabilityModal(false)}
            title='Time Slots for the Day'
            footer={null}
            className='p-6 overflow-y-auto bg-white rounded-lg shadow-lg max-h-[70vh]'
          >
            <div className='mt-2'>
              {timeSlots && timeSlots.length > 0 ? (
                <div className='overflow-x-auto'>
                  <table className='min-w-full divide-y divide-gray-200'>
                    <thead>
                      <tr>
                        <th className='px-6 py-3 text-xs font-medium tracking-wider text-gray-500 uppercase'>
                          Time
                        </th>
                        <th className='px-6 py-3 text-xs font-medium tracking-wider text-gray-500 uppercase'>
                          Status
                        </th>
                        <th className='px-6 py-3 text-xs font-medium tracking-wider text-gray-500 uppercase'>
                          Patient
                        </th>
                        <th className='px-6 py-3 text-xs font-medium tracking-wider text-gray-500 uppercase'>
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className='bg-white divide-y divide-gray-200'>
                      {timeSlots.map((slot) => (
                        <tr key={slot.id} className='hover:bg-gray-100'>
                          <td className='px-6 py-4 text-sm text-gray-900 whitespace-nowrap'>
                            {slot.start_time}
                          </td>
                          <td className='px-6 py-4 text-sm whitespace-nowrap'>
                            <span
                              className={`px-2 py-1 font-bold rounded-full capitalize ${
                                slot.status === 'booked'
                                  ? 'bg-red-100 text-red-800'
                                  : slot.status === 'free'
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-gray-100 text-gray-800'
                              }`}
                            >
                              {slot.status}
                            </span>
                          </td>
                          <td className='px-6 py-4 text-sm text-gray-900 whitespace-nowrap'>
                            {slot.status === 'booked'
                              ? `${slot.patient_name} ${slot.patient_surname}`
                              : 'N/A'}
                          </td>
                          <td className='px-6 py-4 text-sm text-gray-900 whitespace-nowrap'>
                            {slot.status === 'booked' && (
                              <button
                                onClick={() => handleCancelBooking(slot.id)}
                                className='px-4 py-2 font-bold text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
                              >
                                Cancel
                              </button>
                            )}

                            {slot.status === 'free' && (
                              <button
                                onClick={() => toggleTimeSlotStatus(slot.id)}
                                className='px-4 py-2 font-bold text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
                              >
                                Make Unavailable
                              </button>
                            )}

                            {slot.status === 'unavailable' && (
                              <button
                                onClick={() => toggleTimeSlotStatus(slot.id)}
                                className='px-4 py-2 font-bold text-white bg-green-500 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
                              >
                                Make Available
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className='text-center text-gray-700'>
                  No available time slots
                </div>
              )}
            </div>
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
