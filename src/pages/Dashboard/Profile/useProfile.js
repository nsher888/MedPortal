import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { useAuth } from '../../../hooks/useAuth';
import { useUserProfile } from '../../../hooks/useUserProfile';
import { changePassword } from '../../../services/session/resetPassword';

const useProfile = () => {
  const { logout } = useAuth();
  const { data: profile, isLoading, updateUserProfile } = useUserProfile();

  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const { register, handleSubmit, reset } = useForm();

  const onPasswordChange = async (data) => {
    try {
      const res = await changePassword(data);
      if (res.status === 200) {
        setShowPasswordForm(false);
        reset();
        toast.success(res.data.message);
        logout();
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    reset();
  }, [showPasswordForm, reset]);

  const onUpdateProfile = async (data) => {
    try {
      const res = await updateUserProfile(data);
      if (res.status === 200) {
        setIsEditing(false);
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return {
    profile,
    isLoading,
    isEditing,
    setIsEditing,
    showPasswordForm,
    setShowPasswordForm,
    register,
    handleSubmit,
    onPasswordChange,
    onUpdateProfile,
  };
};

export default useProfile;
