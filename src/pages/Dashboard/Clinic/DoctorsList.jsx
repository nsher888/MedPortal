import { Link } from 'react-router-dom';

import Modal from '../../../components/Modal';

import AddDoctorModal from './AddDoctorModal';
import { useDoctorList } from './useDoctorList';

export default function DoctorsList() {
  const {
    doctors,
    isLoading,
    isError,
    error,
    handleDeleteDoctor,
    handleAddDoctor,
    isModalOpen,
    setIsModalOpen,
  } = useDoctorList();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className='px-4 sm:px-6 lg:px-4'>
      <div className='sm:flex sm:items-center'>
        <div className='sm:flex-auto'>
          <h1 className='text-base font-semibold leading-6 text-gray-900'>
            Doctors
          </h1>
          <p className='mt-2 text-sm text-gray-700'>
            A list of all the doctors in the clinic.
          </p>
        </div>
        <div className='mt-4 sm:ml-16 sm:mt-0 sm:flex-none'>
          <button
            type='button'
            onClick={() => setIsModalOpen(true)}
            className='block px-3 py-2 text-sm font-semibold text-center text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
          >
            Add Doctor
          </button>
        </div>
      </div>
      <div className='flow-root mt-8'>
        <div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
          <div className='inline-block min-w-full py-2 align-middle'>
            <table className='min-w-full divide-y divide-gray-300'>
              <thead>
                <tr>
                  <th
                    scope='col'
                    className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8'
                  >
                    Name
                  </th>
                  <th
                    scope='col'
                    className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8'
                  >
                    Surname
                  </th>
                  <th
                    scope='col'
                    className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                  >
                    Email
                  </th>
                  <th
                    scope='col'
                    className='relative py-3.5 pl-3 pr-4 sm:pr-6 lg:pr-8'
                  >
                    <span className='sr-only'>Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className='bg-white divide-y divide-gray-200'>
                {doctors.data.map((doctor) => (
                  <tr key={doctor.email}>
                    <td className='py-4 pl-4 pr-3 text-sm font-medium text-gray-900 whitespace-nowrap sm:pl-6 lg:pl-8'>
                      {doctor.name}
                    </td>
                    <td className='px-3 py-4 text-sm text-gray-500 whitespace-nowrap'>
                      {doctor.surname}
                    </td>
                    <td className='px-3 py-4 text-sm text-gray-500 whitespace-nowrap'>
                      {doctor.email}
                    </td>
                    <td className='relative py-4 pl-3 pr-4 text-sm font-medium text-right whitespace-nowrap sm:pr-6 lg:pr-8'>
                      <Link
                        to={`/dashboard/doctors/${doctor.id}`}
                        className='text-indigo-600 hover:text-indigo-900'
                      >
                        Edit<span className='sr-only'>, {doctor.name}</span>
                      </Link>
                      <button
                        type='button'
                        className='ml-4 text-sm font-medium text-red-600 hover:text-red-900'
                        onClick={() => handleDeleteDoctor(doctor.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title='Add Doctor'
        footer={null}
      >
        <AddDoctorModal
          onSubmit={handleAddDoctor}
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
}
