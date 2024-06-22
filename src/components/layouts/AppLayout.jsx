import { useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '../../hooks/useAuth';
import { useCheckAuth } from '../../hooks/useCheckAuth';
import AppHeader from '../AppHeader';
import Sidebar from '../SideBar';

import LoadingPlaceholder from './../LoadingPlaceholder';

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isSessionVerified = useCheckAuth();
  const { isAuth, logout, profile } = useAuth();

  if (!isSessionVerified && !isAuth) {
    return <LoadingPlaceholder />;
  }

  if (!isAuth) {
    return <Navigate to='/' />;
  }

  return (
    <div>
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        roles={profile.roles}
      />
      <div className='lg:pl-72'>
        <AppHeader
          setSidebarOpen={setSidebarOpen}
          logout={logout}
          user={profile}
        />
        <main className='py-10'>
          <div className='px-4 sm:px-6 lg:px-8'>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
