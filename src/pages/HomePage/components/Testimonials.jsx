import { BsStarFill, BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import TestimonialImg1 from '@/assets/TestimonialImg2.png';
import TestimonialImg2 from '@/assets/TestimonialImg1.png';
import TestimonialImg3 from '@/assets/TestimonialImg3.png';
import { useState } from 'react';

const testimonials = [
  {
    image: TestimonialImg1,
    text: 'MedPortal has significantly improved my access to medical care. The platform is easy to use, and I can view my health records anytime.',
    name: 'Jane Doe',
  },
  {
    image: TestimonialImg2,
    text: 'Booking appointments has never been easier. I love the convenience and the ability to chat with doctors directly.',
    name: 'John Smith',
  },
  {
    image: TestimonialImg3,
    text: 'The insights on my health data have been incredibly valuable. MedPortal is a must-have for anyone serious about their health.',
    name: 'Emily Brown',
  },
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);

  const nextTestimonial = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrent(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  };

  return (
    <section className='mt-20'>
      <h2 className='text-3xl font-bold text-center mb-10'>
        Patient Testimonials
      </h2>
      <div className='relative flex items-center justify-center'>
        <button
          onClick={prevTestimonial}
          className='absolute left-0 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition'
        >
          <BsChevronLeft size='2em' />
        </button>
        <div className='bg-white p-8 rounded-xl shadow-lg text-center max-w-lg mx-4'>
          <div className='flex justify-center mb-4'>
            <img
              src={testimonials[current].image}
              alt='patient'
              className='w-24 h-24 rounded-full object-cover'
              style={{ aspectRatio: '1 / 1' }}
            />
          </div>
          <p className='text-lg italic mb-4'>`{testimonials[current].text}`</p>
          <div className='flex justify-center gap-1 mb-4'>
            <BsStarFill className='text-yellow-500' />
            <BsStarFill className='text-yellow-500' />
            <BsStarFill className='text-yellow-500' />
            <BsStarFill className='text-yellow-500' />
            <BsStarFill className='text-yellow-500' />
          </div>
          <p className='font-bold'>- {testimonials[current].name}</p>
        </div>
        <button
          onClick={nextTestimonial}
          className='absolute right-0 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition'
        >
          <BsChevronRight size='2em' />
        </button>
      </div>
    </section>
  );
};

export default Testimonials;
