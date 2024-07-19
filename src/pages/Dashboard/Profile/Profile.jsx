import usePageTitle from '../../../hooks/usePageTitle';
import useProfile from './useProfile';

const Profile = () => {
  const {
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
  } = useProfile();

  usePageTitle('Profile');

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const isClinic = profile.roles.includes('clinic');
  const isDoctor = profile.roles.includes('doctor');

  return (
    <>
      {!isClinic && (
        <>
          <div>
            <h1 className='mb-4 text-2xl font-bold text-gray-900'>
              User Profile
            </h1>
            <form
              onSubmit={handleSubmit(onUpdateProfile)}
              className='space-y-4'
            >
              <ul className='space-y-4'>
                <li className='flex items-center'>
                  <span className='w-32 font-medium text-gray-700'>Name:</span>
                  {isEditing ? (
                    <input
                      {...register('name')}
                      className='px-3 py-2 border border-gray-300 rounded-md'
                      required
                      defaultValue={profile.name}
                    />
                  ) : (
                    <span className='text-gray-900'>{profile.name}</span>
                  )}
                </li>

                <li className='flex items-center'>
                  <span className='w-32 font-medium text-gray-700'>
                    Surname:
                  </span>
                  {isEditing ? (
                    <input
                      {...register('surname')}
                      className='px-3 py-2 border border-gray-300 rounded-md'
                      required
                      defaultValue={profile.surname}
                    />
                  ) : (
                    <span className='text-gray-900'>{profile.surname}</span>
                  )}
                </li>

                {profile.dateOfBirth && (
                  <li className='flex items-center'>
                    <span className='w-32 font-medium text-gray-700'>
                      Date of Birth:
                    </span>
                    {isEditing ? (
                      <input
                        {...register('dateOfBirth')}
                        type='date'
                        className='px-3 py-2 border border-gray-300 rounded-md'
                        required
                        defaultValue={profile.dateOfBirth}
                      />
                    ) : (
                      <span className='text-gray-900'>
                        {profile.dateOfBirth}
                      </span>
                    )}
                  </li>
                )}

                <li className='flex items-center'>
                  <span className='w-32 font-medium text-gray-700'>Email:</span>
                  <span className='text-gray-900'>{profile.email}</span>
                </li>
                {profile.idNumber && (
                  <li className='flex items-center'>
                    <span className='w-32 font-medium text-gray-700'>
                      ID Number:
                    </span>
                    <span className='text-gray-900'>{profile.idNumber}</span>
                  </li>
                )}
              </ul>

              {isEditing && (
                <div className='flex items-center'>
                  <button
                    type='submit'
                    className='px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700'
                  >
                    Save Changes
                  </button>
                  <button
                    type='button'
                    onClick={() => setIsEditing(false)}
                    className='px-4 py-2 ml-4 font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300'
                  >
                    Cancel
                  </button>
                </div>
              )}
            </form>

            {!isDoctor && !isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className='px-4 py-2 mt-4 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700'
              >
                Edit Profile
              </button>
            )}
          </div>

          <div className='mt-8'>
            <p className='mb-4 text-lg text-gray-800'>
              Do you want to change your password?
            </p>
            <button
              onClick={() => setShowPasswordForm(!showPasswordForm)}
              className='px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700'
            >
              {showPasswordForm ? 'Cancel' : 'Change Password'}
            </button>
          </div>
        </>
      )}

      {isClinic && (
        <div>
          <h2 className='mb-4 text-xl font-bold text-gray-900'>
            Clinic Information
          </h2>
          <form className='space-y-4'>
            <div className='flex items-center'>
              <label className='w-32 font-medium text-gray-700'>
                Clinic Name:
              </label>
              {isEditing ? (
                <input
                  className='px-3 py-2 border border-gray-300 rounded-md'
                  readOnly
                  defaultValue={profile.name}
                />
              ) : (
                <span className='text-gray-900'>{profile.name}</span>
              )}
            </div>
          </form>
        </div>
      )}

      {showPasswordForm && (
        <div className='mt-8'>
          <h2 className='mb-4 text-xl font-bold text-gray-900'>
            Change Password
          </h2>
          <form className='space-y-4' onSubmit={handleSubmit(onPasswordChange)}>
            <div className='flex items-center'>
              <label className='w-32 font-medium text-gray-700'>
                Current Password:
              </label>
              <input
                {...register('current_password')}
                type='password'
                className='px-3 py-2 border border-gray-300 rounded-md'
                required
              />
            </div>
            <div className='flex items-center'>
              <label className='w-32 font-medium text-gray-700'>
                New Password:
              </label>
              <input
                {...register('new_password')}
                type='password'
                className='px-3 py-2 border border-gray-300 rounded-md'
                required
              />
            </div>
            <div className='flex items-center'>
              <label className='w-32 font-medium text-gray-700'>
                Confirm Password:
              </label>
              <input
                {...register('confirm_password')}
                type='password'
                className='px-3 py-2 border border-gray-300 rounded-md'
                required
              />
            </div>
            <div className='flex items-center'>
              <button
                type='submit'
                className='px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700'
              >
                Change Password
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Profile;
