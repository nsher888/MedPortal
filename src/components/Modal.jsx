import { useRef } from 'react';

const Modal = ({ isOpen, onClose, title, children, footer, className }) => {
  const modalRef = useRef(null);

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className='relative z-10'
      aria-labelledby='modal-title'
      role='dialog'
      aria-modal='true'
      onClick={handleClickOutside}
    >
      <div className='fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75'></div>
      <div className='fixed inset-0 z-10 flex items-center justify-center p-4 overflow-y-auto'>
        <div
          ref={modalRef}
          className={`relative bg-white rounded-lg shadow-xl sm:my-8 inline-block md:ml-72 min-w-80 md:min-w-[400px] align-middle ${className} max-w-full md:max-w-4xl p-6`}
          style={{ width: 'auto' }}
        >
          <div className='absolute top-0 right-0 hidden pt-4 pr-4 sm:block'>
            <button
              type='button'
              className='text-gray-400 bg-white rounded-md hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
              onClick={onClose}
            >
              <span className='sr-only'>Close</span>
              <svg
                className='w-6 h-6'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                aria-hidden='true'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            </button>
          </div>
          <div>
            <div className='w-full mt-3 text-center sm:mt-0 sm:text-left'>
              <h3
                className='text-base font-semibold leading-6 text-gray-900'
                id='modal-title'
              >
                {title}
              </h3>
              <div className='mt-2'>{children}</div>
            </div>
          </div>
          <div className='mt-5 sm:mt-4 sm:flex sm:flex-row-reverse'>
            {footer}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
