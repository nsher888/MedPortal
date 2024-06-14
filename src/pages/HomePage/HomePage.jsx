import { Button, Footer, Header, Services, Testimonials } from './components';

import HomePageImg from '@/assets/homepage-img.png';

const HomePage = () => {
  return (
    <div className='mx-auto max-w-6xl pt-10 font-poppins font-medium'>
      <Header />

      <main className='mt-28'>
        <section className='grid grid-cols-2 gap-10 items-center'>
          <div>
            <h1 className='text-5xl font-bold leading-normal'>
              <span className='text-customBlue'>We care</span> <br />
              about your health
            </h1>
            <p className='text-lg mt-4 text-neutral-400'>
              Good health is the state of mental, physical and social well being
              and it does not just mean absence of diseases.
            </p>
            <div className='mt-20'>
              <Button text='View Your Medical Data' icon={true} />
            </div>
            <div className='flex mt-11 gap-4'>
              <p>Want become member of your portal</p>
              <a className='text-customBlue cursor-pointer hover:text-customBlueHover transition duration-300 ease-in-out'>
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
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
