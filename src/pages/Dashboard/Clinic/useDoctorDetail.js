import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';

import { getDoctorById, updateDoctor } from '../../../services/doctors/doctors';

export const useDoctorDetail = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useQuery(['doctor', id], () =>
    getDoctorById(id),
  );

  const updateDoctorMutation = useMutation(updateDoctor, {
    onSuccess: () => {
      queryClient.invalidateQueries(['doctor', id]);
      navigate('/dashboard/doctors-list');
    },
  });

  const handleUpdateDoctor = async (updatedDoctor) => {
    try {
      updateDoctorMutation.mutate(updatedDoctor);
    } catch (error) {
      console.error(error);
    }
  };

  const doctor = data?.data;

  return {
    doctor,
    isLoading,
    isError,
    error,
    id,
    handleUpdateDoctor,
  };
};
