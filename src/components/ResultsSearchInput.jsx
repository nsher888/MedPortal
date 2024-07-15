import debounce from 'lodash.debounce';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate, useLocation } from 'react-router-dom';

import usePagination from '../hooks/usePagination';

import { getResultsSuggestions } from './../services/results/results';

const ResultsSearchInput = ({
  searchValue,
  handleSearchChange,
  placeholder,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setPage } = usePagination();

  const [inputValue, setInputValue] = useState(searchValue);
  const [suggestions, setSuggestions] = useState([]);

  const { refetch } = useQuery(
    ['testResults', inputValue],
    () => getResultsSuggestions(inputValue),
    {
      enabled: false,
      onSuccess: (data) => {
        const uniqueSuggestions = Array.from(
          new Set(
            data.map(
              (result) =>
                `${result.patientName}-${result.surname}-${result.idNumber}`,
            ),
          ),
        ).map((key) => {
          const [patientName, surname, idNumber] = key.split('-');
          return data.find(
            (result) =>
              result.patientName === patientName &&
              result.surname === surname &&
              result.idNumber === idNumber,
          );
        });
        setSuggestions(uniqueSuggestions);
      },
    },
  );

  useEffect(() => {
    const debouncedFetchSuggestions = debounce((searchTerm) => {
      if (searchTerm.length > 2) {
        refetch();
      } else {
        setSuggestions([]);
      }
    }, 300);

    debouncedFetchSuggestions(inputValue);

    return () => {
      debouncedFetchSuggestions.cancel();
    };
  }, [inputValue, refetch]);

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
    setInputValue('');
    handleSearchChange({ target: { value: '' } });
    setSuggestions([]);
  };

  const handleSearchButtonClick = () => {
    handleSearchChange({ target: { value: inputValue } });
    setSuggestions([]);
  };

  return (
    <div className='relative flex items-center'>
      <label htmlFor='search' className='mr-2 text-sm text-gray-700'>
        Search:
      </label>
      <div className='relative w-full'>
        <div className='relative flex items-center w-full'>
          <input
            id='search'
            type='text'
            placeholder={placeholder}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className='block w-full py-2 pl-3 pr-10 text-sm border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
          />
          {inputValue && (
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
        {suggestions.length > 0 && (
          <ul className='absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg'>
            {suggestions.map((result) => (
              <li
                key={result.id}
                className='px-4 py-2 cursor-pointer hover:bg-gray-200'
                onClick={() => {
                  setInputValue(`${result.patientName} ${result.surname}`);
                  handleSearchChange({
                    target: {
                      value: `${result.patientName} ${result.surname}`,
                    },
                  });
                  setSuggestions([]);
                }}
              >
                {result.patientName} {result.surname} - {result.idNumber}
              </li>
            ))}
          </ul>
        )}
      </div>
      <button
        type='button'
        onClick={handleSearchButtonClick}
        className='px-4 py-2 ml-2 text-sm text-white rounded-md bg-customBlue hover:bg-customBlueHover focus:outline-none'
      >
        Search
      </button>
    </div>
  );
};

export default ResultsSearchInput;
