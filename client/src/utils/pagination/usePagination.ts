import { useState } from 'react';

export function usePagination(initialPage: number, perPage: number) {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(0);
  const [hasMore, setHasMore] = useState(false);

  const updatePaginationData = (total: number, hasMoreData: boolean) => {
    setTotalPages(Math.ceil(total / perPage));
    setHasMore(hasMoreData);
  };

  const handleNextPage = () => {
    if (hasMore) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 0) setCurrentPage((prev) => prev - 1);
  };

  return {
    currentPage,
    totalPages,
    hasMore,
    setCurrentPage,
    handleNextPage,
    handlePrevPage,
    updatePaginationData
  };
}
