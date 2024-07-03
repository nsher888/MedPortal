import { format } from 'date-fns';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

import { showResult } from '../../../services/results/results';

export default function ShowResult() {
  const { id } = useParams();

  const {
    data: result,
    isLoading,
    isError,
    error,
  } = useQuery(['result', id], () => showResult(id));

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  console.log(result);

  return (
    <div className='container mx-auto'>
      <h1 className='text-2xl font-bold '></h1>
      <div className='overflow-hidden bg-white shadow sm:rounded-lg'>
        <div className='px-4 py-5 sm:px-6'>
          <h3 className='text-lg font-medium leading-6 text-gray-900'>
            Test Result Details
          </h3>
        </div>
        <div className='border-t border-gray-200'>
          <dl>
            <div className='px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-sm font-medium text-gray-500'>
                Patient Name
              </dt>
              <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                {result.patientName}
              </dd>
            </div>
            <div className='px-4 py-5 bg-white sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-sm font-medium text-gray-500'>Surname</dt>
              <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                {result.surname}
              </dd>
            </div>
            <div className='px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-sm font-medium text-gray-500'>
                Date of Birth
              </dt>
              <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                {format(new Date(result.dob), 'MM/dd/yyyy')}
              </dd>
            </div>

            <div className='px-4 py-5 bg-white sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-sm font-medium text-gray-500'>ID Number</dt>
              <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                {result.idNumber}
              </dd>
            </div>
            <div className='px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-sm font-medium text-gray-500'>Test Type</dt>
              <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                {result.testType}
              </dd>
            </div>
            <div className='px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-sm font-medium text-gray-500'>
                Date of test
              </dt>
              <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                {format(new Date(result.created_at), 'MM/dd/yyyy')}
              </dd>
            </div>
            <div className='px-4 py-5 bg-white sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-sm font-medium text-gray-500'>Doctor(s)</dt>
              <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                {result.doctorNames.join(', ')}
              </dd>
            </div>
            <div className='px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-sm font-medium text-gray-500'>
                Test Result File
              </dt>

              <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                <a
                  href={result.testResult}
                  target='_blank'
                  className='text-blue-500'
                >
                  View Result
                </a>
              </dd>
              <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'></dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
