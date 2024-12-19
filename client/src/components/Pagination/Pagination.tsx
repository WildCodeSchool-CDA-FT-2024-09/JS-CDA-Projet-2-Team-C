import React from 'react';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onNext: () => void;
  onPrev: () => void;
  hasMore: boolean;
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onNext,
  onPrev,
  hasMore
}) => {
  return (
    <div className="join">
      <button
        onClick={onPrev}
        disabled={currentPage === 0}
        className="btn join-item"
      >
        «
      </button>
      <span className="btn join-item">
        Page : {currentPage + 1} / {totalPages}
      </span>
      <button onClick={onNext} disabled={!hasMore} className="btn join-item">
        »
      </button>
    </div>
  );
};

export default Pagination;
