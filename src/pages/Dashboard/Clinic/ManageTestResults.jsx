import { format } from 'date-fns';
import { Controller } from 'react-hook-form';
import { Link } from 'react-router-dom';
import AsyncSelect from 'react-select/async';

import ResultCreateModal from '../../../components/ResultCreateModal';
import ResultsSearchInput from '../../../components/ResultsSearchInput';
import TextInput from '../../../components/TextInput';
import useSearch from '../../../hooks/useSearch';

import { useManageTestResults } from './useManageTestResults';

const ManageTestResults = () => {
  const { searchValue, handleSearchChange } = useSearch();

  const {
    isModalOpen,
    setIsModalOpen,
    register,
    handleSubmit,
    control,
    errors,
    onSubmit,
    isLoading,
    results,
    isDoctor,
    types,
    deleteResultMutation,
    loadTestTypeOptions,
    loadDoctorOptions,
    doctors,
    page,
    handlePreviousPage,
    handleNextPage,
    handleFirstPage,
    handleLastPage,
    handlePageChange,
    perPage,
    handlePerPageChange,
    isPreviousData,
  } = useManageTestResults(searchValue);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const startItem = (page - 1) * perPage + 1;
  const endItem = Math.min(page * perPage, results.total);

  return (
    <div className='px-4 sm:px-6 lg:px-4'>
      <div className='flex flex-col items-start sm:flex-row sm:items-center sm:justify-between'>
        <div className='flex-1'>
          <h1 className='text-base font-semibold leading-6 text-gray-900'>
            Test Results
          </h1>
          <p className='mt-2 text-sm text-gray-700'>
            A list of all the test results in the clinic.
          </p>
        </div>
        <div className='w-full mt-4 sm:w-auto sm:mt-0 sm:ml-4'>
          <ResultsSearchInput
            searchValue={searchValue}
            handleSearchChange={handleSearchChange}
            placeholder='Search Test Results...'
          />
        </div>
        <div className='w-full mt-4 md:ml-5 sm:w-auto sm:mt-0 '>
          <button
            onClick={() => setIsModalOpen(true)}
            className='block w-full px-3 py-2 text-sm font-semibold text-center text-white rounded-md shadow-sm bg-customBlue hover:bg-customBlueHover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:w-auto'
          >
            Add Test Result
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
                    className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900'
                  >
                    Surname
                  </th>
                  <th
                    scope='col'
                    className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900'
                  >
                    Date of Birth
                  </th>
                  <th
                    scope='col'
                    className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 '
                  >
                    Doctor(s)
                  </th>
                  <th
                    scope='col'
                    className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 '
                  >
                    Test Type
                  </th>
                  <th
                    scope='col'
                    className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                  >
                    ID Number
                  </th>
                  <th
                    scope='col'
                    className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900'
                  >
                    Date of Test
                  </th>
                  <th scope='col' className='relative py-3.5 pl-3 pr-4 '>
                    <span className='sr-only'>Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className='bg-white divide-y divide-gray-200 '>
                {results.data.length === 0 && (
                  <tr className=''>
                    <td colSpan='8' className='p-4 text-center '>
                      No test results found
                    </td>
                  </tr>
                )}
                {results.data.map((result) => (
                  <tr key={result.id}>
                    <td className='py-4 pl-4 pr-3 text-sm font-medium text-gray-900 break-words max-w-[100px] sm:pl-6 lg:pl-8'>
                      {result.patientName}
                    </td>
                    <td className='px-3 py-4 text-sm text-gray-500 break-words max-w-[100px]'>
                      {result.surname}
                    </td>
                    <td className='px-3 py-4 text-sm text-gray-500'>
                      {format(new Date(result.dob), 'MM/dd/yyyy')}
                    </td>
                    <td className='px-3 py-4 text-sm text-gray-500 break-words max-w-[200px]'>
                      {result.doctorNames && result.doctorNames.join(', ')}
                    </td>
                    <td className='px-3 py-4 text-sm text-gray-500 break-words max-w-[200px]'>
                      {result.testType}
                    </td>
                    <td className='px-3 py-4 text-sm text-gray-500'>
                      {result.idNumber}
                    </td>
                    <td className='px-3 py-4 text-sm text-gray-500'>
                      {format(new Date(result.created_at), 'MM/dd/yyyy')}
                    </td>
                    <td className='relative py-4 pl-3 pr-4 text-sm font-medium text-right whitespace-nowrap sm:pr-6 lg:pr-8'>
                      <Link
                        to={`/dashboard/manage-test-results/${result.id}`}
                        className='text-indigo-600 hover:text-indigo-900'
                      >
                        View<span className='sr-only'>, {result.name}</span>
                      </Link>
                      {!isDoctor && (
                        <button
                          type='button'
                          className='ml-4 text-sm font-medium text-red-600 hover:text-red-900'
                          onClick={() => deleteResultMutation.mutate(result.id)}
                        >
                          Delete
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className='flex flex-col items-center justify-between mt-4 md:flex-row'>
        <div className='mb-4 text-sm text-gray-700 md:mb-0'>
          Showing {startItem} to {endItem} of {results.total} results
        </div>
        <div className='flex flex-col items-center sm:flex-row'>
          <div className='flex items-center mb-4 sm:mb-0'>
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
          </div>
          <div className='flex items-center mb-4 sm:mb-0'>
            Page{' '}
            <input
              type='number'
              value={page}
              onChange={handlePageChange}
              onBlur={handlePageChange}
              className='w-12 px-2 py-1 mx-1 text-sm font-semibold text-center text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
              min={1}
              max={results.last_page}
            />{' '}
            of {results.last_page}
          </div>
          <div className='flex items-center mb-4 sm:mb-0'>
            <button
              className='px-3 py-1 mx-1 text-sm font-semibold text-gray-700 bg-gray-200 rounded-md shadow-sm hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500'
              onClick={handleNextPage}
              disabled={isPreviousData || results.last_page <= page}
            >
              Next &gt;
            </button>
            <button
              className='px-3 py-1 mx-1 text-sm font-semibold text-gray-700 bg-gray-200 rounded-md shadow-sm hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500'
              onClick={handleLastPage}
              disabled={isPreviousData || results.last_page <= page}
            >
              Last &gt;&gt;
            </button>
          </div>
          <select
            value={perPage}
            onChange={handlePerPageChange}
            className='px-3 py-1 mt-2 ml-4 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm lg:mt-0 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>
      </div>
      <ResultCreateModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title='Add Test Result'
        footer={null}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            label='Patient Name'
            className='mb-6'
            name='patientName'
            type='text'
            register={register('patientName', {
              required: 'Patient Name is required',
            })}
            errorMessage={errors.patientName?.message}
          />
          <TextInput
            label='Surname'
            name='surname'
            className='mb-6'
            type='text'
            register={register('surname', { required: 'Surname is required' })}
            errorMessage={errors.surname?.message}
          />
          <TextInput
            label='Date of Birth'
            name='dob'
            type='date'
            className='mb-6'
            register={register('dob', {
              required: 'Date of Birth is required',
            })}
            errorMessage={errors.dob?.message}
          />
          <TextInput
            label='ID Number'
            name='idNumber'
            type='text'
            className='mb-6'
            register={register('idNumber', {
              required: 'ID Number is required',
            })}
            errorMessage={errors.idNumber?.message}
          />
          <div className='mb-6'>
            <Controller
              name='testType'
              control={control}
              rules={{ required: 'Test Type is required' }}
              render={({ field }) => (
                <AsyncSelect
                  cacheOptions
                  loadOptions={loadTestTypeOptions}
                  defaultOptions={types}
                  placeholder='Select Test Type'
                  getOptionLabel={(option) => option.label}
                  getOptionValue={(option) => option.id}
                  {...field}
                />
              )}
            />
            {errors.testType && (
              <p className='text-red-600'>{errors.testType.message}</p>
            )}
          </div>
          {!isDoctor && (
            <div className='mb-6'>
              <Controller
                name='doctor'
                control={control}
                rules={{ required: 'Doctor is required' }}
                render={({ field }) => (
                  <AsyncSelect
                    cacheOptions
                    isMulti
                    loadOptions={loadDoctorOptions}
                    defaultOptions={doctors.map((doctor) => ({
                      label: `${doctor.name} ${doctor.surname}`,
                      value: doctor.id,
                    }))}
                    placeholder='Select Doctor'
                    {...field}
                  />
                )}
              />
              {errors.doctor && (
                <p className='text-red-600'>{errors.doctor.message}</p>
              )}
            </div>
          )}
          <div className='mb-6'>
            <label
              htmlFor='testResult'
              className='block text-sm font-medium leading-6 text-gray-900'
            >
              Upload Test Result file
            </label>
            <input
              id='testResult'
              name='testResult'
              type='file'
              {...register('testResult', {
                required: 'Test Result is required',
              })}
              className='block w-full px-3 py-2 mt-1 border-0 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-customBlue sm:text-sm sm:leading-6'
            />
            {errors.testResult && (
              <p className='text-red-600'>{errors.testResult.message}</p>
            )}
          </div>
          <div className='flex justify-end'>
            <button
              type='submit'
              className='inline-flex justify-center px-4 py-2 text-sm font-semibold text-white rounded-md shadow-sm bg-customBlue hover:bg-customBlueHover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
            >
              Submit
            </button>
          </div>
        </form>
      </ResultCreateModal>
    </div>
  );
};

export default ManageTestResults;
