import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className='relative flex items-center justify-between p-4 '>
      <div>
        <Link to='/' className='text-2xl' onClick={closeMenu}>
          <span className='font-bold text-customBlue'>Med</span>Portal
        </Link>
      </div>
      <div className='hidden gap-8 text-lg font-medium md:flex'>
        <a
          className='transition duration-300 ease-in-out cursor-pointer hover:text-customBlue'
          onClick={closeMenu}
        >
          About Us
        </a>
        <a
          className='transition duration-300 ease-in-out cursor-pointer hover:text-customBlue'
          onClick={closeMenu}
        >
          Contact Us
        </a>
      </div>
      <div className='hidden md:flex gap-7'>
        <Link
          to='/login'
          className='px-10 py-3 font-medium text-white transition duration-300 ease-in-out cursor-pointer bg-customBlue rounded-xl hover:bg-customBlueHover'
          onClick={closeMenu}
        >
          Sign In
        </Link>
        <Link
          to='register'
          className='px-10 py-3 font-medium transition duration-300 ease-in-out border-2 cursor-pointer text-customBlue border-customBlue rounded-xl hover:bg-indigo-100'
          onClick={closeMenu}
        >
          Sign Up
        </Link>
      </div>
      <div className='z-20 flex items-center md:hidden'>
        <button onClick={toggleMenu} className='focus:outline-none'>
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>
      {isOpen && (
        <div className='absolute left-0 z-10 flex flex-col items-center w-full gap-4 py-4 bg-white shadow-lg top-16 md:hidden'>
          <a
            className='transition duration-300 ease-in-out cursor-pointer hover:text-customBlue'
            onClick={closeMenu}
          >
            About Us
          </a>
          <a
            className='transition duration-300 ease-in-out cursor-pointer hover:text-customBlue'
            onClick={closeMenu}
          >
            Contact Us
          </a>
          <Link
            to='/login'
            className='px-10 py-3 font-medium text-white transition duration-300 ease-in-out cursor-pointer bg-customBlue rounded-xl hover:bg-customBlueHover'
            onClick={closeMenu}
          >
            Sign In
          </Link>
          <Link
            to='register'
            className='px-10 py-3 font-medium transition duration-300 ease-in-out border-2 cursor-pointer text-customBlue border-customBlue rounded-xl hover:bg-indigo-100'
            onClick={closeMenu}
          >
            Sign Up
          </Link>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
