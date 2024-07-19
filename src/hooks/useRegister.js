import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import getCSRFToken from '../services/session/getCSRFToken';
import registerUser from '../services/session/registerUser';

import { useAuth } from './useAuth';

const useRegister = () => {
  const { getProfile } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const [backendError, setBackendError] = useState(null);

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      setBackendError(null);
      await getCSRFToken();
      await registerUser(data);
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
    watch,
  };
};

export default useRegister;
