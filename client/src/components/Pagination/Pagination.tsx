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
        className={`btn join-item ${currentPage === 0 ? 'bg-wrigth cursor-not-allowed' : ''}`}
        // {className=`btn join-item ${currentPage === 0 ? '' : 'bg-wrigth'}`}
      >
        «
      </button>
      <span className="btn join-item cursor-default hover:bg-transparent hover:text-inherit">
        Page : {currentPage + 1} / {totalPages}
      </span>
      <button
        onClick={onNext}
        disabled={!hasMore}
        className={`btn join-item ${!hasMore ? 'bg-light-gray cursor-not-allowed' : ''}`}
      >
        »
      </button>
    </div>
  );
};

export default Pagination;
