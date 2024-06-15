import { Button, Services, Testimonials } from './components';

import HomePageImg from '@/assets/homepage-img.png';

const HomePage = () => {
  return (
    <>
      <section className='grid items-center grid-cols-2 gap-10'>
        <div>
          <h1 className='text-5xl font-bold leading-normal'>
            <span className='text-customBlue'>We care</span> <br />
            about your health
          </h1>
          <p className='mt-4 text-lg text-neutral-400'>
            Good health is the state of mental, physical and social well being
            and it does not just mean absence of diseases.
          </p>
          <div className='mt-20'>
            <Button text='View Your Medical Data' icon={true} />
          </div>
          <div className='flex gap-4 mt-11'>
            <p>Want become member of your portal</p>
            <a className='transition duration-300 ease-in-out cursor-pointer text-customBlue hover:text-customBlueHover'>
              Sign Up
            </a>
          </div>
        </div>
        <div>
          <img src={HomePageImg} alt='doctor' className='rounded-xl' />
        </div>
      </section>

      <Services />
      <Testimonials />
    </>
  );
};

export default HomePage;
