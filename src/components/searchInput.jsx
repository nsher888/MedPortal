import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import usePagination from '../hooks/usePagination';

const SearchInput = ({ searchValue, handleSearchChange, placeholder }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const { setPage } = usePagination();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const currentSearch = params.get('search');

    if (searchValue && searchValue !== currentSearch) {
      params.set('search', searchValue);
      params.set('page', 1);
      navigate(`${location.pathname}?${params.toString()}`, { replace: true });
      setPage(1);
    } else if (!searchValue && currentSearch) {
      params.delete('search');
      params.set('page', 1);
      navigate(`${location.pathname}?${params.toString()}`, { replace: true });
      setPage(1);
    }
  }, [searchValue, navigate, location.pathname, setPage]);

  const clearInput = () => {
    handleSearchChange({ target: { value: '' } });
  };

  return (
    <div className='relative flex items-center'>
      <label htmlFor='search' className='mr-2 text-sm text-gray-700'>
        Search:
      </label>
      <div className='relative w-full'>
        <input
          id='search'
          type='text'
          placeholder={placeholder}
          value={searchValue}
          onChange={handleSearchChange}
          className='block w-full px-3 py-2 text-sm border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
        />
        {searchValue && (
          <button
            type='button'
            onClick={clearInput}
            className='absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 focus:outline-none'
          >
            <svg
              className='w-4 h-4'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path
                fillRule='evenodd'
                d='M10 8.586l3.293-3.293a1 1 0 111.414 1.414L11.414 10l3.293 3.293a1 1 0 01-1.414 1.414L10 11.414l-3.293 3.293a1 1 0 01-1.414-1.414L8.586 10 5.293 6.707a1 1 0 011.414-1.414L10 8.586z'
                clipRule='evenodd'
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchInput;
