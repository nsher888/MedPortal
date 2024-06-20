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

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await getCSRFToken();
      await logInUser(data);
      await getProfile();
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
  };
};

export default useLogIn;
