import { useQuery, useMutation, useQueryClient } from 'react-query';
import getUserData from '../services/session/getUserData';
import updateProfile from '../services/session/updateProfile';

export const useUserProfile = () => {
  const queryClient = useQueryClient();

  const userProfileQuery = useQuery({
    queryFn: () => getUserData(),
    queryKey: 'profile',
  });

  const updateUserProfileMutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries('profile');
    },
  });

  return {
    ...userProfileQuery,
    updateUserProfile: updateUserProfileMutation.mutateAsync,
  };
};
