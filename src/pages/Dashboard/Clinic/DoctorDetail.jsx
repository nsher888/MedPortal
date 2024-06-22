import { toast } from 'react-toastify';

import { useDoctorDetail } from './useDoctorDetail';

export default function DoctorDetail() {
  const { doctor, isLoading, isError, error, handleUpdateDoctor, id } =
    useDoctorDetail();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className='container mx-auto'>
      <div className='sm:flex sm:items-center'>
        <div className='sm:flex-auto'>
          <h1 className='text-2xl font-semibold leading-6 text-gray-900'>
            Edit Doctor
          </h1>
          <p className='mt-2 text-sm text-gray-700'>
            Edit the details of the doctor.
          </p>
        </div>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const updatedDoctor = {
            id,
            name: e.target.name.value,
            surname: e.target.surname.value,
          };
          toast.success("Doctor's data updated successfully");
          handleUpdateDoctor(updatedDoctor);
        }}
        className='mt-8 space-y-6'
      >
        <div className='rounded-md shadow-sm'>
          <div className='mb-4'>
            <label
              htmlFor='name'
              className='block text-sm font-medium text-gray-700'
            >
              Name
            </label>
            <input
              id='name'
              name='name'
              type='text'
              defaultValue={doctor.name}
              required
              className='block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
              placeholder='Name'
            />
          </div>
          <div className='mb-4'>
            <label
              htmlFor='surname'
              className='block text-sm font-medium text-gray-700'
            >
              Surname
            </label>
            <input
              id='surname'
              name='surname'
              type='text'
              defaultValue={doctor.surname}
              required
              className='block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
              placeholder='Surname'
            />
          </div>
        </div>
        <div>
          <button
            type='submit'
            className='flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
