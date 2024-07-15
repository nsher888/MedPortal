import { useState } from 'react';
import { useQuery } from 'react-query';

import { getAvailableDates } from '../../../services/booking/availabilities';
import { getClinicDoctors } from '../../../services/doctors/doctors';
import { getAllClinics } from '../../../services/patient/patient';

const usePatientBooking = () => {
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
    const tbilisiDate = new Date(date).toLocaleDateString('en-CA', {
      timeZone: 'Asia/Tbilisi',
    });
    return availableDates?.includes(tbilisiDate);
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

  return {
    clinicId,
    setClinicId,
    doctorId,
    setDoctorId,
    date,
    setDate,
    step,
    setStep,
    selectedMonth,
    setSelectedMonth,
    selectedYear,
    setSelectedYear,
    isModalOpen,
    setIsModalOpen,
    clinics,
    clinicsLoading,
    clinicsError,
    doctors,
    doctorsLoading,
    doctorsError,
    availableDates,
    handleNextStep,
    handlePreviousStep,
    handleOpenModal,
    handleCloseModal,
    handleAppointmentBooked,
    generateDates,
    isDateAvailable,
    filteredMonths,
    dates,
    currentMonth,
    currentYear,
  };
};

export default usePatientBooking;
