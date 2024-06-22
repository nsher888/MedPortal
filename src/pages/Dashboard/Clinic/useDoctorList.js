import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

import {
  addDoctor,
  destroyDoctor,
  getDoctorsList,
} from '../../../services/doctors/doctors';

export const useDoctorList = () => {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data: doctors,
    isLoading,
    isError,
    error,
  } = useQuery('doctors', getDoctorsList);

  const deleteDoctorMutation = useMutation(destroyDoctor, {
    onSuccess: () => {
      queryClient.invalidateQueries('doctors');
    },
  });

  const addDoctorMutation = useMutation(addDoctor, {
    onSuccess: () => {
      queryClient.invalidateQueries('doctors');
      toast.success('Doctor added successfully');
      setIsModalOpen(false);
    },
  });

  const handleDeleteDoctor = async (id) => {
    try {
      deleteDoctorMutation.mutate(id);
      toast.success('Doctor deleted successfully');
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddDoctor = async (data) => {
    try {
      addDoctorMutation.mutate(data);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    doctors,
    isLoading,
    isError,
    error,
    isModalOpen,
    setIsModalOpen,
    handleDeleteDoctor,
    handleAddDoctor,
  };
};
