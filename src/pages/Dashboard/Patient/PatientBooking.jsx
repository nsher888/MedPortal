import Modal from '../../../components/Modal';
import TimeSlotList from '../../../components/TimeSlotList';
import ViewAppointments from '../../../components/ViewAppointments';

import usePatientBooking from './usePatientBooking';

const PatientBooking = () => {
  const {
    clinicId,
    setClinicId,
    doctorId,
    setDoctorId,
    date,
    setDate,
    step,
    handleNextStep,
    handlePreviousStep,
    isModalOpen,
    handleOpenModal,
    handleCloseModal,
    handleAppointmentBooked,
    clinics,
    clinicsLoading,
    clinicsError,
    doctors,
    doctorsLoading,
    doctorsError,
    filteredMonths,
    dates,
    isDateAvailable,
    selectedMonth,
    setSelectedMonth,
    setSelectedYear,
    currentMonth,
    currentYear,
    availableDates,
  } = usePatientBooking();

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
                    const tbilisiDate = new Date(d).toLocaleDateString(
                      'en-CA',
                      { timeZone: 'Asia/Tbilisi' },
                    );
                    const available = isDateAvailable(tbilisiDate);
                    return (
                      <button
                        key={d.toDateString()}
                        onClick={() => setDate(tbilisiDate)}
                        className={`px-3 py-2 text-sm rounded-md min-h-24 ${
                          date === tbilisiDate
                            ? 'bg-blue-500 text-white'
                            : available
                              ? 'bg-gray-200 text-gray-700'
                              : 'bg-red-200 text-red-700'
                        }`}
                        disabled={!available}
                      >
                        {d.toLocaleDateString('en-CA', {
                          timeZone: 'Asia/Tbilisi',
                        })}
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
