const ServiceCard = ({ icon, text }) => {
  return (
    <div className='bg-white p-8 rounded-xl drop-shadow-xl flex flex-col items-center border hover:shadow-2xl transition duration-300 ease-in-out'>
      {icon}
      <p className='mt-4 '>{text}</p>
    </div>
  );
};

export default ServiceCard;
