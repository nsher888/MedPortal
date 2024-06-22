import { QueryClient, QueryClientProvider } from 'react-query';
import { Route, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

import AppLayout from './components/layouts/AppLayout';
import GuestLayout from './components/layouts/GuestLayout';
import CustomToastContainer from './components/ToastContainer';
import DoctorDetail from './pages/Dashboard/Clinic/DoctorDetail';
import DoctorsList from './pages/Dashboard/Clinic/DoctorsList';
import Dashboard from './pages/Dashboard/Dashboard';
import Profile from './pages/Dashboard/Profile/Profile';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import ResetPassword from './pages/ForgotPassword/ResetPassword';
import HomePage from './pages/HomePage/HomePage';
import LogIn from './pages/LogIn/LogIn';
import Register from './pages/Register/Register';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path='/' element={<GuestLayout />}>
          <Route index element={<HomePage />} />;
          <Route path='login' element={<LogIn />} />;
          <Route path='register' element={<Register />} />;
          <Route path='forgot-password' element={<ForgotPassword />} />
          <Route path='password-reset/:token' element={<ResetPassword />} />
        </Route>

        <Route path='dashboard' element={<AppLayout />}>
          <Route index element={<Dashboard />} />;
          <Route path='doctors-list' element={<DoctorsList />} />
          <Route path='doctors/:id' element={<DoctorDetail />} />
          <Route path='profile' element={<Profile />} />;
        </Route>
      </Routes>
      <CustomToastContainer />
    </QueryClientProvider>
  );
}

export default App;
