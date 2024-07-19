import { Link } from 'react-router-dom';

import HomePageImg from '@/assets/homepage-img.png';

import { Button, Services, Testimonials } from './components';
import usePageTitle from '../../hooks/usePageTitle';

const HomePage = () => {
  usePageTitle('MedPortal');
  return (
    <>
      <section className='grid items-center grid-cols-1 gap-10 p-4 md:grid-cols-2'>
        <div>
          <h1 className='text-5xl font-bold leading-normal'>
            <span className='text-customBlue'>We care</span> <br />
            about your health
          </h1>
          <p className='mt-4 text-lg text-neutral-400'>
            Good health is the state of mental, physical and social well being
            and it does not just mean absence of diseases.
          </p>
          <div className='mt-10 md:mt-20'>
            <Button route='login' text='View Your Medical Data' icon={true} />
          </div>
          <div className='flex flex-col gap-4 mt-6 md:flex-row md:mt-11'>
            <p>Want to become a member of our portal?</p>
            <Link
              to='register'
              className='transition duration-300 ease-in-out cursor-pointer text-customBlue hover:text-customBlueHover'
            >
              Sign Up
            </Link>
          </div>
        </div>
        <div>
          <img src={HomePageImg} alt='doctor' className='w-full rounded-xl' />
        </div>
      </section>

      <Services />
      <Testimonials />
    </>
  );
};

export default HomePage;
