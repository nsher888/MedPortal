import { useQuery } from 'react-query';

import { getClinicStatistics } from '../../services/clinic/getClinicStatistics';

import ClinicDashboard from './Clinic/ClinicDashboard';

const Dashboard = () => {
  const { data: response, isLoading } = useQuery(
    'statistics',
    getClinicStatistics,
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return <ClinicDashboard data={response} />;
};

export default Dashboard;
