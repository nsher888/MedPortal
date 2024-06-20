import { useState } from 'react';
import { BsStarFill, BsChevronLeft, BsChevronRight } from 'react-icons/bs';

import TestimonialImg2 from '@/assets/TestimonialImg1.png';
import TestimonialImg1 from '@/assets/TestimonialImg2.png';
import TestimonialImg3 from '@/assets/TestimonialImg3.png';

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
      <h2 className='mb-10 text-3xl font-bold text-center'>
        Patient Testimonials
      </h2>
      <div className='relative flex items-center justify-center'>
        <button
          onClick={prevTestimonial}
          className='absolute left-0 p-2 transition bg-white rounded-full shadow-lg hover:bg-gray-100'
        >
          <BsChevronLeft size='2em' />
        </button>
        <div className='max-w-lg p-8 mx-4 text-center bg-white shadow-lg rounded-xl'>
          <div className='flex justify-center mb-4'>
            <img
              src={testimonials[current].image}
              alt='patient'
              className='object-cover w-24 h-24 rounded-full'
              style={{ aspectRatio: '1 / 1' }}
            />
          </div>
          <p className='mb-4 text-lg italic'>`{testimonials[current].text}`</p>
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
          className='absolute right-0 p-2 transition bg-white rounded-full shadow-lg hover:bg-gray-100'
        >
          <BsChevronRight size='2em' />
        </button>
      </div>
    </section>
  );
};

export default Testimonials;
