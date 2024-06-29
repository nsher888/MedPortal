import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

import { useAuth } from '../../../hooks/useAuth';
import usePagination from '../../../hooks/usePagination';
import { getAllDoctors } from '../../../services/doctors/doctors';
import { deleteResult, getResults } from '../../../services/results/results';
import { storeResult } from '../../../services/results/uploadResults';
import { getTypes } from '../../../services/shared/types';

export const useManageTestResults = () => {
  const { profile } = useAuth();
  const isDoctor = profile.roles.includes('doctor');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [types, setTypes] = useState([]);
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();

  const { data: doctors } = useQuery('doctors', getAllDoctors);

  const {
    page,
    perPage,
    setTotalPages,
    handlePreviousPage,
    handleNextPage,
    handleFirstPage,
    handleLastPage,
    handlePageChange,
    handlePerPageChange,
  } = usePagination();

  const queryClient = useQueryClient();

  const {
    data: results,
    isLoading,
    isPreviousData,
  } = useQuery(['results', page, perPage], () => getResults(page, perPage), {
    keepPreviousData: true,
    onSuccess: (data) => {
      setTotalPages(data.last_page);
    },
  });

  const addResultMutation = useMutation(storeResult, {
    onSuccess: () => {
      queryClient.invalidateQueries(['results', page, perPage]);
      toast.success('Test result added successfully');
      setIsModalOpen(false);
    },
  });

  const deleteResultMutation = useMutation(deleteResult, {
    onSuccess: () => {
      queryClient.invalidateQueries(['results', page, perPage]);
      toast.success('Test result deleted successfully');
    },
  });

  useEffect(() => {
    const getTestTypes = async () => {
      const response = await getTypes();

      const finalTypes = response.map((type) => ({
        label: type.name,
        value: type.code,
        id: type.id,
      }));

      setTypes(finalTypes);
    };

    getTestTypes();
  }, []);

  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append('patientName', data.patientName);
    formData.append('surname', data.surname);
    formData.append('dob', data.dob);
    formData.append('idNumber', data.idNumber);
    formData.append('testType', data.testType.id);

    if (!isDoctor) {
      data.doctor.forEach((doc) => formData.append('doctor[]', doc.value));
    }
    formData.append('testResult', data.testResult[0]);

    try {
      await addResultMutation.mutateAsync(formData);

      reset();
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const loadTestTypeOptions = (inputValue, callback) => {
    callback(
      types.filter((i) =>
        i.label.toLowerCase().includes(inputValue.toLowerCase()),
      ),
    );
  };

  const loadDoctorOptions = (inputValue, callback) => {
    callback(
      doctors
        .filter((i) => i.name.toLowerCase().includes(inputValue.toLowerCase()))
        .map((doctor) => ({
          label: `${doctor.name} ${doctor.surname}`,
          value: doctor.id,
        })),
    );
  };

  return {
    isModalOpen,
    setIsModalOpen,
    register,
    handleSubmit,
    reset,
    control,
    errors,
    onSubmit,
    isLoading,
    results,
    deleteResultMutation,
    loadTestTypeOptions,
    loadDoctorOptions,
    isDoctor,
    doctors,
    types,
    page,
    handlePreviousPage,
    handleNextPage,
    handleFirstPage,
    handleLastPage,
    handlePageChange,
    perPage,
    handlePerPageChange,
    isPreviousData,
  };
};
