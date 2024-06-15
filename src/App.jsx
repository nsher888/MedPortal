import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import LogIn from './pages/LogIn/LogIn';
import GuestLayout from './components/layouts/GuestLayout';
import Register from './pages/Register/Register';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<GuestLayout />}>
          ;
          <Route index element={<HomePage />} />;
          <Route path='login' element={<LogIn />} />;
          <Route path='register' element={<Register />} />;
        </Route>
      </Routes>
    </>
  );
}

export default App;
