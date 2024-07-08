import { Link } from 'react-router-dom';

import Modal from '../../../components/Modal';
import SearchInput from '../../../components/searchInput';
import useSearch from '../../../hooks/useSearch';

import AddDoctorModal from './AddDoctorModal';
import { useDoctorList } from './useDoctorList';

export default function DoctorsList() {
  const { searchValue, handleSearchChange } = useSearch();

  const {
    doctors,
    isLoading,
    isError,
    error,
    isModalOpen,
    setIsModalOpen,
    handleDeleteDoctor,
    handleAddDoctor,
    handlePreviousPage,
    handleNextPage,
    handleFirstPage,
    handleLastPage,
    handlePageChange,
    handlePerPageChange,
    page,
    perPage,
    isPreviousData,
  } = useDoctorList(searchValue);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  const startItem = (page - 1) * perPage + 1;
  const endItem = Math.min(page * perPage, doctors.total);

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
        <div className='sm:flex-none'>
          <SearchInput
            searchValue={searchValue}
            handleSearchChange={handleSearchChange}
            placeholder='Search Doctors...'
          />
        </div>
        <div className='mt-4 sm:ml-16 sm:mt-0 sm:flex-none'>
          <button
            type='button'
            onClick={() => setIsModalOpen(true)}
            className='block px-3 py-2 text-sm font-semibold text-center text-white rounded-md shadow-sm bg-customBlue hover:bg-customBlueHover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
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
                {doctors.data.data.length === 0 && (
                  <tr>
                    <td
                      colSpan='4'
                      className='px-6 py-4 text-sm font-medium text-center text-gray-900'
                    >
                      No doctors found
                    </td>
                  </tr>
                )}
                {doctors.data.data.map((doctor) => (
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
      <div className='flex items-center justify-between mt-4'>
        <div className='text-sm text-gray-700'>
          Showing {startItem} to {endItem} of {doctors.total} doctors
        </div>
        <div className='flex items-center'>
          <button
            className='px-3 py-1 mx-1 text-sm font-semibold text-gray-700 bg-gray-200 rounded-md shadow-sm hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500'
            onClick={handleFirstPage}
            disabled={page === 1}
          >
            &lt;&lt; First
          </button>
          <button
            className='px-3 py-1 mx-1 text-sm font-semibold text-gray-700 bg-gray-200 rounded-md shadow-sm hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500'
            onClick={handlePreviousPage}
            disabled={page === 1}
          >
            &lt; Previous
          </button>
          <div className='flex items-center mx-2'>
            Page{' '}
            <input
              type='number'
              value={page}
              onChange={handlePageChange}
              onBlur={handlePageChange}
              className='w-12 px-2 py-1 mx-1 text-sm font-semibold text-center text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
              min={1}
              max={doctors.last_page}
            />{' '}
            of {doctors.last_page}
          </div>
          <button
            className='px-3 py-1 mx-1 text-sm font-semibold text-gray-700 bg-gray-200 rounded-md shadow-sm hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500'
            onClick={handleNextPage}
            disabled={isPreviousData || doctors.last_page <= page}
          >
            Next &gt;
          </button>
          <button
            className='px-3 py-1 mx-1 text-sm font-semibold text-gray-700 bg-gray-200 rounded-md shadow-sm hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500'
            onClick={handleLastPage}
            disabled={isPreviousData || doctors.last_page <= page}
          >
            Last &gt;&gt;
          </button>
          <select
            value={perPage}
            onChange={handlePerPageChange}
            className='px-3 py-1 ml-4 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
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
