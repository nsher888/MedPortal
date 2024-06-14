const Section = ({ title, children }) => {
  return (
    <section className='mt-20'>
      <h2 className='text-3xl font-bold'>{title}</h2>
      <div className='grid grid-cols-3 gap-10 mt-10'>{children}</div>
    </section>
  );
};

export default Section;
