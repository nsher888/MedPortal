import { useAuth } from '../hooks/useAuth';

import Notifications from './Notifications';
import ProfileMenu from './ProfileMenu';
import SidebarButton from './SideBarButton';

export default function AppHeader({ setSidebarOpen, user, logout }) {
  const { profile } = useAuth();
  const isDoctor = profile.roles.includes('doctor');

  return (
    <div className='sticky top-0 z-40 flex items-center h-16 px-4 bg-white border-b border-gray-200 shadow-sm shrink-0 gap-x-4 sm:gap-x-6 sm:px-6 lg:px-8'>
      <SidebarButton setSidebarOpen={setSidebarOpen} />
      <div className='w-px h-6 bg-gray-200 lg:hidden' aria-hidden='true'></div>
      <div className='flex self-stretch flex-1 gap-x-4 lg:gap-x-6'></div>
      <div className='flex items-center gap-5'>
        {isDoctor && <Notifications />}
        <ProfileMenu user={user} logout={logout} />
      </div>
    </div>
  );
}
