// src/hooks/usePasswordReset.js
import { useForm } from 'react-hook-form';
import { useParams, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

import {
  resetPassword,
  forgotPassword,
} from '../services/session/resetPassword';

export const usePasswordReset = (isResetPassword) => {
  const { token } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const email = searchParams.get('email');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (isResetPassword) {
      try {
        data.email = email;
        data.token = token;
        await resetPassword(data);
        toast.success('Password reset successful');
      } catch (error) {
        toast.error(error.response.data.message);
      }
    } else {
      try {
        const res = await forgotPassword(data.email);
        if (res.status === 200) {
          toast.success('Password reset link sent to your email');
        }
      } catch (err) {
        toast.error(err.response.data.message);
      }
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
  };
};
