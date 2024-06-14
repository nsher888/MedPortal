import ServiceCard from './ServiceCard';
import { LuMicroscope } from 'react-icons/lu';
import { RiCalendarScheduleFill } from 'react-icons/ri';
import { IoChatbubbleEllipsesOutline } from 'react-icons/io5';
import Section from './Section';

const Services = () => {
  return (
    <Section title='Our Medical Services'>
      <ServiceCard
        icon={<LuMicroscope className='text-5xl text-customBlue' />}
        text='View your medical data and get insights on your health'
      />
      <ServiceCard
        icon={<RiCalendarScheduleFill className='text-5xl text-customBlue' />}
        text='Book an appointment with a doctor of your choice'
      />
      <ServiceCard
        icon={
          <IoChatbubbleEllipsesOutline className='text-5xl text-customBlue' />
        }
        text='Chat with a doctor and get medical advice'
      />
    </Section>
  );
};

export default Services;
