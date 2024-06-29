import { Bar, Pie } from 'react-chartjs-2';
import { FaUserDoctor } from 'react-icons/fa6';
import { IoDocumentAttachOutline } from 'react-icons/io5';

import 'chart.js/auto';
import PatientIcon from '../../../components/Icons/PatientIcon';

import { useClinicDashboard } from './useClinicDashboarad';

const ClinicDashboard = ({ data }) => {
  const {
    doctorsNumber,
    resultsNumber,
    uniqueIds,
    dataForBarChart,
    dataForPieChart,
    pieChartOptions,
  } = useClinicDashboard(data);

  return (
    <div className='container p-4 mx-auto'>
      <h1 className='mb-6 text-3xl font-bold'>Dashboard</h1>

      <div className='grid grid-cols-1 gap-6 mb-10 md:grid-cols-3'>
        <div className='flex items-center justify-center p-6 bg-white border border-gray-300 shadow-md rounded-xl'>
          <FaUserDoctor className='w-10 h-10 text-gray-600' color='#4200FF' />
          <div className='ml-4 text-center'>
            <h2 className='text-2xl font-bold text-gray-800'>
              {doctorsNumber}
            </h2>
            <p className='text-sm text-gray-500'>Number of Doctors</p>
          </div>
        </div>
        <div className='flex items-center justify-center p-6 bg-white border border-gray-300 shadow-md rounded-xl'>
          <IoDocumentAttachOutline
            className='w-10 h-10 text-gray-600'
            color='#4200FF'
          />
          <div className='ml-4 text-center'>
            <h2 className='text-2xl font-bold text-gray-800'>
              {resultsNumber}
            </h2>
            <p className='text-sm text-gray-500'>Number of Results</p>
          </div>
        </div>
        <div className='flex items-center justify-center p-6 bg-white border border-gray-300 shadow-md rounded-xl'>
          <PatientIcon className='w-10 h-10 text-gray-600' color='#4200FF' />
          <div className='ml-4 text-center'>
            <h2 className='text-2xl font-bold text-gray-800'>{uniqueIds}</h2>
            <p className='text-sm text-gray-500'>Number of Patients</p>
          </div>
        </div>
      </div>

      <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
        <div className='p-4 bg-white border border-gray-300 shadow-md rounded-xl h-96'>
          <Bar
            data={dataForBarChart}
            options={{ maintainAspectRatio: false }}
          />
        </div>
        <div className='flex flex-col p-4 bg-white border border-gray-300 shadow-md rounded-xl h-96'>
          <h3 className='text-lg font-medium leading-6 text-gray-900'>
            Test Type Distribution
          </h3>
          <div className='flex-grow'>
            <Pie
              data={dataForPieChart}
              options={pieChartOptions}
              height={null}
              width={null}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClinicDashboard;
