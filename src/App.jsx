import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import LogIn from './pages/LogIn/LogIn';
import GuestLayout from './components/layouts/GuestLayout';
import Register from './pages/Register/Register';
import Dashboard from './pages/Dashboard/Dashboard';
import AppLayout from './components/layouts/AppLayout';
import Profile from './pages/Dashboard/Profile/Profile';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import ResetPassword from './pages/ForgotPassword/ResetPassword';
import 'react-toastify/dist/ReactToastify.css';
import CustomToastContainer from './components/ToastContainer';
import { QueryClient, QueryClientProvider } from 'react-query';

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
          <Route path='profile' element={<Profile />} />;
        </Route>
      </Routes>
      <CustomToastContainer />
    </QueryClientProvider>
  );
}

export default App;
