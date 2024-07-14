import { useState } from 'react';
import { useQuery } from 'react-query';

import Modal from '../../../components/Modal';
import TimeSlotList from '../../../components/TimeSlotList';
import ViewAppointments from '../../../components/ViewAppointments';
import { getAvailableDates } from '../../../services/booking/availabilities';
import { getClinicDoctors } from '../../../services/doctors/doctors';
import { getAllClinics } from '../../../services/patient/patient';

const PatientBooking = () => {
  const [clinicId, setClinicId] = useState('');
  const [doctorId, setDoctorId] = useState('');
  const [date, setDate] = useState('');
  const [step, setStep] = useState(1);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data: clinics,
    isLoading: clinicsLoading,
    error: clinicsError,
  } = useQuery('clinics', getAllClinics);

  const {
    data: doctors,
    isLoading: doctorsLoading,
    error: doctorsError,
  } = useQuery(['doctors', clinicId], () => getClinicDoctors(clinicId), {
    enabled: !!clinicId,
  });

  const { data: availableDates } = useQuery(
    ['availableDates', doctorId],
    () => getAvailableDates(doctorId),
    {
      enabled: !!doctorId,
    },
  );

  const handleNextStep = () => setStep(step + 1);
  const handlePreviousStep = () => setStep(step - 1);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setClinicId('');
    setDoctorId('');
    setDate('');
    setStep(1);
    setSelectedMonth(new Date().getMonth());
    setSelectedYear(new Date().getFullYear());
  };

  const handleAppointmentBooked = () => {
    handleCloseModal();
  };

  const generateDates = () => {
    const dates = [];
    const today = new Date();
    const startDate = new Date(selectedYear, selectedMonth, 1);
    const endDate = new Date(selectedYear, selectedMonth + 1, 0);

    for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
      if (d >= today) {
        dates.push(new Date(d));
      }
    }
    return dates;
  };

  const dates = generateDates();

  const isDateAvailable = (date) => {
    return availableDates?.includes(date);
  };

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const filteredMonths = monthNames.slice(currentMonth);

  if (clinicsLoading)
    return <div className='text-center text-gray-600'>Loading clinics...</div>;
  if (clinicsError)
    return (
      <div className='text-center text-red-500'>
        Error loading clinics: {clinicsError.message}
      </div>
    );

  return (
    <div className='p-8 mx-auto rounded-lg '>
      <h1 className='mb-6 text-3xl font-bold text-center text-gray-800'>
        Appointment Booking System
      </h1>
      <button
        onClick={handleOpenModal}
        className='px-4 py-2 mb-6 text-white bg-blue-500 rounded-md hover:bg-blue-600'
      >
        Book an Appointment
      </button>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title='Book an Appointment'
        className={step === 3 ? 'max-w-4xl' : 'max-w-lg'}
        footer={
          <div className='flex justify-between mt-4'>
            {step > 1 && (
              <button
                onClick={handlePreviousStep}
                className='px-2 py-1 text-white transition-colors bg-gray-500 rounded-md hover:bg-gray-600'
              >
                Back
              </button>
            )}
            {step < 3 && (
              <button
                onClick={handleNextStep}
                className='px-2 py-1 text-white transition-colors bg-blue-500 rounded-md hover:bg-blue-600'
              >
                Next
              </button>
            )}
          </div>
        }
      >
        <div className='p-4 bg-white rounded-lg '>
          {step === 1 && (
            <div className='mb-4'>
              <label className='block mb-2'>
                <span className='text-gray-700'>Clinic:</span>
                <select
                  value={clinicId}
                  onChange={(e) => {
                    setClinicId(e.target.value);
                    setDoctorId('');
                  }}
                  className='block w-full mt-1 border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500'
                >
                  <option value=''>Select Clinic</option>
                  {clinics.map((clinic) => (
                    <option key={clinic.id} value={clinic.id}>
                      {clinic.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          )}

          {step === 2 && (
            <div className='mb-4'>
              <label className='block mb-2'>
                <span className='text-gray-700 '>Doctor:</span>
                <select
                  value={doctorId}
                  onChange={(e) => setDoctorId(e.target.value)}
                  className='block w-full py-2 mt-4 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500'
                  disabled={doctorsLoading}
                >
                  <option value=''>Select Doctor</option>
                  {doctors &&
                    doctors.map((doctor) => (
                      <option key={doctor.id} value={doctor.id}>
                        {doctor.name} {doctor.surname}
                      </option>
                    ))}
                </select>
                {doctorsLoading && (
                  <div className='text-center text-gray-600'>
                    Loading doctors...
                  </div>
                )}
                {doctorsError && (
                  <div className='text-center text-red-500'>
                    Error loading doctors: {doctorsError.message}
                  </div>
                )}
              </label>
            </div>
          )}

          {step === 3 && (
            <div className='mb-4'>
              <label className='block mb-2'>
                <span className='text-gray-700'>Month:</span>
                <select
                  value={selectedMonth}
                  onChange={(e) => {
                    setSelectedMonth(parseInt(e.target.value));
                    setSelectedYear(currentYear);
                  }}
                  className='block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500'
                >
                  {filteredMonths.map((month, index) => (
                    <option key={index} value={currentMonth + index}>
                      {month}
                    </option>
                  ))}
                </select>
              </label>
              <label className='block mb-2'>
                <span className='text-gray-700'>Date:</span>
                <div className='flex py-2 space-x-2 overflow-x-auto'>
                  {dates.map((d) => {
                    const formattedDate = d.toISOString().split('T')[0];
                    const available = isDateAvailable(formattedDate);
                    return (
                      <button
                        key={d.toDateString()}
                        onClick={() => setDate(formattedDate)}
                        className={`px-3 py-2 text-sm rounded-md ${
                          date === formattedDate
                            ? 'bg-blue-500 text-white'
                            : available
                              ? 'bg-gray-200 text-gray-700'
                              : 'bg-red-200 text-red-700'
                        }`}
                        disabled={!available}
                      >
                        {d.toDateString()}
                      </button>
                    );
                  })}
                </div>
              </label>
              {date && (
                <div>
                  <TimeSlotList
                    doctorId={doctorId}
                    date={date}
                    onClose={handleAppointmentBooked}
                  />
                  {availableDates && !availableDates.includes(date) && (
                    <div className='text-center text-gray-700'>
                      No available time slots for the selected date.
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </Modal>
      <div className='mt-8'>
        <ViewAppointments />
      </div>
    </div>
  );
};

export default PatientBooking;
