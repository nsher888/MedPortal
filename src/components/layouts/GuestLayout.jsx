import { Outlet } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';

const GuestLayout = () => {
  return (
    <div className='max-w-6xl p-6 pt-10 mx-auto font-medium font-poppins'>
      <Header />
      <main className='mt-24'>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default GuestLayout;
