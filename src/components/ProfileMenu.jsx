import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function ProfileMenu({ user, logout }) {
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        setProfileMenuOpen(false);
      }
    };

    if (profileMenuOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [profileMenuOpen]);

  return (
    <div className='relative' ref={profileMenuRef}>
      <button
        type='button'
        className='-m-1.5 flex items-center p-1.5'
        onClick={() => setProfileMenuOpen(!profileMenuOpen)}
      >
        <span className='flex items-center'>
          <span
            className='ml-4 text-sm font-semibold leading-6 text-gray-900'
            aria-hidden='true'
          >
            {user.name}
          </span>
          <div className='w-5 h-5 ml-2 text-gray-400'>▼</div>
        </span>
      </button>

      {profileMenuOpen && (
        <div className='absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none'>
          <Link
            to='profile'
            className='block px-3 py-1 text-sm leading-6 text-gray-900'
            onClick={() => setProfileMenuOpen(false)}
          >
            Your profile
          </Link>
          <a
            href='#'
            className='block px-3 py-1 text-sm leading-6 text-gray-900'
            onClick={(e) => {
              e.preventDefault();
              logout();
              setProfileMenuOpen(false);
            }}
          >
            Sign out
          </a>
        </div>
      )}
    </div>
  );
}
