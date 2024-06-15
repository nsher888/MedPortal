import { useForm } from 'react-hook-form';

const useRegister = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // Add your registration logic here
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
