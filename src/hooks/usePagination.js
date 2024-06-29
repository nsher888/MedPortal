import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const usePagination = (defaultTotalPages = 1, defaultPerPage = 10) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(defaultPerPage);
  const [totalPages, setTotalPages] = useState(defaultTotalPages);

  const updateURL = (newPage, newPerPage) => {
    const searchParams = new URLSearchParams(location.search);
    if (newPage) searchParams.set('page', newPage);
    if (newPerPage) searchParams.set('per_page', newPerPage);
    navigate({ search: searchParams.toString() });
  };

  const handlePreviousPage = () => {
    const newPage = Math.max(page - 1, 1);
    setPage(newPage);
    updateURL(newPage, perPage);
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      const newPage = page + 1;
      setPage(newPage);
      updateURL(newPage, perPage);
    }
  };

  const handleFirstPage = () => {
    setPage(1);
    updateURL(1, perPage);
  };

  const handleLastPage = () => {
    setPage(totalPages);
    updateURL(totalPages, perPage);
  };

  const handlePageChange = (event) => {
    const newPage = parseInt(event.target.value) || 1;
    setPage(newPage);
    updateURL(newPage, perPage);
  };

  const handlePerPageChange = (event) => {
    const newPerPage = parseInt(event.target.value);
    setPerPage(newPerPage);
    setPage(1);
    updateURL(1, newPerPage);
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const initialPage = parseInt(searchParams.get('page')) || 1;
    const initialPerPage =
      parseInt(searchParams.get('per_page')) || defaultPerPage;
    setPage(initialPage);
    setPerPage(initialPerPage);
  }, [location.search]);

  return {
    page,
    perPage,
    totalPages,
    setTotalPages,
    handlePreviousPage,
    handleNextPage,
    handleFirstPage,
    handleLastPage,
    handlePageChange,
    handlePerPageChange,
  };
};

export default usePagination;
