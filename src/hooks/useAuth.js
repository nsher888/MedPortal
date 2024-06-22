import { useQueryClient } from 'react-query';

import getUserData from '../services/session/getUserData';
import logOutUser from '../services/session/logOutUser';

import { useAuthStore } from './../store/AuthStore';

export function useAuth() {
  const { profile, setProfile } = useAuthStore();
  const queryClient = useQueryClient();

  const getProfile = async () => {
    try {
      const userData = await getUserData();
      setProfile(userData);
    } catch (err) {
      console.warn(err);
      setProfile(null);
    }
  };

  const logout = async () => {
    try {
      await logOutUser();
      setProfile(null);
      queryClient.removeQueries('profile');
    } catch (err) {
      console.warn(err);
    }
  };

  return {
    isAuth: Boolean(profile),
    profile,
    logout,
    getProfile,
  };
}
