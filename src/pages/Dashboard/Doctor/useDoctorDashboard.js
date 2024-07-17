import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  cancelAvailability,
  cancelTimeSlot,
  fetchAvailabilities,
  fetchDoctorTimeslots,
  toggleTimeSlotAvailability,
} from '../../../services/booking/availabilities';
import { useAuth } from './../../../hooks/useAuth';
import { format } from 'date-fns';

const useDoctorDashboard = () => {
  const [date, setDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMultiDateModalOpen, setIsMultiDateModalOpen] = useState(false);
  const [currentAvailabilityId, setCurrentAvailabilityId] = useState(null);
  const queryClient = useQueryClient();

  const {
    data: availabilities,
    isLoading,
    error,
  } = useQuery('availabilities', fetchAvailabilities);

  const handleDateChange = (date) => {
    if (date >= new Date().setHours(0, 0, 0, 0)) {
      setDate(date);
      setIsModalOpen(true);
      setCurrentAvailabilityId(getAvailabilityIdForDate(date));
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCloseMultiDateModal = () => {
    setIsMultiDateModalOpen(false);
  };

  const getAvailabilityForDate = (date) => {
    if (!availabilities) return null;
    const dateString = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    const availability = availabilities.find(
      (avail) => avail.date === dateString,
    );
    return availability
      ? `${availability.start_time.slice(0, 5)} - ${availability.end_time.slice(0, 5)}`
      : null;
  };

  const getAvailabilityIdForDate = (date) => {
    if (!availabilities) return null;
    const dateString = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    const availability = availabilities.find(
      (avail) => avail.date === dateString,
    );
    return availability ? availability.id : null;
  };

  const deleteAvailabilityMutation = useMutation(cancelAvailability, {
    onSuccess: () => {
      queryClient.invalidateQueries('availabilities');
    },
  });

  const handleCancelAvailability = () => {
    if (currentAvailabilityId) {
      deleteAvailabilityMutation.mutate(currentAvailabilityId);
      handleCloseModal();
    }
  };

  const { profile } = useAuth();
  const doctorId = profile?.id;
  const formattedDate = format(new Date(date), 'yyyy-MM-dd');

  const [availabilityModal, setAvailabilityModal] = useState(false);

  const handleAvailablityModal = () => {
    setAvailabilityModal(true);
  };

  const { data: timeSlots } = useQuery(
    ['timeSlots', doctorId, formattedDate],
    () => fetchDoctorTimeslots(formattedDate),
    {
      enabled: !!doctorId && !!formattedDate,
    },
  );

  const cancelTimeSlotMutation = useMutation(cancelTimeSlot, {
    onSuccess: () => {
      queryClient.invalidateQueries(['timeSlots', doctorId, formattedDate]);
    },
  });

  const toggleTimeSlotMutation = useMutation(toggleTimeSlotAvailability, {
    onSuccess: () => {
      queryClient.invalidateQueries(['timeSlots', doctorId, formattedDate]);
    },
  });

  const handleCancelBooking = (id) => {
    cancelTimeSlotMutation.mutate(id);
  };

  const toggleTimeSlotStatus = (id) => {
    toggleTimeSlotMutation.mutate(id);
  };

  return {
    date,
    setDate,
    isModalOpen,
    timeSlots,
    handleCancelBooking,
    handleAvailablityModal,
    availabilityModal,
    setIsModalOpen,
    isMultiDateModalOpen,
    toggleTimeSlotStatus,
    setIsMultiDateModalOpen,
    currentAvailabilityId,
    setCurrentAvailabilityId,
    availabilities,
    isLoading,
    error,
    handleDateChange,
    setAvailabilityModal,
    handleCloseModal,
    handleCloseMultiDateModal,
    getAvailabilityForDate,
    handleCancelAvailability,
  };
};

export default useDoctorDashboard;
