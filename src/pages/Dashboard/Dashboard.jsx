import { useQuery } from 'react-query';

import { useAuth } from '../../hooks/useAuth';

import { getClinicStatistics } from './../../services/clinic/getClinicStatistics';
import ClinicDashboard from './Clinic/ClinicDashboard';
import PatientDashboard from './Patient/PatientDashboard';

const Dashboard = () => {
  const { data: response, isLoading } = useQuery(
    'statistics',
    getClinicStatistics,
  );
  const { profile } = useAuth();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const isClinic = profile.roles.includes('clinic');
  const isPatient = profile.roles.includes('patient');

  return (
    <div>
      {isClinic && <ClinicDashboard data={response} />}
      {isPatient && <PatientDashboard />}
    </div>
  );
};

export default Dashboard;
