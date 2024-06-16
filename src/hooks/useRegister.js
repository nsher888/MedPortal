import { useForm } from 'react-hook-form';
import getCSRFToken from '../services/session/getCSRFToken';
import registerUser from '../services/session/registerUser';
import { useNavigate } from 'react-router-dom';
import { mutate } from 'swr';

const useRegister = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      console.log(data);
      await getCSRFToken();
      await registerUser(data);
      mutate('/api/user');
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
