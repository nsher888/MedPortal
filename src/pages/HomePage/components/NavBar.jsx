const NavBar = () => {
  return (
    <nav className='flex items-center justify-between'>
      <div>
        <a href='/' className='text-2xl'>
          <span className='text-customBlue font-bold'>Med</span>Portal
        </a>
      </div>
      <div className='flex gap-8 text-lg font-medium '>
        <a className='hover:text-customBlue transition duration-300 ease-in-out cursor-pointer'>
          About Us
        </a>
        <a className='hover:text-customBlue transition duration-300 ease-in-out cursor-pointer'>
          Contact Us
        </a>
      </div>
      <div className='flex gap-7'>
        <a className='bg-customBlue text-white px-10 py-3 font-medium rounded-xl hover:bg-customBlueHover transition duration-300 ease-in-out cursor-pointer'>
          Sign In
        </a>
        <a className='text-customBlue px-10 py-3 border-customBlue border-2 font-medium rounded-xl hover:bg-indigo-100 transition duration-300 ease-in-out cursor-pointer'>
          Sign Up
        </a>
      </div>
    </nav>
  );
};

export default NavBar;
