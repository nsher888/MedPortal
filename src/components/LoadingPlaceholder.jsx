const LoadingPlaceholder = () => (
  <div className='flex items-center justify-center min-h-screen bg-gray-100'>
    <div className='text-center'>
      <div className='flex justify-center mb-4'>
        <div className='w-16 h-16 border-b-4 border-indigo-600 rounded-full animate-spin'></div>
      </div>
      <h2 className='text-2xl font-semibold text-gray-900'>
        Checking authentication...
      </h2>
      <p className='text-gray-500'>
        Please wait while we verify your credentials.
      </p>
    </div>
  </div>
);

export default LoadingPlaceholder;
