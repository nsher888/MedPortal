import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { routes } from '../routes';

export default function Sidebar({ sidebarOpen, setSidebarOpen, roles }) {
  const [sidebarItems, setSidebarItems] = useState([]);

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
        items.push(routes.manageFiles);
      }

      return items;
    };

    setSidebarItems(getSidebarItems());
  }, [roles]);

  return (
    <>
      {sidebarOpen && (
        <div className='relative z-50 lg:hidden'>
          <div
            className='fixed inset-0 bg-gray-900/80'
            onClick={() => setSidebarOpen(false)}
          />
          <div className='fixed inset-0 flex'>
            <div className='relative flex flex-1 w-full max-w-xs mr-16 transition-transform transform'>
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
                  <Link to='/dashboard' className='text-2xl'>
                    <span className='font-bold text-customBlue'>Med</span>Portal
                  </Link>
                </div>
                <nav className='flex flex-col flex-1'>
                  <ul role='list' className='flex flex-col flex-1 gap-y-7'>
                    <li>
                      <ul role='list' className='-mx-2 space-y-1'>
                        {sidebarItems.map((item, index) => (
                          <li key={index}>
                            <Link
                              to={item.url}
                              className='flex p-2 text-sm font-semibold leading-6 text-indigo-600 rounded-md bg-gray-50 group gap-x-3'
                            >
                              <div className='w-6 h-6 text-indigo-600 shrink-0'>
                                {item.icon}
                              </div>
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                    <li className='mt-auto'>
                      <a
                        href='#'
                        className='flex p-2 -mx-2 text-sm font-semibold leading-6 text-gray-700 rounded-md group gap-x-3 hover:bg-gray-50 hover:text-indigo-600'
                      >
                        <div className='w-6 h-6 text-gray-400 shrink-0 group-hover:text-indigo-600'>
                          ⚙️
                        </div>
                        Settings
                      </a>
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
            <Link to='/dashboard' className='text-2xl'>
              <span className='font-bold text-customBlue'>Med</span>Portal
            </Link>
          </div>
          <nav className='flex flex-col flex-1'>
            <ul role='list' className='flex flex-col flex-1 gap-y-7'>
              {sidebarItems.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.url}
                    className='flex p-2 text-sm font-semibold leading-6 text-indigo-600 rounded-md bg-gray-50 group gap-x-3'
                  >
                    <div className='w-6 h-6 text-indigo-600 shrink-0'>
                      {item.icon}
                    </div>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
