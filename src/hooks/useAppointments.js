import { useMutation, useQueryClient } from 'react-query';

import {
  setAvailability,
  setMultipleAvailabilities,
} from '../services/booking/availabilities';

const useAppointments = () => {
  const useSetAvailability = () => {
    const queryClient = useQueryClient();
    return useMutation(setAvailability, {
      onSuccess: () => {
        queryClient.invalidateQueries('availabilities');
      },
    });
  };

  const useSetMultipleAvailabilities = () => {
    const queryClient = useQueryClient();
    return useMutation(setMultipleAvailabilities, {
      onSuccess: () => {
        queryClient.invalidateQueries('availabilities');
      },
    });
  };

  return {
    useSetAvailability,
    useSetMultipleAvailabilities,
  };
};

export default useAppointments;
