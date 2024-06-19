import { useAuth } from '../../../hooks/useAuth';

const Profile = () => {
  const { profile } = useAuth();
  return (
    <div className='mt-8'>
      <h1 className='mb-4 text-2xl font-bold text-gray-900'>User Profile</h1>
      <ul className='space-y-4'>
        <li className='flex items-center'>
          <span className='w-32 font-medium text-gray-700'>Name:</span>
          <span className='text-gray-900'>{profile.name}</span>
        </li>
        <li className='flex items-center'>
          <span className='w-32 font-medium text-gray-700'>Surname:</span>
          <span className='text-gray-900'>{profile.surname}</span>
        </li>
        <li className='flex items-center'>
          <span className='w-32 font-medium text-gray-700'>Email:</span>
          <span className='text-gray-900'>{profile.email}</span>
        </li>
        <li className='flex items-center'>
          <span className='w-32 font-medium text-gray-700'>ID Number:</span>
          <span className='text-gray-900'>{profile.idNumber}</span>
        </li>
        <li className='flex items-center'>
          <span className='w-32 font-medium text-gray-700'>Date of Birth:</span>
          <span className='text-gray-900'>{profile.dateOfBirth}</span>
        </li>
      </ul>
    </div>
  );
};

export default Profile;
