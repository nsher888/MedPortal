import { useForm } from 'react-hook-form';

import TextInput from '../../../components/TextInput';

const AddDoctorModal = ({ onSubmit, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='mt-6'>
      <div>
        <div className='text-center sm:mt-0 sm:text-left'>
          <div className='mt-2'>
            <TextInput
              label='Name'
              placeholder='Name'
              register={register('name', { required: 'Name is required' })}
              errorMessage={errors.name?.message}
            />
            <TextInput
              label='Surname'
              placeholder='Surname'
              register={register('surname', {
                required: 'Surname is required',
              })}
              errorMessage={errors.surname?.message}
            />

            <TextInput
              label='Email'
              placeholder='Email'
              register={register('email', { required: 'Email is required' })}
              errorMessage={errors.email?.message}
            />
          </div>
        </div>
      </div>
      <div className='mt-5 sm:mt-4 sm:flex sm:flex-row-reverse'>
        <button
          type='submit'
          className='inline-flex justify-center w-full px-3 py-2 text-sm font-semibold text-white rounded-md shadow-sm bg-customBlue hover:bg-customBlueHover sm:ml-3 sm:w-auto'
        >
          Add Doctor
        </button>
        <button
          type='button'
          className='inline-flex justify-center w-full px-3 py-2 mt-3 text-sm font-semibold text-gray-900 bg-white rounded-md shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto'
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AddDoctorModal;
