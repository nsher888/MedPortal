import { useState } from 'react';

const useSearch = () => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  return {
    searchValue,
    handleSearchChange,
  };
};

export default useSearch;
