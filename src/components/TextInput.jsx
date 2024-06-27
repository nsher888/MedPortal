const TextInput = ({
  label,
  name,
  type,
  errorMessage,
  register,
  placeholder,
  className,
}) => {
  return (
    <div className={`relative flex flex-col mb-10 ${className}`}>
      <label
        htmlFor={name}
        className='block text-sm font-medium leading-6 text-gray-900'
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        {...register}
        type={type}
        placeholder={placeholder}
        className='block w-full px-3 py-2 border-0 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-customBlue sm:text-sm sm:leading-6'
      />
      <p className='absolute left-0 text-sm text-red-500 -bottom-6'>
        {errorMessage}
      </p>
    </div>
  );
};

export default TextInput;
