import { useForm } from 'react-hook-form';
import getCSRFToken from '../services/session/getCSRFToken';
import logInUser from '../services/session/logInUser';
import { useNavigate } from 'react-router-dom';
import { mutate } from 'swr';

const useLogIn = () => {
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
  };
};

export default useLogIn;
