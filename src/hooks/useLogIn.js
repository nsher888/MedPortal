import { useForm } from 'react-hook-form';

const useLogIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
  };
};

export default useLogIn;
