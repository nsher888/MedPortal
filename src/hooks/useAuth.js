import useSWR from 'swr';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import instance from '../services/axios';
import getUserData from '../services/session/getUserData';

export const useAuth = ({ middleware, redirectIfAuthenticated } = {}) => {
  const navigate = useNavigate();

  const fetcher = async () => {
    const response = await getUserData();
    return response.data;
  };

  const {
    data: user,
    error,
    mutate,
  } = useSWR('/api/user', fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    shouldRetryOnError: false,
  });

  const logout = async () => {
    try {
      await instance.post('/logout');
      mutate(null, false);
      navigate('/');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  useEffect(() => {
    if (middleware === 'guest' && redirectIfAuthenticated && user) {
      navigate(redirectIfAuthenticated);
      console.log('Redirecting to:', redirectIfAuthenticated);
    }
    if (middleware === 'auth' && error) {
      logout();
    }
  }, [user, error]);

  useEffect(() => {
    if (!user && !error) {
      mutate();
    }
  }, []);

  return {
    user,
    logout,
  };
};
