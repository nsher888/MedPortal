const Section = ({ title, children }) => {
  return (
    <section className='mt-20'>
      <h2 className='text-3xl font-bold'>{title}</h2>
      <div className='grid grid-cols-1 gap-6 mt-10 sm:grid-cols-2 lg:grid-cols-3'>
        {children}
      </div>
    </section>
  );
};

export default Section;
