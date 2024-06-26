import { useEffect } from 'react';

import instance from '../services/axios';
import { useAuthStore, useSessionVerified } from '../store/AuthStore';

export function useCheckAuth() {
  const { setProfile } = useAuthStore();
  const { sessionVerified, setSessionVerified } = useSessionVerified();

  const checkAuthentication = async () => {
    try {
      const response = await instance.get('/api/user');
      setProfile(response.data);
    } catch (err) {
      console.warn(err);
      setProfile(null);
    } finally {
      setSessionVerified(true);
    }
  };

  useEffect(() => {
    if (!sessionVerified) {
      checkAuthentication();
    }
  }, [sessionVerified]);

  return sessionVerified;
}
