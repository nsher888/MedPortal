import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import getCSRFToken from '../services/session/getCSRFToken';
import logInUser from '../services/session/logInUser';

import { useAuth } from './useAuth';

const useLogIn = () => {
  const { getProfile } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
  });

  const [backendError, setBackendError] = useState(null);

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      setBackendError(null);
      await getCSRFToken();
      await logInUser(data);
      await getProfile();
      navigate('/dashboard');
    } catch (error) {
      setBackendError(
        error.response?.data?.message || 'An error occurred. Please try again.',
      );
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    backendError,
    onSubmit,
  };
};

export default useLogIn;
