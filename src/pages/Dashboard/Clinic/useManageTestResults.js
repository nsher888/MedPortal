import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

import { useAuth } from '../../../hooks/useAuth';
import { deleteResult, getResults } from '../../../services/results/results';
import { storeResult } from '../../../services/results/uploadResults';
import { getTypes } from '../../../services/shared/types';

import { useDoctorList } from './useDoctorList';

export const useManageTestResults = () => {
  const { profile } = useAuth();
  const isDoctor = profile.roles.includes('doctor');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [types, setTypes] = useState([]);
  const { doctors } = useDoctorList();
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();

  const queryClient = useQueryClient();

  const { data: results, error, isLoading } = useQuery('results', getResults);

  const addResultMutation = useMutation(storeResult, {
    onSuccess: () => {
      queryClient.invalidateQueries('results');
      toast.success('Test result added successfully');
      setIsModalOpen(false);
    },
  });

  if (error) {
    console.error('Error:', error);
  }

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

  const loadTestTypeOptions = (inputValue, callback) => {
    callback(
      types.filter((i) =>
        i.label.toLowerCase().includes(inputValue.toLowerCase()),
      ),
    );
  };

  const deleteResultMutation = useMutation(deleteResult, {
    onSuccess: () => {
      queryClient.invalidateQueries('results');
      toast.success('Test result deleted successfully');
    },
  });

  const loadDoctorOptions = (inputValue, callback) => {
    callback(
      doctors.data
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
  };
};
