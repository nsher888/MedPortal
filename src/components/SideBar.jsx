import { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { routes } from '../routes';

export default function Sidebar({ sidebarOpen, setSidebarOpen, roles }) {
  const [sidebarItems, setSidebarItems] = useState([]);
  const sidebarRef = useRef(null);

  useEffect(() => {
    const getSidebarItems = () => {
      const items = [];
      if (roles.includes('clinic')) {
        items.push(
          routes.dashboard,
          routes.manageDoctors,
          routes.manageTestResults,
        );
      } else if (roles.includes('doctor')) {
        items.push(routes.dashboard, routes.manageTestResults);
      } else if (roles.includes('patient')) {
        items.push(routes.dashboard, routes.patientBooking);
      }

      return items;
    };

    setSidebarItems(getSidebarItems());
  }, [roles]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setSidebarOpen(false);
      }
    };

    if (sidebarOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [sidebarOpen, setSidebarOpen]);

  return (
    <>
      {sidebarOpen && (
        <div className='relative z-50 lg:hidden'>
          <div
            className='fixed inset-0 bg-gray-900/80'
            onClick={() => setSidebarOpen(false)}
          />
          <div className='fixed inset-0 flex'>
            <div
              className='relative flex flex-1 w-full max-w-xs mr-16 transition-transform transform'
              ref={sidebarRef}
            >
              <div className='absolute top-0 flex justify-center w-16 pt-5 left-full'>
                <button
                  type='button'
                  className='-m-2.5 p-2.5'
                  onClick={() => setSidebarOpen(false)}
                >
                  <span className='sr-only'>Close sidebar</span>
                  <div className='w-6 h-6 text-white'>X</div>
                </button>
              </div>
              <div className='flex flex-col px-6 pb-4 overflow-y-auto bg-white grow gap-y-5'>
                <div className='flex items-center h-16 shrink-0'>
                  <NavLink to='/dashboard' className='text-2xl' end>
                    <span className='font-bold text-customBlue'>Med</span>Portal
                  </NavLink>
                </div>
                <nav className='flex flex-col flex-1'>
                  <ul role='list' className='flex flex-col flex-1 gap-y-7'>
                    <li>
                      <ul role='list' className='-mx-2 space-y-1'>
                        {sidebarItems.map((item, index) => (
                          <li key={index}>
                            <NavLink
                              to={item.url}
                              end={item.url === '/dashboard'}
                              onClick={() => setSidebarOpen(false)}
                              className={({ isActive }) =>
                                isActive
                                  ? 'flex p-2 text-sm font-semibold leading-6 text-white rounded-md bg-indigo-600 group gap-x-3'
                                  : 'flex p-2 text-sm font-semibold leading-6 text-indigo-600 rounded-md bg-gray-50 group gap-x-3'
                              }
                            >
                              <div className='w-6 h-6 text-indigo-600 shrink-0'>
                                {item.icon}
                              </div>
                              {item.name}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className='hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col'>
        <div className='flex flex-col px-6 pb-4 overflow-y-auto bg-white border-r border-gray-200 grow gap-y-5'>
          <div className='flex items-center h-16 shrink-0'>
            <NavLink to='/dashboard' className='text-2xl' end>
              <span className='font-bold text-customBlue'>Med</span>Portal
            </NavLink>
          </div>
          <nav className='flex flex-col flex-1'>
            <ul role='list' className='flex flex-col flex-1 gap-y-7'>
              {sidebarItems.map((item, index) => (
                <li key={index}>
                  <NavLink
                    to={item.url}
                    end={item.url === '/dashboard'}
                    className={({ isActive }) =>
                      isActive
                        ? 'flex p-2 text-sm font-semibold leading-6 text-white rounded-md bg-indigo-600 group gap-x-3'
                        : 'flex p-2 text-sm font-semibold leading-6 text-indigo-600 rounded-md bg-gray-50 group gap-x-3'
                    }
                  >
                    <div className='w-6 h-6 text-indigo-600 shrink-0'>
                      {item.icon}
                    </div>
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
