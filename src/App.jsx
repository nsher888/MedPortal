import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import LogIn from './pages/LogIn/LogIn';
import GuestLayout from './components/layouts/GuestLayout';
import Register from './pages/Register/Register';
import Dashboard from './pages/Dashboard/Dashboard';
import AppLayout from './components/layouts/AppLayout';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<GuestLayout />}>
          <Route index element={<HomePage />} />;
          <Route path='login' element={<LogIn />} />;
          <Route path='register' element={<Register />} />;
        </Route>
        <Route path='dashboard' element={<AppLayout />}>
          <Route index element={<Dashboard />} />;
        </Route>
      </Routes>
    </>
  );
}

export default App;
