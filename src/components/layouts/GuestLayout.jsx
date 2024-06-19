import { Navigate, Outlet } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import { useAuth } from '../../hooks/useAuth';

const GuestLayout = () => {
  const { isAuth } = useAuth();

  if (isAuth) {
    return <Navigate to='/dashboard' />;
  }
  return (
    <div className='max-w-6xl p-6 pt-10 mx-auto font-medium font-poppins'>
      <Header />
      <main className='md:mt-12'>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default GuestLayout;
