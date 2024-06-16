import { Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const AppLayout = () => {
  const { user, logout } = useAuth({ middleware: 'auth' });

  if (!user) {
    return <div>Loading...</div>;
  }
  return (
    <div className='max-w-6xl p-6 pt-10 mx-auto font-medium font-poppins'>
      <div className='flex justify-between'>
        <h1 className='text-3xl font-bold'>Dashboard</h1>
        <button
          onClick={logout}
          className='px-4 py-2 text-white bg-red-500 rounded-md'
        >
          Logout
        </button>
      </div>
      <p>
        Welcome, {user.name} {user.surname} ({user.email})
      </p>

      <Outlet />
    </div>
  );
};

export default AppLayout;
