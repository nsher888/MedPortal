const ServiceCard = ({ icon, text }) => {
  return (
    <div className='flex flex-col items-center p-6 transition duration-300 ease-in-out bg-white border sm:p-8 rounded-xl drop-shadow-xl hover:shadow-2xl'>
      {icon}
      <p className='mt-4 text-center'>{text}</p>
    </div>
  );
};

export default ServiceCard;
