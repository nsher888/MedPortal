import { useForm } from 'react-hook-form';
import getCSRFToken from '../services/session/getCSRFToken';
import registerUser from '../services/session/registerUser';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './useAuth';

const useRegister = () => {
  const { getProfile } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await getCSRFToken();
      await registerUser(data);
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
    watch,
  };
};

export default useRegister;
